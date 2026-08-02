import { useEffect, useRef, useState } from "react";
import TemplatePreview from "../../../components/TemplatePreview/TemplatePreview.jsx";


export default function Pppo2000Detail({ detail }) {


    const [selectedIndex, setSelectedIndex] =
        useState(0);


    const previewRef =
        useRef(null);



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
                    minHeight:0,
                    border:"1px solid #ddd",
                    padding:10,
                    boxSizing:"border-box"
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

                gap:8,

                flex:1,

                minHeight:0,

                minWidth:0,

                overflow:"hidden"

            }}

        >



            {/* =====================
                데이터 목록
            ====================== */}

            <div

                style={{

                    width:140,

                    flexShrink:0,

                    border:"1px solid #ddd",

                    display:"flex",

                    flexDirection:"column",

                    minHeight:0,

                    overflow:"hidden"

                }}

            >


                <div

                    style={{

                        padding:10,

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

                                padding:10

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


                                    padding:"10px",


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
                ref={previewRef}
                style={{
                    flex:1,
                    minWidth:0,
                    minHeight:0,
                    border:"1px solid #ddd",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    overflow:"hidden",
                    boxSizing:"border-box",
                    padding:5
                }}
            >

                <div
                    style={{
                        width:"100%",
                        height:"100%",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        boxSizing:"border-box"
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


        </div>

    );

}