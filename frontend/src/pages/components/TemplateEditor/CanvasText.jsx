import { useEffect, useRef } from "react";
import { Text } from "react-konva";


export default function CanvasText({
                                       el,
                                       selectedId,
                                       setSelectedId,
                                       updateElement,
                                       nodeRefs,
                                       fontReady
                                   }) {

    const textRef = useRef(null);


    // 폰트 적용 후 Konva Text 갱신
    useEffect(() => {

        if (!fontReady) return;

        const node = textRef.current;

        if (!node) return;


        const fontName =
            el.fontFamily || "NanumGothic";


        const refresh = async () => {

            await document.fonts.load(
                `${el.fontSize || 20}px "${fontName}"`
            );


            node.fontFamily(fontName);

            node.fontSize(
                el.fontSize || 20
            );

            node.text(
                `${el.text} ({{${el.fieldName}}})`
            );


            // Transformer 적용 후 크기 유지
            node.width(el.width);
            node.height(el.height);


            node.clearCache();

            node.getLayer()
                ?.batchDraw();

        };


        refresh();

    }, [
        fontReady,
        el.fontFamily,
        el.fontSize,
        el.text,
        el.fieldName
    ]);



    const isSelected =
        selectedId === el.id;



    return (

        <Text

            ref={(node) => {

                textRef.current = node;

                if (node) {
                    nodeRefs.current[el.id] = node;
                }

            }}


            text={`${el.text} ({{${el.fieldName}}})`}


            x={el.x}
            y={el.y}

            width={el.width}
            height={el.height}


            fontFamily={
                el.fontFamily || "NanumGothic"
            }

            fontSize={
                el.fontSize || 20
            }


            fill={
                el.fill || "black"
            }


            draggable



            // 선택
            onClick={(e) => {

                e.cancelBubble = true;

                setSelectedId(el.id);

            }}


            stroke={
                isSelected
                    ? "blue"
                    : undefined
            }

            strokeWidth={
                isSelected
                    ? 2
                    : 0
            }



            // 이동
            onDragEnd={(e) => {

                updateElement(
                    el.id,
                    {
                        x: e.target.x(),
                        y: e.target.y()
                    }
                );

            }}



            // 크기 변경
            onTransformEnd={(e) => {

                const node = e.target;


                const scaleX = node.scaleX();
                const scaleY = node.scaleY();


                node.scaleX(1);
                node.scaleY(1);


                updateElement(
                    el.id,
                    {
                        x: node.x(),
                        y: node.y(),

                        width:
                            node.width() * scaleX,

                        height:
                            node.height() * scaleY,

                        fontSize:
                            (el.fontSize || 20)
                            *
                            scaleY
                    }
                );

            }}

        />

    );

}