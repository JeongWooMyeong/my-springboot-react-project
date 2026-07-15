import React, { useEffect, useState } from "react";
import {
    Stage,
    Layer,
    Text,
    Rect,
    Image as KonvaImage
} from "react-konva";

import useImage from "use-image";


// -----------------------------
// IMAGE COMPONENT
// -----------------------------
function CanvasImage({ el, src, isFocus, onClick }) {

    const [img, status] = useImage(src || "", "anonymous");

    const hasImage = !!src && status === "loaded";

    return (
        <>
            {/* 항상 영역 */}
            <Rect
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                fill={hasImage ? "transparent" : "#f5f5f5"}
                stroke={isFocus ? "#1976d2" : "#aaa"}
                dash={[6, 4]}
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


// -----------------------------
// PAGE
// -----------------------------
export default function Pppo1100Page({ templateid, onBack }) {

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const [templateData, setTemplateData] = useState(null);
    const [productData, setProductData] = useState({});
    const [focusField, setFocusField] = useState(null);

    const ordno =
        "TP" +
        Math.floor(Math.random() * 1_000_000_000000)
            .toString()
            .padStart(12, "0");


    // -----------------------------
    // LOAD TEMPLATE
    // -----------------------------
    useEffect(() => {
        if (!templateid) return;

        (async () => {
            const res = await fetch(`/api/sytm2000/${templateid}`);
            const data = await res.json();

            setTemplateData({
                ...data,
                canvasData: JSON.parse(data.canvasData)
            });
        })();
    }, [templateid]);


    if (!templateData) return <div>로딩중...</div>;


    // -----------------------------
    // INPUT CHANGE
    // -----------------------------
    const handleChange = (key, value) => {
        setProductData(prev => ({
            ...prev,
            [key]: value
        }));
    };


    // -----------------------------
    // IMAGE UPLOAD (URL 저장)
    // -----------------------------
    const handleImageUpload = async (fieldName, file) => {

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/pppo1000/upload/image", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const url = await res.json(); // {url: "..."} 가정

        setProductData(prev => ({
            ...prev,
            [fieldName]: url.url   // ⭐ string만 저장
        }));
    };


    // -----------------------------
    // SAVE
    // -----------------------------
    const saveData = async () => {

        const payload = {
            ordno,
            templateid,
            data: productData
        };

        const res = await fetch("/api/pppo1000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            alert("저장 실패");
            return;
        }

        alert("저장 완료");
        onBack();
    };


    // -----------------------------
    // GRID UI
    // -----------------------------
    const renderGrid = () => (
        <div style={{ width: 320, padding: 10, borderRight: "1px solid #ddd" }}>
            <h3>데이터 입력</h3>

            <div style={{ fontSize: 12 }}>
                ORD: {ordno}
            </div>

            {templateData.canvasData.map(field => {

                const isImage = field.type === "image";

                return (
                    <div key={field.id} style={{ marginBottom: 12 }}>

                        <label style={{ fontSize: 12 }}>
                            {field.fieldName}
                        </label>

                        {/* TEXT */}
                        {!isImage && (
                            <input
                                value={productData[field.fieldName] ?? ""}
                                onChange={(e) =>
                                    handleChange(field.fieldName, e.target.value)
                                }
                                onFocus={() => setFocusField(field.fieldName)}
                                style={{
                                    width: "100%",
                                    padding: 6,
                                    border: focusField === field.fieldName
                                        ? "2px solid #1976d2"
                                        : "1px solid #ccc"
                                }}
                            />
                        )}

                        {/* IMAGE */}
                        {isImage && (
                            <input
                                type="file"
                                accept="image/*"
                                onFocus={() => setFocusField(field.fieldName)}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) handleImageUpload(field.fieldName, file);
                                }}
                            />
                        )}
                    </div>
                );
            })}

            <button onClick={saveData} style={{ width: "100%" }}>
                저장
            </button>
        </div>
    );


    // -----------------------------
    // CANVAS
    // -----------------------------
    const renderCanvas = () => (
        <Stage width={900} height={600} style={{ border: "1px solid #ddd" }}>
            <Layer>

                {templateData.canvasData.map(el => {

                    const value = productData?.[el.fieldName];
                    const isFocus = focusField === el.fieldName;

                    // TEXT
                    if (el.type === "text") {
                        return (
                            <React.Fragment key={el.id}>
                                <Text
                                    x={el.x}
                                    y={el.y}
                                    width={el.width}
                                    height={el.height}
                                    text={value || ""}
                                    fontSize={el.fontSize || 20}
                                    fill={el.fill || "black"}
                                    wrap="word"
                                />

                                {isFocus && (
                                    <Rect
                                        x={el.x - 4}
                                        y={el.y - 4}
                                        width={el.width + 8}
                                        height={el.height + 8}
                                        stroke="#1976d2"
                                        dash={[6, 4]}
                                    />
                                )}
                            </React.Fragment>
                        );
                    }

                    // IMAGE
                    if (el.type === "image") {
                        return (
                            <CanvasImage
                                key={el.id}
                                el={el}
                                src={value}
                                isFocus={isFocus}
                                onClick={() => setFocusField(el.fieldName)}
                            />
                        );
                    }

                    return null;
                })}

            </Layer>
        </Stage>
    );


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