import {
    Rect,
    Text,
    Image as KonvaImage
} from "react-konva";

import useImage from "use-image";


export default function CanvasImage({

                                        el,

                                        dataMap,

                                        updateElement,

                                        selectedId,

                                        setSelectedId,

                                        scaleX,

                                        scaleY,

                                        nodeRefs

                                    }) {


    let src = "";


    // 필드 이미지
    if(el.imageType === "FIELD"){

        src =
            dataMap?.[el.fieldName] || "";

    }


    // 업로드 이미지
    if(
        el.imageType === "BACKGROUND" ||
        el.imageType === "FIXED"
    ){

        src =
            el.imageUrl || "";

    }



    const [
        img,
        status
    ] = useImage(
        src,
        "anonymous"
    );



    const isSelected =
        selectedId === el.id;




    const saveTransform=(node)=>{


        const width =
            node.width() *
            node.scaleX();


        const height =
            node.height() *
            node.scaleY();



        node.scaleX(1);
        node.scaleY(1);



        updateElement(
            el.id,
            {

                x:
                    node.x()/scaleX,

                y:
                    node.y()/scaleY,

                width,

                height

            }
        );

    };




    return (

        <>


            {
                img &&
                status === "loaded" &&

                <KonvaImage


                    ref={(node)=>{

                        if(node){

                            nodeRefs.current[el.id]
                                =
                                node;

                        }

                    }}


                    image={img}


                    x={el.x}

                    y={el.y}


                    width={el.width}

                    height={el.height}



                    draggable={
                        el.imageType !== "BACKGROUND"
                    }



                    onClick={()=>{

                        setSelectedId(
                            el.id
                        );

                    }}



                    onDragEnd={(e)=>{


                        updateElement(

                            el.id,

                            {

                                x:e.target.x(),

                                y:e.target.y()

                            }

                        );


                    }}



                    onTransformEnd={(e)=>{

                        saveTransform(
                            e.target
                        );

                    }}



                    stroke={
                        isSelected
                            ? "#1976d2"
                            : undefined
                    }


                    strokeWidth={2}


                />

            }





            {
                !img &&
                el.imageType==="FIELD" &&


                <>


                    <Rect


                        ref={(node)=>{

                            if(node){

                                nodeRefs.current[el.id]
                                    =
                                    node;

                            }

                        }}


                        x={el.x}

                        y={el.y}


                        width={el.width}

                        height={el.height}


                        fill="#fafafa"


                        stroke={
                            isSelected
                                ? "#1976d2"
                                : "#aaa"
                        }


                        dash={[
                            6,
                            4
                        ]}


                        draggable


                        onClick={()=>{

                            setSelectedId(
                                el.id
                            );

                        }}



                        onDragEnd={(e)=>{


                            updateElement(

                                el.id,

                                {

                                    x:e.target.x(),

                                    y:e.target.y()

                                }

                            );

                        }}



                        onTransformEnd={(e)=>{

                            saveTransform(
                                e.target
                            );

                        }}


                    />



                    <Text

                        x={el.x}

                        y={
                            el.y +
                            el.height / 2 -
                            7
                        }

                        width={el.width}


                        text={
                            el.fieldName ||
                            "IMAGE"
                        }


                        fontSize={12}

                        fill="#888"

                        align="center"

                    />

                </>

            }



        </>

    );

}