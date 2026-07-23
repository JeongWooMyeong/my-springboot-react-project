// src/components/template/PreviewText.jsx
import { Text } from "react-konva";
import { getFitFontSize } from "../../../util/TextUtils";

//console.log("PreviewText 파일 로딩");


export default function PreviewText({ field, value }) {

    console.log(
        "PreviewText font:",
        field.fontFamily
    );

    return (
        <Text
            x={field.x}
            y={field.y}
            width={field.width}
            height={field.height}
            text={value}
            fontFamily={
                field.fontFamily || "Arial"
            }
            fontSize={getFitFontSize(value, field)}
            fill={field.fill || "black"}
            wrap="word"
            ellipsis={false}
        />
    );
}
