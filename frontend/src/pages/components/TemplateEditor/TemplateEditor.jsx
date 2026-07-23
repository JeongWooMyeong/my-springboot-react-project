import {useState, useRef, useEffect} from "react";
import { mmToPx } from "../../../util/Utils.jsx";
import {saveTemplate, updateTemplate} from "../../../services/tempateApi.js";
import useTemplateEditor from "./hooks/useTemplateEditor.js";
import Toolbar from "./Toolbar.jsx";
import CanvasStage from "./CanvasStage.jsx";
import { getFontList } from "../../../services/sytm3000Api";
import { loadAllFonts } from "../../../util/fontLoader";

export default function TemplateEditor({ template, dataMap = {}, clcd, onSave, isOpen }) {

    const stageRef = useRef(null);
    //26.07.15


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

    const {
        elements,
        selectedId,
        setSelectedId,

        selectedElement,

        title,
        setTitle,

        addText,
        addImage,

        updateElement,

        updateText,
        updateFieldName,

        deleteElement

    } = useTemplateEditor(
        template,
        isOpen
    );

    const [fonts, setFonts] = useState([]);   // 추가

    const handleSave = async () => {

        try {

            const params = {
                stageRef,
                title,
                elements,
                papersize,
                paperwidth,
                paperheight,
                clcd
            };


            if (template?.id) {

                await updateTemplate(
                    template.id,
                    params
                );

                alert("수정 완료");

            } else {

                await saveTemplate(params);

                alert("저장 완료");

            }


            onSave?.();


        } catch (e) {

            console.error("저장 실패:", e);

            alert("저장 실패");

        }
    };

    useEffect(() => {

        if(template?.papersize){
            setPapersize(template.papersize);
        }

    },[template]);

    useEffect(() => {

        const init = async () => {

            const list = await getFontList();

            await loadAllFonts(list);

            setFonts(list);

        };

        init();

    }, []);

    // ----------------------------
    // UI
    // ----------------------------
    return (

        <div
            style={{
                display:"flex",
                gap:20,
                padding:20,
                height:"100vh",
                boxSizing:"border-box"
            }}
        >

            <Toolbar

                title={title}
                setTitle={setTitle}

                papersize={papersize}
                setPapersize={setPapersize}

                addText={addText}
                addImage={addImage}

                deleteElement={deleteElement}

                handleSave={handleSave}

                template={template}

                selectedElement={selectedElement}

                updateText={updateText}
                updateFieldName={updateFieldName}

                elements={elements}

                fonts={fonts}
                updateElement={updateElement}

            />


            <div
                style={{
                    flex:1,
                    overflow:"auto"
                }}
            >
                <CanvasStage
                    stageRef={stageRef}
                    elements={elements}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    updateElement={updateElement}
                    dataMap={dataMap}
                    scaleX={scaleX}
                    scaleY={scaleY}
                />
            </div>


        </div>

    );
}
