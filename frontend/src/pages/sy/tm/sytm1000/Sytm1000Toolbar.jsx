import React from "react";

import {
    Button
} from "antd";


export default function Sytm1000Toolbar({

                                            handleAdd,

                                            handleEdit,

                                            handleDelete,

                                            handleSave,

                                            handleSaveChildren

                                        }) {

    return (

        <>

            <div
                style={{
                    marginBottom:"10px"
                }}
            >

                <Button
                    type="primary"
                    onClick={handleAdd}
                >
                    등록
                </Button>


                <Button
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={handleEdit}
                >
                    수정
                </Button>


                <Button
                    danger
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={handleDelete}
                >
                    삭제
                </Button>

            </div>



            <div
                style={{
                    marginTop:"15px"
                }}
            >

                <Button
                    type="primary"
                    onClick={handleSave}
                >
                    선택 지점 저장
                </Button>


                <Button
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={handleSaveChildren}
                >
                    하위 포함 저장
                </Button>

            </div>

        </>

    );

}