import React, { useEffect, useState } from "react";
import { Table, Card, Tree, Checkbox } from "antd";
import axios from "axios";
import { useMenu } from "../../../context/MenuContext";

// 트리 구조 변환 함수
function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.menuCd] = {
            key: String(item.menuCd),
            title: item.menuName,
            children: []
        };
    });

    data.forEach(item => {
        if (item.menuPrntCd === "0" || !item.menuPrntCd) {
            roots.push(map[item.menuCd]);
        } else {
            if (map[item.menuPrntCd]) {
                map[item.menuPrntCd].children.push(map[item.menuCd]);
            }
        }
    });

    return roots;
}

const Sysm2000Page = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const { routesFromDB } = useMenu();

    // 역할 목록 불러오기
    useEffect(() => {
        axios.get("/api/sysm2000/roles").then(res => setRoles(res.data));
    }, []);

    // 권한 조회 (Role + MenuCd)
    useEffect(() => {
        if (selectedRole && selectedMenu) {
            axios.get(`/api/sysm2000/roles/${selectedRole}/permissions/${selectedMenu}`)
                .then(res => {
                    const found = res.data?.[0]; // 단일 권한 데이터
                    const merged = {
                        menucd: selectedMenu,
                        qryrole: found?.qryrole || "F",
                        saverole: found?.saverole || "F",
                        updrole: found?.updrole || "F",
                        delrole: found?.delrole || "F",
                        excelrole: found?.excelrole || "F",
                        etcrole: found?.etcrole || "F",
                    };
                    setPermissions([merged]); // 항상 menucd 표시
                });
        }
    }, [selectedRole, selectedMenu]);

    const treeData = buildTree(routesFromDB);

    // 권한 컬럼 정의 (체크박스)
    const permissionColumns = [
        { title: "MenuCd", dataIndex: "menucd", key: "menucd" },
        { title: "QryRole", dataIndex: "qryrole", key: "qryrole", render: val => <Checkbox checked={val === "T"} disabled /> },
        { title: "SaveRole", dataIndex: "saverole", key: "saverole", render: val => <Checkbox checked={val === "T"} disabled /> },
        { title: "UpdRole", dataIndex: "updrole", key: "updrole", render: val => <Checkbox checked={val === "T"} disabled /> },
        { title: "DelRole", dataIndex: "delrole", key: "delrole", render: val => <Checkbox checked={val === "T"} disabled /> },
        { title: "ExcelRole", dataIndex: "excelrole", key: "excelrole", render: val => <Checkbox checked={val === "T"} disabled /> },
        { title: "EtcRole", dataIndex: "etcrole", key: "etcrole", render: val => <Checkbox checked={val === "T"} disabled /> },
    ];

    return (
        <>
            <Card title="Sysm2000 Role List">
                <Table
                    dataSource={roles.map((r, idx) => ({ key: idx, ...r }))}
                    columns={[
                        { title: "Role ID", dataIndex: "roleno" },
                        { title: "Role Name", dataIndex: "rolename" },
                    ]}
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => setSelectedRole(record.roleno),
                    })}
                />
            </Card>

            {selectedRole && (
                <Card title={`메뉴 트리 (Role: ${selectedRole})`} style={{ marginTop: 20 }}>
                    <div style={{ height: 300, overflowY: "auto", border: "1px solid #ddd", padding: 8 }}>
                        <Tree
                            treeData={treeData}
                            onSelect={(keys) => setSelectedMenu(keys[0])}
                            defaultExpandAll
                        />
                    </div>
                </Card>
            )}

            {selectedRole && selectedMenu && (
                <Card title={`권한 (Role: ${selectedRole}, Menu: ${selectedMenu})`} style={{ marginTop: 20 }}>
                    <Table
                        dataSource={permissions}
                        columns={permissionColumns}
                        pagination={false}
                        scroll={{ y: 200 }}
                    />
                </Card>
            )}
        </>
    );
};

export default Sysm2000Page;
