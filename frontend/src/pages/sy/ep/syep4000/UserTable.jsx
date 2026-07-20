import React from "react";
import { Table } from "antd";

import { userColumns } from "./Columns";


export default function UserTable({
                                      rows,
                                      selectedUserIds,
                                      onSelectChange,
                                      onRowClick,
                                      clickedUserId
                                  }) {

    return (

        <Table

            rowKey="userid"

            dataSource={rows}

            columns={userColumns}

            pagination={{
                pageSize:10
            }}

            scroll={{
                x:1200,
                y:400
            }}


            rowSelection={{
                type:"checkbox",

                selectedRowKeys:selectedUserIds,

                onChange:(selectedRowKeys)=>{

                    onSelectChange(
                        selectedRowKeys
                    );

                }
            }}


            onRow={(record)=>({

                onClick:()=>{

                    onRowClick(record);

                }

            })}


            rowClassName={(record)=>
                record.userid === clickedUserId
                    ? "clicked-row"
                    : ""
            }

        />

    );
}