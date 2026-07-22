import { Text } from "react-konva";

export default function CanvasText({
                                       el,
                                       selectedId,
                                       setSelectedId,
                                       updateElement,
                                       nodeRefs
                                   }) {
    return (
        <Text
            ref={(node) => {
                if (node) {
                    nodeRefs.current[el.id] = node;
                }
            }}
            text={`${el.text} ({{${el.fieldName}}})`}
            x={el.x}
            y={el.y}
            width={el.width}
            height={el.height}
            fontFamily={el.fontFamily || "NanumGothic"}
            fontSize={el.fontSize}
            fill={el.fill}
            draggable

            stroke={selectedId === el.id ? "blue" : null}
            strokeWidth={selectedId === el.id ? 2 : 0}

            onClick={(e) => {
                // Stage까지 이벤트 전달 막기
                e.cancelBubble = true;
                setSelectedId(el.id);
            }}

            onDragEnd={(e) =>
                updateElement(el.id, {
                    x: e.target.x(),
                    y: e.target.y()
                })
            }

            onTransformEnd={(e) => {
                const node = e.target;

                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                const newWidth = node.width() * scaleX;
                const newHeight = node.height() * scaleY;
                const newFontSize = el.fontSize * scaleY;

                node.scaleX(1);
                node.scaleY(1);

                updateElement(el.id, {
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