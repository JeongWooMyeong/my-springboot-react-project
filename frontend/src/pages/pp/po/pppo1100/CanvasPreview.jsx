import React from "react";
import {
    Stage,
    Layer,
    Text,
    Rect
} from "react-konva";

import CanvasImage from "./CanvasImage";
import { getFitFontSize } from "../../../../util/TextUtils";

export default function CanvasPreview({
                                          templateData,
                                          productData,
                                          focusField,
                                          setFocusField
                                      }) {

    const STAGE_WIDTH = 800;
    const STAGE_HEIGHT = 600;

    const mmToPx = 3.78;

    const paperWidth = Number(templateData.paperwidth || 210);
    const paperHeight = Number(templateData.paperheight || 297);

    const paperPxWidth = paperWidth * mmToPx;
    const paperPxHeight = paperHeight * mmToPx;

    const scaleX = STAGE_WIDTH / paperPxWidth;
    const scaleY = STAGE_HEIGHT / paperPxHeight;

    return (
        <Stage
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            style={{
                border: "1px solid #ddd",
                background: "#fff"
            }}
        >
            <Layer
                scaleX={scaleX}
                scaleY={scaleY}
            >
                {templateData.canvasData.map((el) => {

                    const value = productData[el.fieldName];
                    const isFocus = focusField === el.fieldName;

                    if (el.type === "text") {
                        return (
                            <React.Fragment key={el.id}>

                                <Text
                                    x={el.x}
                                    y={el.y}
                                    width={el.width}
                                    height={el.height}
                                    text={value || el.text || ""}
                                    fontSize={
                                        getFitFontSize(
                                            value || el.text || "",
                                            el.width,
                                            el.height,
                                            el.fontSize || 20
                                        )
                                    }
                                    fill={el.fill || "black"}
                                    wrap="word"
                                    verticalAlign="top"
                                />

                                {isFocus && (
                                    <Rect
                                        x={el.x - 4}
                                        y={el.y - 4}
                                        width={el.width + 8}
                                        height={el.height + 8}
                                        stroke="#1976d2"
                                        dash={[6, 4]}
                                    />
                                )}

                            </React.Fragment>
                        );
                    }

                    if (el.type === "image") {
                        return (
                            <CanvasImage
                                key={el.id}
                                el={el}
                                src={value}
                                isFocus={isFocus}
                                onClick={() => {
                                    setFocusField(el.fieldName);
                                }}
                            />
                        );
                    }

                    return null;

                })}
            </Layer>
        </Stage>
    );
}