// src/components/template/PreviewImage.jsx
import { Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function PreviewImage({ field, src }) {
    const [img] = useImage(src || "", "anonymous");

    return (
        <>
            <Rect
                x={field.x}
                y={field.y}
                width={field.width}
                height={field.height}
                stroke="#aaa"
                dash={[6,4]}
            />
            {img && (
                <KonvaImage
                    image={img}
                    x={field.x}
                    y={field.y}
                    width={field.width}
                    height={field.height}
                />
            )}
        </>
    );
}
