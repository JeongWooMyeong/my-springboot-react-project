export default function TemplatePreview({ request }) {
    // 신청자가 입력한 값(JSON)
    const data = JSON.parse(request.data);

    // 템플릿 정의(JSON) - canvas_data
    const fields = JSON.parse(request.canvasData);

    return (
        <div style={{ position: "relative", width: 800, height: 600, border: "1px solid #ccc", padding: 10 }}>
            {/* 타이틀 */}
            <h4 style={{ margin: 0 }}>템플릿명 : {request.title}</h4>
            <hr style={{ margin: "10px 0" }} />

            {/* 미리보기 영역 */}
            {fields.map(field => {
                if (field.type === "text") {
                    return (
                        <div
                            key={field.id}
                            style={{
                                position: "absolute",
                                left: field.x,
                                top: field.y,
                                fontSize: field.fontSize,
                                color: field.fill
                            }}
                        >
                            {data[field.fieldName]}
                        </div>
                    );
                }
                if (field.type === "image") {
                    return (
                        <img
                            key={field.id}
                            src={data[field.fieldName]}
                            alt=""
                            style={{
                                position: "absolute",
                                left: field.x,
                                top: field.y,
                                width: field.width,
                                height: field.height
                            }}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}
