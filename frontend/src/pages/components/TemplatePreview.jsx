export default function TemplatePreview({ request }) {

    const data = JSON.parse(request.data || "{}");
    const fields = JSON.parse(request.canvasData || "[]");


    const stageWidth = 800;
    const stageHeight = 600;


    const previewScale = 0.7;

    const previewWidth = stageWidth * previewScale;
    const previewHeight = stageHeight * previewScale;



    // -----------------------------
    // 텍스트 자동 축소 계산
    // -----------------------------
    const getFitFontSize = (text, field)=>{

        let size = field.fontSize || 20;


        const maxWidth =
            field.width || 100;


        const maxHeight =
            field.height || 30;



        while(size > 8){

            // 예상 글자 수
            const charsPerLine =
                Math.floor(
                    maxWidth / (size * 0.55)
                );


            const lineCount =
                Math.ceil(
                    text.length / charsPerLine
                );


            const totalHeight =
                lineCount * size * 1.2;



            if(totalHeight <= maxHeight){
                break;
            }


            size -= 1;
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


            <div
                style={{
                    position:"relative",
                    width:previewWidth,
                    height:previewHeight,
                    border:"2px dashed gray",
                    background:"#fff"
                }}
            >


                <div
                    style={{
                        position:"absolute",
                        width:stageWidth,
                        height:stageHeight,
                        transform:`scale(${previewScale})`,
                        transformOrigin:"top left"
                    }}
                >


                    {fields.map(field=>{


                        // =========================
                        // TEXT
                        // =========================
                        if(field.type === "text"){


                            const value =
                                data[field.fieldName]
                                ?? field.text
                                ?? "";



                            const fitSize =
                                getFitFontSize(
                                    value,
                                    field
                                );



                            return (
                                <div
                                    key={field.id}

                                    style={{
                                        position:"absolute",

                                        left:field.x,
                                        top:field.y,


                                        width:field.width,
                                        height:field.height,


                                        fontSize:fitSize,

                                        color:field.fill
                                            || "black",


                                        lineHeight:
                                            `${fitSize * 1.2}px`,


                                        whiteSpace:"pre-wrap",

                                        wordBreak:"break-all",


                                        overflow:"hidden"
                                    }}
                                >
                                    {value}
                                </div>
                            );
                        }



                        // =========================
                        // IMAGE
                        // =========================
                        if(field.type === "image"){


                            const imgSrc =
                                data[field.fieldName];



                            return (
                                <div
                                    key={field.id}

                                    style={{
                                        position:"absolute",

                                        left:field.x,
                                        top:field.y,


                                        width:field.width,
                                        height:field.height,


                                        border:
                                            "1px dashed #aaa"
                                    }}
                                >

                                    {imgSrc && (

                                        <img
                                            src={imgSrc}
                                            alt=""

                                            style={{
                                                width:"100%",
                                                height:"100%",

                                                objectFit:"contain"
                                            }}
                                        />

                                    )}

                                </div>
                            );
                        }


                        return null;

                    })}


                </div>


            </div>


        </div>
    );
}