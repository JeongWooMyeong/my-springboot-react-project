import { Rect, Text, Image as KonvaImage } from "react-konva";
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

    const src = dataMap?.[el.fieldName];
    const [img] = useImage(src || "");

    const isEmpty = !src;
    const isSelected = selectedId === el.id;

    return (
        <>
            {!isEmpty && (
                <KonvaImage
                    ref={(node) => {
                        if (node) {
                            nodeRefs.current[el.id] = node;
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
                    onTransformEnd={(e) => {

                        const node = e.target;

                        const width =
                            node.width() * node.scaleX();

                        const height =
                            node.height() * node.scaleY();

                        node.scaleX(1);
                        node.scaleY(1);

                        updateElement(el.id, {
                            x: node.x() / scaleX,
                            y: node.y() / scaleY,
                            width,
                            height
                        });

                    }}
                />
            )}

            {isEmpty && (
                <>
                    <Rect
                        ref={(node) => {
                            if (node) {
                                nodeRefs.current[el.id] = node;
                            }
                        }}
                        x={el.x}
                        y={el.y}
                        width={el.width}
                        height={el.height}
                        fill="#fafafa"
                        stroke={isSelected ? "#1976d2" : "#bbb"}
                        strokeWidth={1}
                        dash={[6, 4]}
                        draggable
                        onClick={() => setSelectedId(el.id)}
                        onDragEnd={(e) =>
                            updateElement(el.id, {
                                x: e.target.x(),
                                y: e.target.y()
                            })
                        }
                        onTransformEnd={(e) => {

                            const node = e.target;

                            const width =
                                node.width() * node.scaleX();

                            const height =
                                node.height() * node.scaleY();

                            node.scaleX(1);
                            node.scaleY(1);

                            updateElement(el.id, {
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
                    />
                </>
            )}
        </>
    );
}