import React from "react";
import {
    Card,
    Table,
    Button
} from "antd";

import {
    roleColumns
} from "./Columns";


export default function RoleTable({

                                      roles,

                                      userRoles,

                                      onRoleChange,

                                      onSave

                                  }) {


    return (

        <Card

            title={

                <div

                    style={{
                        display:"flex",
                        alignItems:"center"
                    }}

                >

                    <span>
                        Role List (Selected User Roles)
                    </span>


                    <Button

                        type="primary"

                        onClick={onSave}

                        style={{
                            marginLeft:50
                        }}

                    >

                        저장

                    </Button>


                </div>

            }

        >


            <Table

                rowKey="roleno"

                dataSource={roles}

                columns={roleColumns}

                pagination={false}


                rowSelection={{

                    type:"checkbox",


                    selectedRowKeys:
                    userRoles,


                    onChange:
                        (selectedKeys)=>{

                            onRoleChange(
                                selectedKeys
                            );

                        }

                }}

            />


        </Card>

    );

}