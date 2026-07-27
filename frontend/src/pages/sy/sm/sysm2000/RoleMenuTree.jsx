import React from "react";
import { Card, Tree } from "antd";
import { collectKeys } from "./utils";


function RoleMenuTree({
                          selectedRole,
                          treeData,
                          setSelectedMenu
                      }) {


    if (!selectedRole) {
        return null;
    }



    return (

        <Card

            title={
                <span style={{ lineHeight: "32px" }}>
                    메뉴 트리 (Role: {selectedRole.roleno})
                </span>
            }


            style={{
                marginBottom: 16
            }}

        >


            <div

                style={{
                    height: 300,
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    padding: 8
                }}

            >


                <Tree

                    treeData={treeData}


                    onSelect={(keys, info) => {


                        const allKeys =
                            collectKeys(info.node);



                        setSelectedMenu(allKeys);


                    }}



                    defaultExpandAll


                />


            </div>


        </Card>

    );

}


export default RoleMenuTree;