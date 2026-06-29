import React, { useEffect, useState } from "react";
import { Table, Card, Tree, Checkbox, Button } from "antd";
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
    const [originalPermissions, setOriginalPermissions] = useState([]);
    const { routesFromDB } = useMenu();

    // 역할 목록 불러오기
    useEffect(() => {
        axios.get("/api/sysm2000/roles").then(res => setRoles(res.data));
    }, []);

    // 권한 조회
    useEffect(() => {
        if (selectedRole && selectedMenu) {
            axios.get(`/api/sysm2000/roles/${selectedRole}/permissions/${selectedMenu}`)
                .then(res => {
                    const found = res.data?.[0];
                    const merged = {
                        menucd: selectedMenu,
                        qryrole: found?.qryrole || "F",
                        saverole: found?.saverole || "F",
                        updrole: found?.updrole || "F",
                        delrole: found?.delrole || "F",
                        excelrole: found?.excelrole || "F",
                        etcrole: found?.etcrole || "F",
                    };
                    setPermissions([merged]);
                    setOriginalPermissions([merged]); // ✅ 원본 저장
                });
        }
    }, [selectedRole, selectedMenu]);

    const treeData = buildTree(routesFromDB);

    const permissionColumns = [
        { title: "MenuCd", dataIndex: "menucd", key: "menucd" },
        {
            title: "QryRole",
            dataIndex: "qryrole",
            key: "qryrole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.qryrole !== permissions[idx]?.qryrole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].qryrole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
        {
            title: "SaveRole",
            dataIndex: "saverole",
            key: "saverole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.saverole !== permissions[idx]?.saverole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].saverole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
        {
            title: "UpdRole",
            dataIndex: "updrole",
            key: "updrole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.updrole !== permissions[idx]?.updrole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].updrole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
        {
            title: "DelRole",
            dataIndex: "delrole",
            key: "delrole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.delrole !== permissions[idx]?.delrole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].delrole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
        {
            title: "ExcelRole",
            dataIndex: "excelrole",
            key: "excelrole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.excelrole !== permissions[idx]?.excelrole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].excelrole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
        {
            title: "EtcRole",
            dataIndex: "etcrole",
            key: "etcrole",
            render: (val, record, idx) => {
                const changed = originalPermissions[idx]?.etcrole !== permissions[idx]?.etcrole;
                return (
                    <Checkbox
                        checked={val === "T"}
                        onChange={(e) => {
                            const newPermissions = [...permissions];
                            newPermissions[idx].etcrole = e.target.checked ? "T" : "F";
                            setPermissions(newPermissions);
                        }}
                        style={changed ? { accentColor: "orange" } : {}}
                    />
                );
            },
        },
    ];

    const handleSave = () => {
        if (!selectedRole || permissions.length === 0) return;

        const payload = {
            roleno: selectedRole,
            menucd: permissions[0].menucd,
            qryrole: permissions[0].qryrole,
            saverole: permissions[0].saverole,
            updrole: permissions[0].updrole,
            delrole: permissions[0].delrole,
            excelrole: permissions[0].excelrole,
            etcrole: permissions[0].etcrole,
        };

        axios.post("/api/sysm2000/roles/savePermission", payload)
            .then(() => {
                alert("권한이 저장되었습니다.");
            })
            .catch(() => {
                alert("저장 중 오류가 발생했습니다.");
            });
    };


    return (
        <>
            <Card
                title={<span style={{ lineHeight: "32px" }}>Sysm2000 Role List</span>}
                extra={
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Button type="primary">등록</Button>
                        <Button>수정</Button>
                        <Button danger>삭제</Button>
                    </div>
                }
                style={{ marginBottom: 16 }}
            >
                <Table
                    dataSource={roles.map((r, idx) => ({ key: idx, ...r }))}
                    columns={[
                        {
                            title: "선택",
                            dataIndex: "roleno",
                            key: "checkbox",
                            render: (roleno) => (
                                <Checkbox
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("체크된 RoleNo:", roleno);
                                    }}
                                />
                            ),
                        },
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
                <Card
                    title={<span style={{ lineHeight: "32px" }}>메뉴 트리 (Role: {selectedRole})</span>}
                    style={{ marginBottom: 16 }}
                >
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
                <Card
                    title={
                        <span style={{ lineHeight: "32px" }}>
      권한 (Role: {selectedRole}, Menu: {selectedMenu})
    </span>
                    }
                    extra={
                        <Button
                            type="primary"
                            onClick={handleSave}
                            style={{ marginRight: "16px" }} // ✅ 버튼을 왼쪽으로 이동
                        >
                            저장
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                >
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
