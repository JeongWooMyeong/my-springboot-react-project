import { useEffect, useRef } from "react";

import {
    Stage,
    Layer,
    Group,
    Transformer
} from "react-konva";

import CanvasText from "./CanvasText";
import CanvasImage from "./CanvasImage";


export default function CanvasStage({
                                        stageRef,
                                        elements,
                                        selectedId,
                                        setSelectedId,
                                        updateElement,
                                        dataMap,
                                        fontReady
                                    }) {


    const transformerRef = useRef(null);

    const nodeRefs = useRef({});



    // Transformer 연결
    useEffect(() => {


        const transformer =
            transformerRef.current;


        if(!transformer){
            return;
        }



        const selected =
            elements.find(
                el =>
                    el.id === selectedId
            );



        // 배경은 선택 불가
        if(
            !selected ||
            selected.imageType === "BACKGROUND"
        ){

            transformer.nodes([]);

            return;

        }



        const node =
            nodeRefs.current[selectedId];



        if(node){

            transformer.nodes([
                node
            ]);

            transformer.getLayer()
                ?.batchDraw();

        }else{

            transformer.nodes([]);

        }


    },[
        selectedId,
        elements
    ]);





    if(!fontReady){
        return null;
    }





    // 배경은 항상 뒤
    const backgroundElements =
        elements.filter(
            el =>
                el.imageType === "BACKGROUND"
        );



    const normalElements =
        elements.filter(
            el =>
                el.imageType !== "BACKGROUND"
        );





    return (

        <Stage

            ref={stageRef}

            width={800}

            height={600}


            onMouseDown={(e)=>{


                if(
                    e.target ===
                    e.target.getStage()
                ){

                    setSelectedId(null);

                }

            }}


            style={{
                border:"1px solid #ccc"
            }}

        >


            <Layer>


                <Group>



                    {
                        backgroundElements.map(el=>(

                            <CanvasImage

                                key={el.id}

                                el={el}

                                dataMap={dataMap}

                                updateElement={
                                    updateElement
                                }

                                selectedId={
                                    selectedId
                                }

                                setSelectedId={
                                    setSelectedId
                                }

                                scaleX={1}

                                scaleY={1}

                                nodeRefs={
                                    nodeRefs
                                }

                            />

                        ))
                    }




                    {
                        normalElements.map(el=>{


                            if(el.type==="text"){


                                return (

                                    <CanvasText

                                        key={
                                            `${el.id}_${fontReady}`
                                        }

                                        el={el}

                                        selectedId={
                                            selectedId
                                        }

                                        setSelectedId={
                                            setSelectedId
                                        }

                                        updateElement={
                                            updateElement
                                        }

                                        nodeRefs={
                                            nodeRefs
                                        }

                                        fontReady={
                                            fontReady
                                        }

                                    />

                                );

                            }





                            if(el.type==="image"){


                                return (

                                    <CanvasImage

                                        key={el.id}

                                        el={el}

                                        dataMap={
                                            dataMap
                                        }

                                        updateElement={
                                            updateElement
                                        }

                                        selectedId={
                                            selectedId
                                        }

                                        setSelectedId={
                                            setSelectedId
                                        }

                                        scaleX={1}

                                        scaleY={1}

                                        nodeRefs={
                                            nodeRefs
                                        }

                                    />

                                );

                            }



                            return null;


                        })
                    }



                </Group>





                <Transformer

                    ref={
                        transformerRef
                    }

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

    );

}