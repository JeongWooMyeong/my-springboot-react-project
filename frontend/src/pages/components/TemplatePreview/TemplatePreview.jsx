// src/components/template/TemplatePreview.jsx
import {
    Stage,
    Layer,
    Group
} from "react-konva";
import { mmToPx } from "../../../util/Utils";
import PreviewText from "./PreviewText";
import PreviewImage from "./PreviewImage";

export default function TemplatePreview({ request }) {
    const data = JSON.parse(request.data || "{}");
    const fields = JSON.parse(request.canvasData || "[]");

    const stageWidth = 800;
    const stageHeight = 600;

    const paperWidthPx = mmToPx(Number(request.paperwidth || 210));
    const paperHeightPx = mmToPx(Number(request.paperheight || 297));

    const scaleX = stageWidth / paperWidthPx;
    const scaleY = stageHeight / paperHeightPx;

    return (
        <div style={{ width:820, height:650, border:"1px solid #ccc", background:"#eee", padding:10 }}>
            <h4>템플릿명 : {request.title}</h4>
            <Stage width={stageWidth} height={stageHeight} style={{ border:"2px dashed gray", background:"#fff" }}>
                <Layer>
                    <Group scaleX={scaleX} scaleY={scaleY}>
                        {fields.map(field => {
                            if (field.type === "text") {
                                const value = data[field.fieldName] ?? field.text ?? "";
                                return <PreviewText key={field.id} field={field} value={value} />;
                            }
                            if (field.type === "image") {
                                let imgSrc = data[field.fieldName];
                                if (imgSrc) {
                                    try {
                                        const parsed = JSON.parse(imgSrc);
                                        if (parsed.url) imgSrc = parsed.url;
                                    } catch(e) {}
                                }
                                if (imgSrc && imgSrc.startsWith("/")) {
                                    imgSrc = window.location.origin + imgSrc;
                                }
                                return <PreviewImage key={field.id} field={field} src={imgSrc} />;
                            }
                            return null;
                        })}
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
}
