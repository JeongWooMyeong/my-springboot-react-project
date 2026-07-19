// src/components/template/PreviewText.jsx
import { Text } from "react-konva";
import { getFitFontSize } from "../../../util/TextUtils";

export default function PreviewText({ field, value }) {
    return (
        <Text
            x={field.x}
            y={field.y}
            width={field.width}
            height={field.height}
            text={value}
            fontSize={getFitFontSize(value, field)}
            fill={field.fill || "black"}
            wrap="word"
            ellipsis={false}
        />
    );
}
