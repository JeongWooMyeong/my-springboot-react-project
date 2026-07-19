import { Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function CanvasImage({
                                        el,
                                        src,
                                        isFocus,
                                        onClick
                                    }) {

    const [img, status] = useImage(src || "", "anonymous");

    const hasImage =
        !!src && status === "loaded";

    return (
        <>
            <Rect
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                fill={
                    hasImage
                        ? "transparent"
                        : "#f5f5f5"
                }
                stroke={
                    isFocus
                        ? "#1976d2"
                        : "#aaa"
                }
                dash={[6, 4]}
                onClick={onClick}
            />

            {hasImage && (
                <KonvaImage
                    image={img}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                />
            )}
        </>
    );
}