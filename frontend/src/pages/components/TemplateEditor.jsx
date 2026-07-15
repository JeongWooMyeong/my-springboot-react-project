import { useEffect, useState, useRef } from "react";
import {Stage, Rect, Layer, Text, Image as KonvaImage, Line, Group, Transformer} from "react-konva";
import axios from "axios";
import useImage from "use-image";
import { mmToPx } from"../../util/Utils";

export default function TemplateEditor({ template, dataMap = {}, clcd, onSave, isOpen }) {

    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [title, setTitle] = useState("");

    const stageRef = useRef(null);
    //26.07.15
    const transformerRef = useRef(null);
    const nodeRefs = useRef({});

    const selectedElement = elements.find(el => el.id === selectedId);
    //2026.07.13 용지크기 추가
    const [papersize, setPapersize] = useState("A4");

    const paperSizes = {
        A4: { widthMm: 210, heightMm: 297 },       // A4 = 210 × 297 mm
        A3: { widthMm: 297, heightMm: 420},
        Letter: { widthMm: 216, heightMm: 279 },   // Letter = 8.5 × 11 inch ≈ 216 × 279 mm
        Legal: { widthMm: 216, heightMm: 356 }     // Legal = 8.5 × 14 inch ≈ 216 × 356 mm
    };

// 예시 사용
    const selected = paperSizes[papersize]; // 예: A4
    const widthPx = mmToPx(selected.widthMm);
    const heightPx = mmToPx(selected.heightMm);

    // 그대로 DB 저장용 mm 값
    const paperwidth = selected.widthMm;
    const paperheight = selected.heightMm;


    const stageWidth = 800;
    const stageHeight = 600;
    const scaleX = stageWidth / widthPx;
    const scaleY = stageHeight / heightPx;

    useEffect(() => {

        const transformer = transformerRef.current;

        if (!transformer) return;


        const node = nodeRefs.current[selectedId];


        if(node){

            transformer.nodes([node]);
            transformer.getLayer().batchDraw();

        }else{

            transformer.nodes([]);

        }

    },[selectedId, elements]);

    useEffect(() => {
        //alert(isOpen);
        if (isOpen) {
            // 모달 열릴 때마다 초기화
            setTitle("");
            setElements([]);
        }
    }, [isOpen]);

    // ----------------------------
    // INIT
    // ----------------------------
    useEffect(() => {
        if (!template) return;
        const parsed = typeof template.canvasData === "string"
            ? JSON.parse(template.canvasData)
            : template.canvasData;
        setElements(parsed || []);
        setTitle(template.title || "");
    }, [template]);

    // ----------------------------
    // ADD TEXT
    // ----------------------------
    const addText = () => {
        const newEl = {
            id: Date.now(),
            type: "text",
            text: "텍스트",
            fieldName: `field_${Date.now()}`,
            x: 100,
            y: 100,
            width: 150,
            height: 40,
            fontSize: 20,
            fill: "black"
        };

        setElements(prev => [...prev, newEl]);
    };

    // ----------------------------
    // ADD IMAGE (fieldName만 저장)
    // ----------------------------
    const addImage = () => {
        const newEl = {
            id: Date.now(),
            type: "image",
            fieldName: `image_${Date.now()}`, // ⭐ 핵심
            x: 100,
            y: 100,
            width: 150,
            height: 120
        };

        setElements(prev => [...prev, newEl]);
    };

    // ----------------------------
    // UPDATE ELEMENT
    // ----------------------------
    const updateElement = (id, attrs) => {
        setElements(prev =>
            prev.map(el =>
                el.id === id ? { ...el, ...attrs } : el
            )
        );
    };

    const updateText = (value) => {
        setElements(prev =>
            prev.map(el =>
                el.id === selectedId
                    ? { ...el, text: value }
                    : el
            )
        );
    };

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
    // DELETE
    // ----------------------------
    const deleteElement = () => {
        if (!selectedId) return;

        setElements(prev =>
            prev.filter(el => el.id !== selectedId)
        );

        setSelectedId(null);
    };

    // ----------------------------
    // SAVE TEMPLATE + THUMBNAIL
    // ----------------------------
    const saveTemplate = async () => {
        try {
            const thumbnailDataUrl = stageRef.current.toDataURL({ pixelRatio: 0.3 });
            const blob = dataURLToBlob(thumbnailDataUrl);

            const templatePayload = {
                id: template?.id,   // null일 수도 있으니 optional chaining
                title,
                canvasData: JSON.stringify(elements),
                papersize,              // ✅ 용지 크기 추가
                paperwidth,
                paperheight,
                clcd,
                active: true
            };

            const formData = new FormData();
            formData.append(
                "template",
                new Blob([JSON.stringify(templatePayload)], { type: "application/json" })
            );
            formData.append("thumbnail", blob, "thumbnail.png");

            if (template?.id) {
                await axios.put(`/api/sytm2000/${template.id}`, formData);
            } else {
                await axios.post("/api/sytm2000", formData);
            }

            alert("저장 완료");
            onSave?.();
        } catch (e) {
            console.error("저장 실패:", e);
            alert("저장 실패");
        }
    };


    const updateTemplate = async () => {
        try {
            const thumbnailDataUrl = stageRef.current.toDataURL({
                pixelRatio: 0.3
            });

            const blob = dataURLToBlob(thumbnailDataUrl);

            const templatepayload = {
                id: template?.id,
                title: title,
                canvasData: JSON.stringify(elements),
                papersize,              // ✅ 용지 크기 추가
                paperwidth,
                paperheight,
                clcd: clcd,   // 현재 선택된 분류 코드
                active: true             // 신규 등록 시 기본 활성화
            };

            const formData = new FormData();

            formData.append(
                "template",
                new Blob([JSON.stringify(templatepayload)], {
                    type: "application/json"
                })
            );

            formData.append("thumbnail", blob, "thumbnail.png");

            await fetch(`/api/sytm2000/${template.id}`, {
                method: "PUT",
                body: formData
            });

            alert("수정 완료!");
            onSave?.();
        } catch (err) {
            console.error("수정 실패:", err);
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

            {/* LEFT */}
            <div style={{ width: 250 }}>

                <h3>템플릿</h3>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="템플릿 이름"
                    style={{ width: "100%", padding: 6 }}
                />

                <h3>용지 크기</h3>
                <select value={papersize} onChange={(e) => setPapersize(e.target.value)}>
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="Letter">Letter</option>
                </select>

                <h3>툴</h3>

                <button onClick={addText}>+ 텍스트</button>
                <button onClick={addImage}>+ 이미지</button>

                <br /><br />

                <button onClick={deleteElement} style={{ color: "red" }}>
                    삭제
                </button>

                <button onClick={template?.id ? updateTemplate : saveTemplate}>
                    {template?.id ? "수정" : "저장"}
                </button>

                <hr />

                {/* 속성 */}
                {selectedElement && (
                    <div>
                        <h4>속성</h4>

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
                                />
                            </>
                        )}

                        {selectedElement.type === "image" && (
                            <input
                                value={selectedElement.fieldName || ""}
                                onChange={(e) => updateFieldName(e.target.value)}
                                placeholder="image fieldName"
                            />
                        )}
                    </div>
                )}

                <hr />

                <pre style={{ fontSize: 11 }}>
                    {JSON.stringify(elements, null, 2)}
                </pre>
            </div>

            {/* CANVAS */}
            <div>
                <Stage
                    ref={stageRef}
                    width={stageWidth}
                    height={stageHeight}
                    style={{ border: "1px solid #ccc" }}
                >
                    <Layer>
                        <Group
                            scaleX={scaleX}
                            scaleY={scaleY}
                        >
                            {elements.map(el => {
                                if (el.type === "text") {
                                    return (
                                        <Text
                                            key={el.id}
                                            name="text"
                                            offsetX={0}
                                            offsetY={0}
                                            ref={(node)=>{
                                                if(node){
                                                    nodeRefs.current[el.id] = node;
                                                }
                                            }}
                                            text={`${el.text} ({{${el.fieldName}}})`}
                                            x={el.x}
                                            y={el.y}
                                            width={el.width}
                                            height={el.height}
                                            fontSize={el.fontSize}
                                            fill={el.fill}
                                            draggable
                                            onClick={() => setSelectedId(el.id)}
                                            onDragEnd={(e) =>
                                                updateElement(el.id, {
                                                    x: e.target.x(),
                                                    y: e.target.y()
                                                })
                                            }
                                            stroke={selectedId === el.id ? "blue" : null}
                                            strokeWidth={selectedId === el.id ? 2 : 0}
                                            onTransformEnd={(e)=>{

                                                const node = e.target;

                                                const scaleX = node.scaleX();
                                                const scaleY = node.scaleY();


                                                const newWidth =
                                                    node.width() * scaleX;

                                                const newHeight =
                                                    node.height() * scaleY;


                                                const newFontSize =
                                                    el.fontSize * scaleY;


                                                node.scaleX(1);
                                                node.scaleY(1);


                                                updateElement(el.id,{
                                                    x: node.x(),
                                                    y: node.y(),
                                                    width: newWidth,
                                                    height: newHeight,
                                                    fontSize: newFontSize
                                                });

                                            }}
                                        />
                                    );
                                }

                                if (el.type === "image") {
                                    return (
                                        <CanvasImage
                                            key={el.id}
                                            el={el}
                                            dataMap={dataMap}
                                            updateElement={updateElement}
                                            selectedId={selectedId}
                                            setSelectedId={setSelectedId}
                                            scaleX={scaleX}
                                            scaleY={scaleY}
                                            nodeRefs={nodeRefs}
                                        />
                                    );
                                }

                                return null;
                            })}

                        </Group>

                        <Transformer
                            ref={transformerRef}
                            rotateEnabled={false}
                            keepRatio={false}
                            enabledAnchors={[
                                "top-left",
                                "top-right",
                                "bottom-left",
                                "bottom-right"
                            ]}
                        />
                    </Layer>
                </Stage>
            </div>

        </div>
    );
}

