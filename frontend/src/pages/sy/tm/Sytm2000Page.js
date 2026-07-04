import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Text, Image as KonvaImage } from "react-konva";
import axios from "axios";
import useImage from "use-image";

export default function Sytm2000Page({ templateData }) {

    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const stageRef = useRef(null);

    const selectedElement = elements.find(el => el.id === selectedId);

    // ----------------------------
    // 초기 데이터 로딩 (핵심)
    // ----------------------------
    useEffect(() => {
        if (!templateData) return;

        setElements(templateData.canvasData || []);
    }, [templateData]);

    // ----------------------------
    // TEXT 추가
    // ----------------------------
    const addText = () => {
        const newEl = {
            id: Date.now(),
            type: "text",
            text: "텍스트",
            fieldName: `field_${Date.now()}`,
            x: 100,
            y: 100,
            fontSize: 20,
            fill: "black"
        };

        setElements(prev => [...prev, newEl]);
    };

    // ----------------------------
    // IMAGE 추가
    // ----------------------------
    const addImage = (file) => {
        const reader = new FileReader();

        reader.onload = () => {
            const newEl = {
                id: Date.now(),
                type: "image",
                src: reader.result,
                x: 100,
                y: 100,
                width: 150,
                height: 120
            };

            setElements(prev => [...prev, newEl]);
        };

        reader.readAsDataURL(file);
    };

    // ----------------------------
    // 요소 업데이트
    // ----------------------------
    const updateElement = (id, attrs) => {
        setElements(prev =>
            prev.map(el =>
                el.id === id ? { ...el, ...attrs } : el
            )
        );
    };

    // ----------------------------
    // fieldName 수정
    // ----------------------------
    const updateFieldName = (value) => {
        setElements(prev =>
            prev.map(el =>
                el.id === selectedId
                    ? { ...el, fieldName: value }
                    : el
            )
        );
    };

    // ----------------------------
    // text 수정
    // ----------------------------
    const updateText = (value) => {
        setElements(prev =>
            prev.map(el =>
                el.id === selectedId
                    ? { ...el, text: value }
                    : el
            )
        );
    };

    // ----------------------------
    // 삭제
    // ----------------------------
    const deleteElement = () => {
        if (!selectedId) return;

        setElements(prev =>
            prev.filter(el => el.id !== selectedId)
        );

        setSelectedId(null);
    };

    // ----------------------------
    // 저장 (CREATE or UPDATE)
    // ----------------------------
    const saveTemplate = async () => {

        try {

            const thumbnailDataUrl = stageRef.current.toDataURL({
                pixelRatio: 0.3
            });

            const thumbnailBlob = dataURLToBlob(thumbnailDataUrl);

            const template = {
                id: templateData?.id,
                title: templateData?.title || "Sytm2000",
                canvasData: JSON.stringify(elements)
            };

            const formData = new FormData();

            formData.append(
                "template",
                new Blob(
                    [JSON.stringify(template)],
                    {
                        type: "application/json"
                    }
                )
            );

            formData.append(
                "thumbnail",
                thumbnailBlob,
                "thumbnail.png"
            );

            if (template.id) {

                await axios.put(
                    `/api/sytm2000/${template.id}`,
                    formData
                );

            } else {

                await axios.post(
                    "/api/sytm2000",
                    formData
                );

            }

            alert("저장 완료");

        } catch (e) {

            console.error(e);

            alert("저장 실패");

        }

    };

    const dataURLToBlob = (dataURL) => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];

        const bstr = atob(arr[1]);

        let n = bstr.length;

        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type: mime });
    };

    // ----------------------------
    // UI
    // ----------------------------
    return (
        <div style={{ display: "flex", gap: 20, padding: 20 }}>

            {/* LEFT PANEL */}
            <div style={{ width: 250 }}>

                <h3>툴</h3>

                <button onClick={addText}>+ 텍스트</button>

                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) addImage(file);
                    }}
                />

                <br /><br />

                <button onClick={deleteElement} style={{ color: "red" }}>
                    삭제
                </button>

                <button onClick={saveTemplate}>
                    저장
                </button>

                <hr />

                {/* 속성 편집 */}
                {selectedElement && (
                    <div>
                        <h4>속성 편집</h4>

                        {selectedElement.type === "text" && (
                            <>
                                <input
                                    value={selectedElement.text}
                                    onChange={(e) => updateText(e.target.value)}
                                    placeholder="텍스트"
                                />

                                <input
                                    value={selectedElement.fieldName}
                                    onChange={(e) => updateFieldName(e.target.value)}
                                    placeholder="fieldName"
                                    style={{ marginTop: 5 }}
                                />
                            </>
                        )}

                        {selectedElement.type === "image" && (
                            <p>이미지 요소 선택됨</p>
                        )}
                    </div>
                )}

                <hr />

                <h4>JSON</h4>
                <pre style={{ fontSize: 11 }}>
                    {JSON.stringify(elements, null, 2)}
                </pre>
            </div>

            {/* CANVAS */}
            <div>
                <Stage
                    ref={stageRef}
                    width={800}
                    height={600}
                    style={{ border: "1px solid #ccc" }}
                >
                    <Layer>

                        {elements.map(el => {

                            if (el.type === "text") {
                                return (
                                    <Text
                                        key={el.id}
                                        text={`${el.text} ({{${el.fieldName}}})`}
                                        x={el.x}
                                        y={el.y}
                                        fontSize={el.fontSize}
                                        fill={el.fill}
                                        draggable

                                        onClick={() => setSelectedId(el.id)}

                                        onDragEnd={(e) => {
                                            updateElement(el.id, {
                                                x: e.target.x(),
                                                y: e.target.y()
                                            });
                                        }}

                                        stroke={selectedId === el.id ? "blue" : null}
                                        strokeWidth={selectedId === el.id ? 2 : 0}
                                    />
                                );
                            }

                            if (el.type === "image") {
                                return (
                                    <CanvasImage
                                        key={el.id}
                                        el={el}
                                        updateElement={updateElement}
                                        selectedId={selectedId}
                                        setSelectedId={setSelectedId}
                                    />
                                );
                            }

                            return null;
                        })}

                    </Layer>
                </Stage>
            </div>

        </div>
    );
}

// ----------------------------
// IMAGE COMPONENT
// ----------------------------
function CanvasImage({ el, updateElement, selectedId, setSelectedId }) {

    const [img] = useImage(el.src);

    return (
        <KonvaImage
            image={img}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            draggable

            onClick={() => setSelectedId(el.id)}

            onDragEnd={(e) => {
                updateElement(el.id, {
                    x: e.target.x(),
                    y: e.target.y()
                });
            }}

            stroke={selectedId === el.id ? "blue" : null}
            strokeWidth={2}
        />
    );
}