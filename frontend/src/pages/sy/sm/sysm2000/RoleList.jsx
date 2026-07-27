import React from "react";
import { Card, Table, Checkbox, Button } from "antd";
import { deleteRole } from "../../../../services/sysm2000Api";


function RoleList({
                      roles,
                      selectedRole,
                      setSelectedRole,
                      selectedRoles,
                      setSelectedRoles,
                      setMode,
                      setIsModalOpen,
                      fetchRoles
                  }) {


    const handleDelete = async () => {


        if (selectedRoles.length === 0) {

            alert("삭제할 Role을 선택하세요!");

            return;

        }



        try {


            for (const roleno of selectedRoles) {


                await deleteRole(roleno);


            }



            alert("선택한 Role이 삭제되었습니다.");



            setSelectedRoles([]);



            fetchRoles();



        } catch(error) {


            console.error(error);

            alert(
                "Role 삭제 중 오류가 발생했습니다."
            );


        }


    };



    return (

        <Card

            title={
                <span style={{ lineHeight: "32px" }}>
                    Sysm2000 Role List
                </span>
            }


            extra={

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >


                    <Button
                        type="primary"
                        onClick={() => {


                            setSelectedRole(null);

                            setMode("create");

                            setIsModalOpen(true);


                        }}
                    >
                        등록
                    </Button>




                    <Button

                        onClick={() => {


                            if (!selectedRole) {


                                alert(
                                    "수정할 Role을 선택하세요!"
                                );


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

                        onClick={handleDelete}

                    >
                        삭제
                    </Button>


                </div>

            }


            style={{
                marginBottom: 16
            }}

        >


            <Table
                dataSource={
                    roles.map((r, idx) => ({
                        key: idx,
                        ...r
                    }))
                }

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

                                    setSelectedRoles(prev =>
                                        prev.includes(roleno)
                                            ? prev.filter(
                                                r => r !== roleno
                                            )
                                            : [
                                                ...prev,
                                                roleno
                                            ]
                                    );
                                }}
                            />
                        )
                    },
                    {
                        title: "Role ID",
                        dataIndex: "roleno"
                    },
                    {
                        title: "Role Name",
                        dataIndex: "rolename"
                    }
                ]}

                pagination={{ pageSize: 10 }}


                onRow={(record) => ({
                    onClick: () => {
                        setSelectedRole(record);
                    }
                })}


                rowClassName={(record) =>
                    selectedRole?.roleno === record.roleno
                        ? "selected-row"
                        : ""
                }

            />


        </Card>

    );

}


export default RoleList;