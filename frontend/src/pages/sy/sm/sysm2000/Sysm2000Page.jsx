import React, { useEffect, useState } from "react";
import { useMenu } from "../../../../context/MenuContext.jsx";

import RoleList from "./RoleList.jsx";
import RoleMenuTree from "./RoleMenuTree.jsx";
import PermissionTable from "./PermissionTable.jsx";
import RoleModal from "./RoleModal.jsx";

import "../../../../css/pages/sy/sysm2000/sysm2000-page.css";

import {
    getRoles,
    createRole,
    updateRole,
    getPermissions,
    savePermissions
} from "../../../../services/sysm2000Api.js";

import { buildTree } from "./utils.js";


function Sysm2000Page() {

    const { routesFromDB } = useMenu();

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    const [selectedMenu, setSelectedMenu] = useState([]);

    const [permissions, setPermissions] = useState([]);
    const [originalPermissions, setOriginalPermissions] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState("create");


    const treeData = buildTree(routesFromDB);


    // Role 목록
    const fetchRoles = async () => {

        try {

            const data = await getRoles();

            setRoles(data);

        } catch (e) {

            console.error(e);
            alert("Role 조회 실패");

        }

    };


    useEffect(() => {
        fetchRoles();
    }, []);


    // 권한 조회
    useEffect(() => {

        if (!selectedRole || selectedMenu.length === 0) {
            return;
        }

        const loadPermissions = async () => {

            const data = await getPermissions(
                selectedRole.roleno,
                selectedMenu
            );

            const result = selectedMenu.map(menuCd => {

                const item = data.find(
                    x => x.menucd === menuCd
                );

                return {
                    menucd: menuCd,
                    qryrole: item?.qryrole ?? "F",
                    saverole: item?.saverole ?? "F",
                    updrole: item?.updrole ?? "F",
                    delrole: item?.delrole ?? "F",
                    excelrole: item?.excelrole ?? "F",
                    etcrole: item?.etcrole ?? "F"
                };

            });

            setPermissions(result);
            setOriginalPermissions(result);

        };

        loadPermissions();

    }, [selectedRole, selectedMenu]);


    // 권한 저장
    const handleSave = async () => {

        if (!selectedRole) return;

        const payload = permissions.map(item => ({
            roleno: selectedRole.roleno,
            ...item
        }));

        try {

            await savePermissions(payload);

            alert("저장 완료");

        } catch (e) {

            console.error(e);
            alert("저장 실패");

        }

    };


    // Role 저장
    const saveRole = async (values) => {

        try {

            if (mode === "create") {

                await createRole(values);

            } else {

                await updateRole(
                    values.roleno,
                    values
                );

            }

            fetchRoles();
            setIsModalOpen(false);

        } catch (e) {

            console.error(e);
            alert("Role 저장 실패");

        }

    };


    return (

        <div className="sysm2000-page">

            {/* Role 목록 */}
            <section className="role-section">

                <RoleList
                    roles={roles}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}

                    selectedRoles={selectedRoles}
                    setSelectedRoles={setSelectedRoles}

                    setMode={setMode}
                    setIsModalOpen={setIsModalOpen}

                    fetchRoles={fetchRoles}
                />

            </section>


            {/* 메뉴 트리 */}
            {
                selectedRole && (

                    <section className="role-section">

                        <RoleMenuTree
                            selectedRole={selectedRole}
                            treeData={treeData}
                            setSelectedMenu={setSelectedMenu}
                        />

                    </section>

                )
            }


            {/* 권한 테이블 */}
            {
                selectedRole &&
                selectedMenu.length > 0 && (

                    <section className="role-section permission-section">

                        <PermissionTable
                            selectedRole={selectedRole}

                            permissions={permissions}
                            setPermissions={setPermissions}

                            originalPermissions={
                                originalPermissions
                            }

                            handleSave={handleSave}
                        />

                    </section>

                )
            }


            <RoleModal
                visible={isModalOpen}
                mode={mode}
                initialValues={selectedRole}

                onOk={saveRole}

                onCancel={() =>
                    setIsModalOpen(false)
                }
            />

        </div>

    );

}


export default Sysm2000Page;