// ----------------------------
// IMAGE COMPONENT (핵심)
// ----------------------------
function CanvasImage({ el, dataMap, updateElement, selectedId, setSelectedId, scaleX, scaleY, nodeRefs }) {

    const src = dataMap?.[el.fieldName];
    const [img] = useImage(src || "");

    const isEmpty = !src;

    const isSelected = selectedId === el.id;

    return (
        <>
            {/* =========================
                IMAGE 존재할 때
            ========================= */}
            {!isEmpty && (
                <KonvaImage
                    ref={(node)=>{
                        if(node){
                            nodeRefs.current[el.id]=node;
                        }
                    }}
                    image={img}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    draggable
                    onClick={() => setSelectedId(el.id)}
                    onDragEnd={(e) =>
                        updateElement(el.id, {
                            x: e.target.x(),
                            y: e.target.y()
                        })
                    }
                    stroke={isSelected ? "#1976d2" : null}
                    strokeWidth={2}
                    onTransformEnd={(e)=>{

                        const node=e.target;


                        const nodeScaleX = node.scaleX();
                        const nodeScaleY = node.scaleY();


                        const width =
                            node.width() * nodeScaleX;


                        const height =
                            node.height() * nodeScaleY;


                        node.scaleX(1);
                        node.scaleY(1);


                        updateElement(el.id,{
                            x: node.x() / scaleX,
                            y: node.y() / scaleY,
                            width,
                            height
                        });

                    }}
                />
            )}

            {/* =========================
                PLACEHOLDER (점선 박스)
            ========================= */}
            {isEmpty && (
                <>
                    <Rect
                        ref={(node)=>{
                            if(node){
                                nodeRefs.current[el.id]=node;
                            }
                        }}
                        x={el.x}
                        y={el.y}
                        width={el.width}
                        height={el.height}
                        fill="#fafafa"
                        stroke={isSelected ? "#1976d2" : "#bbb"}
                        strokeWidth={1}
                        dash={[6, 4]}   // ⭐ 핵심: 점선
                        draggable
                        onClick={() => setSelectedId(el.id)}
                        onDragEnd={(e) =>
                            updateElement(el.id, {
                                x: e.target.x(),
                                y: e.target.y()
                            })
                        }
                        onTransformEnd={(e)=>{

                            const node=e.target;

                            const width =
                                node.width() * node.scaleX();

                            const height =
                                node.height() * node.scaleY();


                            node.scaleX(1);
                            node.scaleY(1);


                            updateElement(el.id,{
                                x: node.x() / scaleX,
                                y: node.y() / scaleY,
                                width,
                                height
                            });

                        }}
                    />

                    <Text
                        x={el.x}
                        y={el.y + el.height / 2 - 7}
                        width={el.width}
                        text={el.fieldName || "IMAGE"}
                        fontSize={12}
                        fill="#888"
                        align="center"
                        onDragEnd={(e) =>
                            updateElement(el.id, {
                                x: e.target.x(),
                                y: e.target.y()
                            })
                        }
                    />
                </>
            )}
        </>
    );
}