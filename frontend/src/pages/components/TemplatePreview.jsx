import {
    Stage,
    Layer,
    Group,
    Text,
    Rect,
    Image as KonvaImage
} from "react-konva";

import useImage from "use-image";
import { mmToPx } from "../../util/Utils";



export default function TemplatePreview({ request }) {


    const data =
        JSON.parse(request.data || "{}");


    const fields =
        JSON.parse(request.canvasData || "[]");



    // =============================
    // TemplateEditor 동일
    // =============================

    const stageWidth = 800;
    const stageHeight = 600;



    const paperWidthPx =
        mmToPx(
            Number(request.paperwidth || 210)
        );


    const paperHeightPx =
        mmToPx(
            Number(request.paperheight || 297)
        );



    const scaleX =
        stageWidth / paperWidthPx;


    const scaleY =
        stageHeight / paperHeightPx;



    // =============================
    // TEXT FONT AUTO FIT
    // =============================

    const getFitFontSize = (
        text,
        field
    )=>{


        let size =
            field.fontSize || 20;


        const width =
            field.width || 100;


        const height =
            field.height || 30;



        while(size > 8){


            const charsPerLine =
                Math.floor(
                    width /
                    (size * 0.55)
                );



            const lineCount =
                Math.ceil(
                    text.length /
                    charsPerLine
                );



            const totalHeight =
                lineCount *
                size *
                1.2;



            if(totalHeight <= height){
                break;
            }


            size--;

        }


        return size;

    };





    return (

        <div

            style={{
                width:820,
                height:650,
                border:"1px solid #ccc",
                background:"#eee",
                padding:10
            }}

        >


            <h4>
                템플릿명 : {request.title}
            </h4>



            <Stage

                width={stageWidth}

                height={stageHeight}

                style={{

                    border:"2px dashed gray",

                    background:"#fff"

                }}

            >


                <Layer>


                    {/* TemplateEditor 동일 */}
                    <Group

                        scaleX={scaleX}

                        scaleY={scaleY}

                    >


                        {
                            fields.map(field=>{


                                // =====================
                                // TEXT
                                // =====================

                                if(field.type==="text"){


                                    const value =
                                        data[field.fieldName]
                                        ??
                                        field.text
                                        ??
                                        "";



                                    return (

                                        <Text

                                            key={field.id}


                                            x={field.x}

                                            y={field.y}


                                            width={field.width}

                                            height={field.height}


                                            text={value}


                                            fontSize={
                                                getFitFontSize(
                                                    value,
                                                    field
                                                )
                                            }


                                            fill={
                                                field.fill
                                                ||
                                                "black"
                                            }


                                            wrap="word"


                                            ellipsis={false}


                                        />

                                    );

                                }





                                // =====================
                                // IMAGE
                                // =====================

                                if(field.type==="image"){

                                    let imgSrc =
                                        data[field.fieldName];


                                    // JSON 문자열이면 변환
                                    if(imgSrc){

                                        try{

                                            const parsed =
                                                JSON.parse(imgSrc);


                                            if(parsed.url){
                                                imgSrc = parsed.url;
                                            }

                                        }catch(e){

                                        }

                                    }


                                    // 상대경로 -> 절대경로
                                    if(imgSrc && imgSrc.startsWith("/")){

                                        imgSrc =
                                            window.location.origin
                                            + imgSrc;

                                    }


                                    return (

                                        <PreviewImage

                                            key={field.id}

                                            field={field}

                                            src={imgSrc}

                                        />

                                    );

                                }



                                return null;


                            })
                        }



                    </Group>



                </Layer>


            </Stage>



        </div>

    );

}





function PreviewImage({
                          field,
                          src
                      }){


    const [img] =
        useImage(
            src || "",
            "anonymous"
        );



    return (

        <>


            {/* 이미지 영역 */}

            <Rect

                x={field.x}

                y={field.y}

                width={field.width}

                height={field.height}

                stroke="#aaa"

                dash={[6,4]}

            />



            {
                img &&

                <KonvaImage

                    image={img}

                    x={field.x}

                    y={field.y}

                    width={field.width}

                    height={field.height}

                />

            }


        </>

    );

}