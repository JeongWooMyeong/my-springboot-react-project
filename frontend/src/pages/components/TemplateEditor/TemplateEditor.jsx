import {
    useState,
    useRef,
    useEffect
} from "react";

import {
    mmToPx
} from "../../../util/Utils.jsx";

import {
    saveTemplate,
    updateTemplate
} from "../../../services/tempateApi.js";

import useTemplateEditor
    from "./hooks/useTemplateEditor.js";

import Toolbar
    from "./Toolbar.jsx";

import CanvasStage
    from "./CanvasStage.jsx";

import {
    getFontList
} from "../../../services/sytm3000Api";

import {
    loadAllFonts
} from "../../../util/fontLoader";



export default function TemplateEditor({

                                           template,

                                           dataMap = {},

                                           clcd,

                                           onSave,

                                           isOpen

                                       }) {


    const stageRef =
        useRef(null);



    const [
        papersize,
        setPapersize
    ] = useState("A4");



    const paperSizes = {

        A4:{
            widthMm:210,
            heightMm:297
        },

        A3:{
            widthMm:297,
            heightMm:420
        },

        Letter:{
            widthMm:216,
            heightMm:279
        },

        Legal:{
            widthMm:216,
            heightMm:356
        }

    };



    const selected =
        paperSizes[papersize];



    const widthPx =
        mmToPx(selected.widthMm);


    const heightPx =
        mmToPx(selected.heightMm);



    const paperwidth =
        selected.widthMm;


    const paperheight =
        selected.heightMm;



    const stageWidth = 800;

    const stageHeight = 600;



    const scaleX =
        stageWidth / widthPx;


    const scaleY =
        stageHeight / heightPx;





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




    const [
        fonts,
        setFonts
    ] = useState([]);



    const [
        fontReady,
        setFontReady
    ] = useState(false);





    /*
        저장
    */
    const handleSave = async()=>{


        try{


            const params={

                stageRef,

                title,

                elements,

                papersize,

                paperwidth,

                paperheight,

                clcd

            };



            if(template?.id){


                await updateTemplate(

                    template.id,

                    params

                );


                alert(
                    "수정 완료"
                );


            }
            else{


                await saveTemplate(

                    params

                );


                alert(
                    "저장 완료"
                );


            }



            onSave?.();


        }
        catch(e){


            console.error(
                e
            );


            alert(
                "저장 실패"
            );


        }


    };





    /*
        기존 용지
    */
    useEffect(()=>{


        if(template?.papersize){


            setPapersize(
                template.papersize
            );


        }


    },[template]);







    /*
        폰트 초기화
    */
    useEffect(()=>{


        const init = async()=>{


            try{


                const list =
                    await getFontList();



                console.log(
                    "font list",
                    list
                );



                await loadAllFonts(
                    list
                );



                /*
                    브라우저 폰트 확인
                */
                await document.fonts.ready;



                console.log(
                    "font ready"
                );



                setFonts(
                    list
                );



                setFontReady(
                    true
                );


            }
            catch(e){


                console.error(
                    "font error",
                    e
                );


            }


        };



        init();


    },[]);






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


                {
                    fontReady && (

                        <CanvasStage


                            stageRef={stageRef}


                            elements={elements}


                            selectedId={selectedId}


                            setSelectedId={setSelectedId}


                            updateElement={updateElement}


                            dataMap={dataMap}


                            scaleX={scaleX}


                            scaleY={scaleY}


                            fontReady={fontReady}


                        />

                    )
                }



            </div>


        </div>

    );

}