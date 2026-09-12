import React from "react";

import {
    Stage,
    Layer,
    Text,
    Rect,
    Group
} from "react-konva";

import CanvasImage from "./CanvasImage";

import {
    getFitFontSize
} from "../../../../util/TextUtils";

export default function CanvasPreview({
                                          templateData,
                                          productData,
                                          focusField,
                                          setFocusField
                                      }) {

    const STAGE_WIDTH = 800;
    const STAGE_HEIGHT = 600;

    return (

        <Stage
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            style={{
                border: "1px solid #ddd",
                background: "#fff"
            }}
        >

            <Layer>

                <Group>

                    {
                        templateData.canvasData.map(el => {

                            const isFocus =
                                focusField === el.fieldName;

                            // TEXT
                            if (el.type === "text") {

                                const value =
                                    productData[
                                        el.fieldName
                                        ];

                                const textValue =
                                    value ??
                                    el.text ??
                                    "";

                                console.log({
                                    text: textValue,
                                    family: el.fontFamily,
                                    loaded: document.fonts.check(
                                        `20px "${el.fontFamily}"`
                                    )
                                });

                                return (

                                    <React.Fragment
                                        key={el.id}
                                    >

                                        <Text

                                            x={el.x}

                                            y={el.y}

                                            width={el.width}

                                            height={el.height}

                                            text={
                                                textValue
                                            }

                                            fontFamily={
                                                el.fontFamily ||
                                                "Arial"
                                            }

                                            fontSize={
                                                el.fontSize
                                                    ? el.fontSize
                                                    : getFitFontSize(textValue, el)
                                            }

                                            fill={
                                                el.fill ||
                                                "black"
                                            }

                                            wrap="word"

                                            verticalAlign="top"

                                        />

                                        {
                                            isFocus &&

                                            <Rect

                                                x={el.x - 4}

                                                y={el.y - 4}

                                                width={
                                                    el.width + 8
                                                }

                                                height={
                                                    el.height + 8
                                                }

                                                stroke="#1976d2"

                                                dash={[
                                                    6,
                                                    4
                                                ]}

                                            />

                                        }

                                    </React.Fragment>

                                );

                            }

                            // IMAGE
                            if (el.type === "image") {

                                let imageValue = "";

                                // 배경
                                if (
                                    el.imageType === "BACKGROUND"
                                ) {

                                    imageValue =
                                        el.imageUrl;

                                }

                                // 고정 이미지
                                else if (
                                    el.imageType === "FIXED"
                                ) {

                                    imageValue =
                                        el.imageUrl;

                                }

                                // 필드 이미지
                                else if (
                                    el.imageType === "FIELD"
                                ) {

                                    imageValue =
                                        productData[
                                            el.fieldName
                                            ];

                                }

                                if (
                                    imageValue &&
                                    imageValue.startsWith("/")
                                ) {

                                    //imageValue =
                                        //import.meta.env.VITE_API_BASE_URL +
                                        //imageValue;

                                }

                                return (

                                    <CanvasImage

                                        key={el.id}

                                        el={el}

                                        src={
                                            imageValue
                                        }

                                        isFocus={
                                            isFocus
                                        }

                                        onClick={() => {

                                            if (
                                                el.fieldName
                                            ) {

                                                setFocusField(
                                                    el.fieldName
                                                );

                                            }

                                        }}

                                    />

                                );

                            }

                            return null;

                        })
                    }

                </Group>

            </Layer>

        </Stage>

    );

}