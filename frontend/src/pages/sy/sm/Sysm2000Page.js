import React, { useEffect, useState } from "react";
import { Table, Card, Tree, Checkbox, Button } from "antd";
import axios from "axios";
import { useMenu } from "../../../context/MenuContext";
import RoleModal from "../../components/RoleModal";
import Sidebar from "../../components/Sidebar";

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

    const [selectedMenuCd] = useState(null);

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    //const [selectedMenu, setSelectedMenu] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState([]);

    const [permissions, setPermissions] = useState([]);
    const [originalPermissions, setOriginalPermissions] = useState([]);
    const { routesFromDB } = useMenu();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedRoles, setSelectedRoles] = useState([]);       // 삭제용

    // 역할 목록 불러오기 함수
    const fetchRoles = async () => {
        try {
            const res = await axios.get("/api/sysm2000/roles");
            setRoles(res.data);
        } catch (error) {
            console.error(error);
            alert("역할 목록을 불러오는 중 오류가 발생했습니다.");
        }
    };

    // 페이지 로드 시 목록 불러오기
    useEffect(() => {
        fetchRoles();
    }, []);

    //권한조회
    useEffect(() => {
        if (selectedRole && selectedMenu.length > 0) {
            axios.get(`/api/sysm2000/roles/${selectedRole.roleno}/permissions`, {
                params: { menuCds: selectedMenu }
            }).then(res => {
                const data = res.data || [];

                // ✅ 선택된 메뉴 전체를 돌면서 서버 응답에 없으면 기본값으로 채움
                const merged = selectedMenu.map(menuCd => {
                    const found = data.find(d => d.menucd === menuCd);
                    return {
                        menucd: menuCd,
                        qryrole: found?.qryrole || "F",
                        saverole: found?.saverole || "F",
                        updrole: found?.updrole || "F",
                        delrole: found?.delrole || "F",
                        excelrole: found?.excelrole || "F",
                        etcrole: found?.etcrole || "F",
                    };
                });

                setPermissions(merged);
                setOriginalPermissions(merged);
            });
        }
    }, [selectedRole, selectedMenu]);

    const treeData = buildTree(routesFromDB);

    const permissionColumns = [
        { title: "MenuCd", width: 10, dataIndex: "menucd", key: "menucd" },
        {
            title: "QryRole",
            width: 80,
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
            width: 80,
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
            width: 80,
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
            width: 80,
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
            width: 80,
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
            width: 150,
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

        const payload = permissions.map(p => ({
            roleno: selectedRole.roleno,
            menucd: p.menucd,
            qryrole: p.qryrole,
            saverole: p.saverole,
            updrole: p.updrole,
            delrole: p.delrole,
            excelrole: p.excelrole,
            etcrole: p.etcrole,
        }));

        axios.post("/api/sysm2000/roles/savePermissions", payload)
            .then(() => {
                alert("권한이 저장되었습니다.");
            })
            .catch(() => {
                alert("저장 중 오류가 발생했습니다.");
            });
    };

    // 등록/수정 공통 저장 함수
    const saveRole = async (values) => {
        try {
            if (mode === "create") {
                // 등록 API 호출
                await axios.post("/api/sysm2000/roles", values);
                alert("Role이 등록되었습니다.");
            } else {
                // 수정 API 호출 (PUT 엔드포인트 필요)
                await axios.put(`/api/sysm2000/roles/${values.roleno}`, values);
                alert("Role이 수정되었습니다.");
            }

            fetchRoles();          // 목록 새로고침
            setIsModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error(error);
            alert("Role 저장 중 오류가 발생했습니다.");
        }
    };

    const collectKeys = (node) => {
        let result = [node.key];
        if (node.children) {
            node.children.forEach(child => {
                result = result.concat(collectKeys(child));
            });
        }
        return result;
    };


    return (
        <>
            <Sidebar selectedMenuCd={selectedMenuCd} />
            <Card
                title={<span style={{ lineHeight: "32px" }}>Sysm2000 Role List</span>}
                extra={
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Button type="primary" onClick={() => {
                            setSelectedRole(null);
                            setMode("create");
                            setIsModalOpen(true);
                        }}>등록</Button>

                        <Button
                            onClick={() => {
                                if (!selectedRole) {
                                    alert("수정할 Role을 선택하세요!");
                                    return;
                                }
                                setMode("edit");
                                setIsModalOpen(true);
                            }}
                        >
                            수정
                        </Button>

                        <Button
                            danger
                            onClick={async () => {
                                if (selectedRoles.length === 0) {
                                    alert("삭제할 Role을 선택하세요!");
                                    return;
                                }

                                try {
                                    // 선택된 roleno 배열을 순회하며 삭제 API 호출
                                    for (const roleno of selectedRoles) {
                                        await axios.delete(`/api/sysm2000/roles/${roleno}`);
                                    }

                                    alert("선택한 Role이 삭제되었습니다.");
                                    setSelectedRoles([]); // 선택 초기화
                                    fetchRoles();         // 목록 새로고침
                                } catch (error) {
                                    console.error(error);
                                    alert("Role 삭제 중 오류가 발생했습니다.");
                                }
                            }}
                        >
                            삭제
                        </Button>
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
                                    checked={selectedRoles.includes(roleno)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRoles((prev) =>
                                            prev.includes(roleno)
                                                ? prev.filter((r) => r !== roleno) // 이미 있으면 제거
                                                : [...prev, roleno]                // 없으면 추가
                                        );
                                    }}
                                />
                            ),
                        },
                        { title: "Role ID", dataIndex: "roleno" },
                        { title: "Role Name", dataIndex: "rolename" },
                    ]}
                    pagination={{ pageSize: 10 }}
                    onRow={(record) => ({
                        onClick: () => {
                            // 행 클릭 시 수정용 Role 전체 데이터 저장
                            setSelectedRole(record);
                        },
                    })}
                />

            </Card>

            {selectedRole && (
                <Card
                    title={<span style={{ lineHeight: "32px" }}>메뉴 트리 (Role: {selectedRole.roleno})</span>}
                    style={{ marginBottom: 16 }}
                >
                    <div style={{ height: 300, overflowY: "auto", border: "1px solid #ddd", padding: 8 }}>
                        <Tree
                            treeData={treeData}
                            onSelect={(keys, info) => {
                                const allKeys = collectKeys(info.node); // 재귀로 children까지 모음
                                setSelectedMenu(allKeys);
                            }}
                            defaultExpandAll
                        />
                    </div>
                </Card>
            )}

            {selectedRole && selectedMenu && (
                <Card
                    title={
                        <span style={{ lineHeight: "32px" }}>
      권한 (Role: {selectedRole.roleno}
    </span>
                    }
                    extra={
                        <Button
                            type="primary"
                            onClick={handleSave}
                            style={{ marginRight: "16px" }}
                        >
                            저장
                        </Button>
                    }
                    style={{ marginBottom: 16 }}
                >
                    <Table
                        rowSelection={{
                            selectedRowKeys: permissions.map(p => p.menucd), // 선택된 키
                            onChange: (selectedRowKeys) => {
                                // 선택된 행들만 필터링하거나 상태 업데이트
                                const newPermissions = permissions.filter(p =>
                                    selectedRowKeys.includes(p.menucd)
                                );
                                setPermissions(newPermissions);
                            },
                        }}
                        dataSource={permissions}
                        columns={permissionColumns}
                        rowKey="menucd"   // ✅ 각 행을 구분할 고유 키
                        pagination={false}
                        scroll={{ x: 100 }}
                    />
                </Card>
            )}

            {/* ✅ 맨 밑에 RoleModal 배치 */}
            <RoleModal
                visible={isModalOpen}
                mode={mode}
                initialValues={selectedRole}
                onOk={(values) => saveRole(values)}   // ✅ 여기서 saveRole 호출
                onCancel={() => setIsModalOpen(false)}
            />

        </>
    );
};

export default Sysm2000Page;
