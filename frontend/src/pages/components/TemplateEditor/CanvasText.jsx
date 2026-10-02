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

    const isSelected =
        selectedId === el.id;


    /*
     * 폰트가 준비되었을 때만
     * Canvas를 다시 그린다.
     *
     * 폰트 자체를 여기서 다시 로드하거나
     * node.fontFamily()를 직접 변경하지 않는다.
     */
    useEffect(() => {

        if (!fontReady) {
            return;
        }

        const node =
            textRef.current;

        if (!node) {
            return;
        }

        const fontName =
            el.fontFamily || "NanumGothic";

        const fontSize =
            el.fontSize || 20;


        console.log(
            "CANVAS TEXT FONT:",
            fontName,
            document.fonts.check(
                `20px "${fontName}"`
            )
        );


        /*
         * React가 fontFamily를 변경한 후
         * Konva Layer만 다시 그린다.
         */
        node.getLayer()?.batchDraw();

    }, [
        fontReady,
        el.fontFamily,
        el.fontSize,
        el.text,
        el.fieldName
    ]);


    return (

        <Text

            ref={(node) => {

                textRef.current = node;

                if (node) {

                    nodeRefs.current[
                        el.id
                        ] = node;

                }

            }}


            text={
                `${el.text} ({{${el.fieldName}}})`
            }


            x={el.x}
            y={el.y}


            width={el.width}
            height={el.height}


            /*
             * Preview와 동일하게 사용
             */
            fontFamily={
                el.fontFamily ||
                "Arial"
            }


            fontSize={
                el.fontSize ||
                20
            }


            fill={
                el.fill ||
                "black"
            }


            wrap="word"

            verticalAlign="top"


            draggable


            onClick={(e) => {

                e.cancelBubble = true;

                setSelectedId(
                    el.id
                );

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


            onDragEnd={(e) => {

                updateElement(
                    el.id,
                    {
                        x: e.target.x(),
                        y: e.target.y()
                    }
                );

            }}


            onTransformEnd={(e) => {

                const node =
                    e.target;

                const scaleX =
                    node.scaleX();

                const scaleY =
                    node.scaleY();


                node.scaleX(1);
                node.scaleY(1);


                updateElement(
                    el.id,
                    {

                        x: node.x(),

                        y: node.y(),

                        width:
                            node.width() *
                            scaleX,

                        height:
                            node.height() *
                            scaleY,

                        fontSize:
                            (
                                el.fontSize ||
                                20
                            ) * scaleY

                    }
                );

            }}

        />

    );

}
