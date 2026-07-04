import { useEffect, useState } from "react";
import { Stage, Layer, Text } from "react-konva";

export default function Pppo1100Page({ templateid, onBack }) {

    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const [templateData, setTemplateData] = useState(null);
    const [productData, setProductData] = useState({});
    //const [ordno] = useState(`ORD_${Date.now()}`);
    const ordno =
        "TP" +
        Math.floor(Math.random() * 1_000_000_000000)
            .toString()
            .padStart(12, "0");

    // -------------------------
    // 1. 템플릿 로드
    // -------------------------
    useEffect(() => {
        if (!templateid) return;

        const load = async () => {
            try {
                const res = await fetch(`/api/sytm2000/${templateid}`);
                const data = await res.json();

                setTemplateData({
                    ...data,
                    canvasData: JSON.parse(data.canvasData)
                });

            } catch (e) {
                console.error(e);
            }
        };

        load();
    }, [templateid]);

    if (!templateData) {
        return (
            <div>
                <button onClick={onBack}>← 뒤로</button>
                <p>로딩중...</p>
            </div>
        );
    }

    // -------------------------
    // SAVE (핵심 수정)
    // -------------------------
    const saveData = async () => {
        try {
            const payload = {
                ordno,
                templateid,
                data: productData   // 그대로 보내도 OK (백엔드가 Map이면)
            };

            const res = await fetch("/api/pppo1000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`   // ⭐ 필수
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("저장 실패");

            alert("저장 완료");

            // 목록으로 이동
            onBack();

        } catch (e) {
            console.error(e);
            alert("저장 실패");
        }
    };

    // -------------------------
    // GRID
    // -------------------------
    const renderGrid = () => {
        return (
            <div style={{ width: 320, padding: 10, borderRight: "1px solid #ddd" }}>
                <h3>데이터 입력</h3>

                <div style={{ fontSize: 12, marginBottom: 10 }}>
                    ORD NO: {ordno}
                </div>

                {templateData.canvasData.map(field => (
                    <div key={field.id} style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 12 }}>
                            {field.fieldName}
                        </label>

                        <input
                            style={{
                                width: "100%",
                                padding: 6,
                                marginTop: 4
                            }}
                            value={productData[field.fieldName] ?? ""}
                            onChange={(e) => {
                                setProductData(prev => ({
                                    ...prev,
                                    [field.fieldName]: e.target.value
                                }));
                            }}
                        />
                    </div>
                ))}

                <button
                    onClick={saveData}
                    style={{
                        marginTop: 20,
                        width: "100%",
                        padding: 10,
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    저장
                </button>
            </div>
        );
    };

    // -------------------------
    // CANVAS
    // -------------------------
    const renderCanvas = () => {
        return (
            <Stage width={900} height={600} style={{ border: "1px solid #ddd" }}>
                <Layer>

                    {templateData.canvasData.map(el => {

                        const value = productData?.[el.fieldName] ?? "";

                        if (el.type === "text") {
                            return (
                                <Text
                                    key={el.id}
                                    x={el.x}
                                    y={el.y}
                                    text={value}
                                    fontSize={el.fontSize || 20}
                                    fill={el.fill || "black"}
                                />
                            );
                        }

                        return null;
                    })}

                </Layer>
            </Stage>
        );
    };

    // -------------------------
    // UI
    // -------------------------
    return (
        <div style={{ display: "flex", height: "100%" }}>

            <div>
                <button onClick={onBack}>← 뒤로</button>
                {renderGrid()}
            </div>

            <div style={{ flex: 1, padding: 10 }}>
                {renderCanvas()}
            </div>

        </div>
    );
}