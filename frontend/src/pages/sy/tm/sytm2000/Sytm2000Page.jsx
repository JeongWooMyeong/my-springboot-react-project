import React from "react";


import Sytm2000Tree
    from "./Sytm2000Tree.jsx";


import Sytm2000List
    from "./Sytm2000List.jsx";


import Sytm2000Modal
    from "./Sytm2000Modal.jsx";


import useSytm2000
    from "./useSytm2000.js";



export default function Sytm2000Page(){


    const {


        treeData,


        selectedKeys,
        setSelectedKeys,


        templates,


        currentTemplates,


        selectedTemplates,


        handleCheck,


        handleDelete,


        handleAdd,


        handleEdit,



        currentPage,

        setCurrentPage,


        pageSize,


        isEditorOpen,

        editingTemplate,


        handleEditorClose,


        handleEditorSave



    } = useSytm2000();





    return (


        <div

            style={{

                display:"flex"

            }}

        >





            {/* 분류 트리 */}

            <div

                style={{

                    width:"300px",

                    borderRight:
                        "1px solid #ddd",

                    padding:"10px"

                }}

            >


                <h3>

                    템플릿 분류

                </h3>




                <Sytm2000Tree


                    treeData={
                        treeData
                    }


                    selectedKeys={
                        selectedKeys
                    }


                    onSelect={
                        setSelectedKeys
                    }



                />


            </div>







            {/* 템플릿 리스트 */}



            {

                templates.length > 0 && (


                    <Sytm2000List


                        templates={
                            templates
                        }


                        currentTemplates={
                            currentTemplates
                        }


                        selectedTemplates={
                            selectedTemplates
                        }


                        handleCheck={
                            handleCheck
                        }


                        handleDelete={
                            handleDelete
                        }


                        handleEdit={
                            handleEdit
                        }


                        handleAdd={
                            handleAdd
                        }


                        currentPage={
                            currentPage
                        }


                        setCurrentPage={
                            setCurrentPage
                        }


                        pageSize={
                            pageSize
                        }



                    />


                )

            }








            {/* 템플릿 에디터 모달 */}



            <Sytm2000Modal


                open={
                    isEditorOpen
                }



                onCancel={
                    handleEditorClose
                }



                editingTemplate={
                    editingTemplate
                }



                clcd={

                    selectedKeys[0]

                }



                onSave={
                    handleEditorSave
                }



            />




        </div>


    );


}