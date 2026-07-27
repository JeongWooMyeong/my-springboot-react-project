import React from "react";
import { Card, Table, Checkbox, Button } from "antd";


function PermissionTable({
                             selectedRole,
                             permissions,
                             setPermissions,
                             originalPermissions,
                             handleSave
                         }) {


    if (!selectedRole) {
        return null;
    }



    const updatePermission = (
        idx,
        field,
        checked
    ) => {

        const newPermissions = [
            ...permissions
        ];

        newPermissions[idx][field] =
            checked ? "T" : "F";


        setPermissions(
            newPermissions
        );

    };



    const permissionColumns = [


        {
            title: "MenuCd",
            width: 10,
            dataIndex: "menucd",
            key: "menucd"
        },



        {
            title: "QryRole",
            width: 80,
            dataIndex: "qryrole",
            key: "qryrole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.qryrole
                    !== permissions[idx]?.qryrole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "qryrole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        },



        {
            title: "SaveRole",
            width: 80,
            dataIndex: "saverole",
            key: "saverole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.saverole
                    !== permissions[idx]?.saverole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "saverole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        },



        {
            title: "UpdRole",
            width: 80,
            dataIndex: "updrole",
            key: "updrole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.updrole
                    !== permissions[idx]?.updrole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "updrole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        },



        {
            title: "DelRole",
            width: 80,
            dataIndex: "delrole",
            key: "delrole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.delrole
                    !== permissions[idx]?.delrole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "delrole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        },



        {
            title: "ExcelRole",
            width: 80,
            dataIndex: "excelrole",
            key: "excelrole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.excelrole
                    !== permissions[idx]?.excelrole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "excelrole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        },



        {
            title: "EtcRole",
            width: 150,
            dataIndex: "etcrole",
            key: "etcrole",

            render: (val, record, idx) => {

                const changed =
                    originalPermissions[idx]?.etcrole
                    !== permissions[idx]?.etcrole;


                return (

                    <Checkbox

                        checked={val === "T"}

                        onChange={(e) =>
                            updatePermission(
                                idx,
                                "etcrole",
                                e.target.checked
                            )
                        }


                        style={
                            changed
                                ? {
                                    accentColor:
                                        "orange"
                                }
                                : {}
                        }

                    />

                );

            }

        }


    ];



    return (

        <Card

            title={
                <span style={{ lineHeight: "32px" }}>
                    권한 (Role: {selectedRole.roleno})
                </span>
            }


            extra={

                <Button

                    type="primary"

                    onClick={handleSave}

                    style={{
                        marginRight: "16px"
                    }}

                >

                    저장

                </Button>

            }


            style={{
                marginBottom: 16
            }}

        >


            <Table

                rowSelection={{

                    selectedRowKeys:
                        permissions.map(
                            p => p.menucd
                        ),


                    onChange:
                        (selectedRowKeys) => {


                            const newPermissions =
                                permissions.filter(
                                    p =>
                                        selectedRowKeys.includes(
                                            p.menucd
                                        )
                                );


                            setPermissions(
                                newPermissions
                            );

                        }

                }}


                dataSource={
                    permissions
                }


                columns={
                    permissionColumns
                }


                rowKey="menucd"


                pagination={false}


                scroll={{
                    x: 100
                }}

            />


        </Card>

    );

}


export default PermissionTable;