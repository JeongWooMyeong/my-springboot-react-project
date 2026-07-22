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

                                        scaleX,
                                        scaleY

                                    }) {


    const transformerRef = useRef(null);

    const nodeRefs = useRef({});


    // Transformer 연결
    useEffect(() => {

        const transformer =
            transformerRef.current;


        if(!transformer)
            return;


        const node =
            nodeRefs.current[selectedId];


        if(node){

            transformer.nodes([
                node
            ]);

            transformer
                .getLayer()
                .batchDraw();

        }else{

            transformer.nodes([]);

        }


    },[
        selectedId,
        elements
    ]);



    return (

        <Stage

            ref={stageRef}

            width={800}

            height={600}

            onMouseDown={(e) => {
                // 빈 캔버스 클릭 시 선택 해제
                if (e.target === e.target.getStage()) {
                    setSelectedId(null);
                }
            }}

            style={{
                border:"1px solid #ccc"
            }}

        >

            <Layer>


                <Group

                    scaleX={scaleX}

                    scaleY={scaleY}

                >


                    {
                        elements.map(el=>{


                            if(el.type==="text"){

                                return (

                                    <CanvasText

                                        key={el.id}

                                        el={el}

                                        selectedId={selectedId}

                                        setSelectedId={setSelectedId}

                                        updateElement={updateElement}

                                        nodeRefs={nodeRefs}

                                    />

                                );

                            }



                            if(el.type==="image"){

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


                        })
                    }


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

    );

}