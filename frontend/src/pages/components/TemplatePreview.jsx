export default function TemplatePreview({ request }) {
    const data = JSON.parse(request.data || "{}");
    const fields = JSON.parse(request.canvasData || "[]");

    const stageWidth = 800;
    const stageHeight = 600;

    // 실제 화면에 보여줄 축소 비율
    const previewScale = 0.7;

    const previewWidth = stageWidth * previewScale;
    const previewHeight = stageHeight * previewScale;


    return (
        <div
            style={{
                width: 820,
                height: 650,
                border: "1px solid #ccc",
                background: "#eee",
                padding: 10
            }}
        >

            <h4>
                템플릿명 : {request.title}
            </h4>


            {/* ⭐ 축소된 Stage = 용지 영역 */}
            <div
                style={{
                    position: "relative",
                    width: previewWidth,
                    height: previewHeight,
                    border: "2px dashed gray",
                    background: "#fff"
                }}
            >

                {/* 원본 Stage 좌표계 */}
                <div
                    style={{
                        position: "absolute",
                        width: stageWidth,
                        height: stageHeight,
                        transform: `scale(${previewScale})`,
                        transformOrigin: "top left"
                    }}
                >

                    {fields.map(field => {

                        if(field.type === "text") {
                            return (
                                <div
                                    key={field.id}
                                    style={{
                                        position:"absolute",
                                        left:field.x,
                                        top:field.y,
                                        width:field.width,
                                        height:field.height,
                                        fontSize:field.fontSize,
                                        color:field.fill,
                                        overflow:"hidden",
                                        whiteSpace:"pre-wrap",
                                        wordBreak:"break-word"
                                    }}
                                >
                                    {data[field.fieldName] ?? field.text}
                                </div>
                            );
                        }


                        if(field.type === "image") {

                            const imgSrc = data[field.fieldName];

                            return (
                                <div
                                    key={field.id}
                                    style={{
                                        position:"absolute",
                                        left:field.x,
                                        top:field.y,
                                        width:field.width,
                                        height:field.height,
                                        border:"1px dashed #aaa"
                                    }}
                                >
                                    {imgSrc && (
                                        <img
                                            src={imgSrc}
                                            alt=""
                                            style={{
                                                width:"100%",
                                                height:"100%",
                                                objectFit:"fill"
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