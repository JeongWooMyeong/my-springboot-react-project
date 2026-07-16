import React, { useEffect, useState } from "react";
import {
    Stage,
    Layer,
    Text,
    Rect,
    Image as KonvaImage
} from "react-konva";

import useImage from "use-image";
import * as XLSX from "xlsx";

// =============================
// IMAGE COMPONENT
// =============================
function CanvasImage({ el, src, isFocus, onClick }) {

    const [img, status] = useImage(src || "", "anonymous");

    const hasImage =
        !!src && status === "loaded";


    return (
        <>
            {/* 이미지 영역 표시 */}
            <Rect
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                fill={
                    hasImage
                        ? "transparent"
                        : "#f5f5f5"
                }
                stroke={
                    isFocus
                        ? "#1976d2"
                        : "#aaa"
                }
                dash={[6,4]}
                onClick={onClick}
            />


            {/* 이미지 */}
            {hasImage && (
                <KonvaImage
                    image={img}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                />
            )}

        </>
    );
}



// =============================
// PAGE
// =============================
export default function Pppo1100Page({
                                         templateid,
                                         onBack
                                     }) {

    const ordno =
        "TP" +
        Math.floor(Math.random() * 1_000_000_000000)
            .toString()
            .padStart(12,"0");

    const token =
        JSON.parse(localStorage.getItem("user"))
            ?.token;


    const [templateData,setTemplateData] =
        useState(null);


    const [productData,setProductData] =
        useState({});


    const [focusField,setFocusField] =
        useState(null);



    /*
     * ============================
     * LOAD TEMPLATE
     * ============================
     */
    useEffect(()=>{

        if(!templateid)
            return;


        (async()=>{

            const res =
                await fetch(
                    `/api/sytm2000/${templateid}`
                );


            const data =
                await res.json();



            setTemplateData({

                ...data,

                canvasData:
                    JSON.parse(
                        data.canvasData
                    )

            });


        })();


    },[templateid]);




    if(!templateData)
        return <div>로딩중...</div>;



    /*
     * ============================
     * 템플릿 생성 화면과 동일한 SCALE
     * ============================
     */


    const STAGE_WIDTH = 800;
    const STAGE_HEIGHT = 600;


    const mmToPx = 3.78;


    const paperWidth =
        Number(
            templateData.paperwidth || 210
        );


    const paperHeight =
        Number(
            templateData.paperheight || 297
        );



    const paperPxWidth =
        paperWidth * mmToPx;


    const paperPxHeight =
        paperHeight * mmToPx;



    const scaleX =
        STAGE_WIDTH / paperPxWidth;


    const scaleY =
        STAGE_HEIGHT / paperPxHeight;






    /*
     * ============================
     * FONT SIZE FIT
     * ============================
     */
    const getFitFontSize = (
        text,
        width,
        height,
        fontSize
    )=>{


        let size =
            fontSize;


        while(size > 5){


            const temp =
                new window.Konva.Text({

                    text,

                    width,

                    fontSize:size,

                    wrap:"word"

                });



            if(
                temp.height()
                <= height
            ){

                break;

            }


            size--;

        }


        return size;

    };






    /*
     * ============================
     * INPUT
     * ============================
     */
    const handleChange = (
        key,
        value
    )=>{


        setProductData(prev=>({

            ...prev,

            [key]:value

        }));

    };






    /*
     * ============================
     * IMAGE UPLOAD
     * ============================
     */
    const handleImageUpload =
        async(
            fieldName,
            file
        )=>{


            const formData =
                new FormData();


            formData.append(
                "file",
                file
            );



            const res =
                await fetch(
                    "/api/pppo1000/upload/image",
                    {
                        method:"POST",

                        headers:{
                            Authorization:
                                `Bearer ${token}`
                        },

                        body:formData
                    }
                );



            const result =
                await res.json();



            setProductData(prev=>({

                ...prev,

                [fieldName]:
                result.url

            }));


        };

    const saveData = async () => {

        const payload = {
            ordno,
            templateid,
            data: productData
        };


        const res = await fetch(
            "/api/pppo1000",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body:
                    JSON.stringify(payload)
            }
        );


        if(!res.ok){

            alert("저장 실패");
            return;

        }


        alert("저장 완료");

        onBack();

    };

    const handleExcelUpload = (e) => {

        const file = e.target.files[0];

        if(!file)
            return;


        const reader = new FileReader();


        reader.onload = (evt)=>{


            const data = evt.target.result;


            const workbook =
                XLSX.read(
                    data,
                    {
                        type:"binary"
                    }
                );


            const sheetName =
                workbook.SheetNames[0];


            const sheet =
                workbook.Sheets[sheetName];


            const rows =
                XLSX.utils.sheet_to_json(
                    sheet,
                    {
                        defval:""
                    }
                );


            if(rows.length === 0){
                alert("엑셀 데이터가 없습니다.");
                return;
            }


            /*
             * 첫 번째 행 기준
             */
            const excelData =
                rows[0];


            const newData = {};



            templateData.canvasData.forEach(field=>{


                const key =
                    field.fieldName;


                if(excelData[key] !== undefined){

                    newData[key] =
                        excelData[key];

                }


            });



            setProductData(prev=>({

                ...prev,

                ...newData

            }));


            alert("엑셀 데이터 적용 완료");


        };


        reader.readAsArrayBuffer(file);

    };




    /*
     * ============================
     * CANVAS
     * ============================
     */
    const renderCanvas = ()=>{


        return (

            <Stage

                width={STAGE_WIDTH}

                height={STAGE_HEIGHT}

                style={{

                    border:"1px solid #ddd",

                    background:"#fff"

                }}

            >

                <Layer

                    scaleX={scaleX}

                    scaleY={scaleY}

                >


                    {
                        templateData.canvasData.map(
                            el=>{


                                const value =
                                    productData[
                                        el.fieldName
                                        ];


                                const isFocus =
                                    focusField
                                    ===
                                    el.fieldName;




                                // TEXT
                                if(
                                    el.type
                                    ===
                                    "text"
                                ){

                                    return (

                                        <React.Fragment
                                            key={el.id}
                                        >


                                            <Text

                                                x={el.x}

                                                y={el.y}

                                                width={el.width}

                                                height={el.height}


                                                text={
                                                    value
                                                    ||
                                                    el.text
                                                    ||
                                                    ""
                                                }


                                                fontSize={

                                                    getFitFontSize(

                                                        value
                                                        ||
                                                        el.text
                                                        ||
                                                        "",


                                                        el.width,


                                                        el.height,


                                                        el.fontSize
                                                        ||
                                                        20

                                                    )

                                                }


                                                fill={
                                                    el.fill
                                                    ||
                                                    "black"
                                                }


                                                wrap="word"


                                                verticalAlign="top"


                                            />



                                            {
                                                isFocus &&
                                                (

                                                    <Rect

                                                        x={el.x-4}

                                                        y={el.y-4}

                                                        width={
                                                            el.width+8
                                                        }

                                                        height={
                                                            el.height+8
                                                        }

                                                        stroke="#1976d2"

                                                        dash={[6,4]}

                                                    />

                                                )
                                            }



                                        </React.Fragment>

                                    );

                                }





                                // IMAGE
                                if(
                                    el.type
                                    ===
                                    "image"
                                ){

                                    return (

                                        <CanvasImage

                                            key={el.id}

                                            el={el}

                                            src={
                                                value
                                            }

                                            isFocus={
                                                isFocus
                                            }

                                            onClick={()=>{

                                                setFocusField(
                                                    el.fieldName
                                                );

                                            }}

                                        />

                                    );

                                }



                                return null;


                            })

                    }



                </Layer>


            </Stage>

        );


    };

    return (

        <div
            style={{
                display:"flex",
                height:"100%"
            }}
        >


            <div
                style={{
                    width:320,
                    padding:10,
                    borderRight:
                        "1px solid #ddd"
                }}
            >


                <div
                    style={{
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center",
                        marginBottom:20
                    }}
                >

                    <button
                        onClick={onBack}
                    >
                        ← 뒤로
                    </button>


                    <label
                        style={{
                            background:"#1677ff",
                            color:"#fff",
                            padding:"6px 12px",
                            borderRadius:4,
                            cursor:"pointer",
                            fontSize:14
                        }}
                    >
                        엑셀 업로드

                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleExcelUpload}
                            style={{
                                display:"none"
                            }}
                        />

                    </label>


                </div>



                <h3>
                    데이터 입력
                </h3>



                {
                    templateData.canvasData.map(
                        field=>{


                            const isImage =
                                field.type
                                ===
                                "image";



                            return (

                                <div
                                    key={field.id}
                                    style={{
                                        marginBottom:12
                                    }}
                                >


                                    <label>
                                        {field.fieldName}
                                    </label>


                                    {
                                        !isImage &&

                                        <input

                                            value={
                                                productData[
                                                    field.fieldName
                                                    ]
                                                ||
                                                ""
                                            }

                                            onChange={
                                                e=>
                                                    handleChange(
                                                        field.fieldName,
                                                        e.target.value
                                                    )
                                            }

                                            onFocus={()=>{

                                                setFocusField(
                                                    field.fieldName
                                                );

                                            }}

                                            style={{
                                                width:"100%"
                                            }}

                                        />

                                    }



                                    {
                                        isImage &&

                                        <input

                                            type="file"

                                            accept="image/*"

                                            onChange={
                                                e=>{

                                                    const file =
                                                        e.target.files[0];


                                                    if(file)
                                                        handleImageUpload(
                                                            field.fieldName,
                                                            file
                                                        );

                                                }
                                            }

                                        />

                                    }


                                </div>

                            );


                        })

                }

                <button
                    onClick={saveData}
                    style={{
                        width:"100%",
                        marginTop:20,
                        padding:10
                    }}
                >
                    저장
                </button>
            </div>




            <div
                style={{
                    padding:20
                }}
            >

                {renderCanvas()}


            </div>



        </div>

    );

}