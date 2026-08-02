import { useEffect, useState } from "react";
import TemplatePreview from "../../../components/TemplatePreview/TemplatePreview.jsx";

export default function Pppo2000Detail({ detail }) {

    const [selectedIndex, setSelectedIndex] = useState(0);


    /*
        신청건 변경 시 선택 위치 초기화
    */
    useEffect(() => {

        setSelectedIndex(0);

    }, [detail?.ordno]);



    if (!detail) {

        return (

            <div
                style={{
                    flex:1,
                    minHeight:700,
                    border:"1px solid #ddd",
                    padding:20
                }}
            >

                미리보기 상세 데이터가 없습니다.

            </div>

        );

    }



    /*
        신규 구조
        data : []

        기존 구조 방어
        data : {}
    */
    const dataList =

        Array.isArray(detail.data)

            ? detail.data

            : detail.data

                ? [detail.data]

                : [];



    const selectedData =

        dataList[selectedIndex] || {};



    const previewRequest = {

        ...detail,

        data:selectedData

    };



    return (

        <div

            style={{

                display:"flex",

                gap:20,

                height:700

            }}

        >


            {/* =====================
                데이터 목록
            ====================== */}

            <div

                style={{

                    width:220,

                    border:"1px solid #ddd",

                    display:"flex",

                    flexDirection:"column"

                }}

            >


                <div

                    style={{

                        padding:12,

                        fontWeight:"bold",

                        background:"#f5f5f5",

                        borderBottom:
                            "1px solid #ddd"

                    }}

                >

                    출력 데이터

                    <span
                        style={{
                            marginLeft:5,
                            color:"#1677ff"
                        }}
                    >

                        {dataList.length}건

                    </span>

                </div>



                <div

                    style={{

                        flex:1,

                        overflowY:"auto"

                    }}

                >


                    {
                        dataList.length === 0 &&

                        <div
                            style={{
                                padding:15
                            }}
                        >

                            데이터 없음

                        </div>

                    }



                    {
                        dataList.map((item,index)=>(


                            <div

                                key={index}


                                onClick={()=>{

                                    setSelectedIndex(index);

                                }}


                                style={{

                                    padding:"12px 15px",

                                    cursor:"pointer",

                                    borderBottom:
                                        "1px solid #eee",


                                    background:

                                        selectedIndex === index

                                            ? "#e6f4ff"

                                            : "#fff"

                                }}

                            >

                                {index + 1}번째 데이터


                            </div>


                        ))

                    }


                </div>


            </div>




            {/* =====================
                미리보기
            ====================== */}

            <div

                style={{

                    flex:1,

                    overflow:"auto",

                    border:"1px solid #ddd",

                    padding:10

                }}

            >

                <TemplatePreview

                    key={

                        `${detail.ordno}_${selectedIndex}`

                    }

                    request={previewRequest}

                />


            </div>



        </div>

    );

}