import React from "react";

import {
    Checkbox,
    Pagination
} from "antd";


export default function Sytm2000List({

                                         templates,

                                         currentTemplates,

                                         selectedTemplates,

                                         handleCheck,

                                         handleDelete,

                                         handleEdit,

                                         handleAdd,

                                         currentPage,

                                         setCurrentPage,

                                         pageSize


                                     }) {


    return (

        <div

            style={{
                flex:1,
                padding:"20px"
            }}

        >


            <h3>
                템플릿 리스트
            </h3>



            <button

                onClick={
                    handleAdd
                }

            >

                새 템플릿 등록

            </button>





            <div

                style={{

                    display:"grid",

                    gridTemplateColumns:
                        "repeat(3, 1fr)",

                    gap:"20px",

                    marginTop:"20px"

                }}

            >


                {
                    (currentTemplates || [])
                        .map(t => (


                            <div

                                key={
                                    t.id
                                }


                                style={{

                                    border:
                                        "1px solid #ccc",

                                    padding:"10px"

                                }}

                            >



                                <img

                                    src={
                                        `${import.meta.env.VITE_API_BASE_URL}${t.thumbnailpath}`
                                    }


                                    alt={
                                        t.title
                                    }


                                    style={{

                                        width:"100%"

                                    }}

                                />




                                <p>

                                    {
                                        t.title
                                    }

                                </p>




                                <p

                                    style={{

                                        color:
                                            t.active
                                                ?
                                                "green"
                                                :
                                                "gray"

                                    }}

                                >

                                    {
                                        t.active
                                            ?
                                            "활성화됨"
                                            :
                                            "비활성화"
                                    }

                                </p>





                                <Checkbox


                                    checked={

                                        (selectedTemplates || [])
                                            .includes(
                                                t.id
                                            )

                                    }



                                    onChange={e =>

                                        handleCheck(

                                            t.id,

                                            e.target.checked

                                        )

                                    }


                                >

                                    선택

                                </Checkbox>






                                <button


                                    onClick={() =>

                                        handleDelete(

                                            t.id,

                                            t.clcd

                                        )

                                    }


                                >

                                    삭제

                                </button>






                                <button


                                    onClick={() =>

                                        handleEdit(
                                            t
                                        )

                                    }


                                >

                                    수정

                                </button>



                            </div>


                        ))

                }



            </div>






            <Pagination


                current={
                    currentPage
                }


                pageSize={
                    pageSize
                }


                total={
                    templates.length
                }



                onChange={page =>

                    setCurrentPage(
                        page
                    )

                }


                style={{

                    marginTop:"20px",

                    textAlign:"center"

                }}


            />



        </div>

    );

}