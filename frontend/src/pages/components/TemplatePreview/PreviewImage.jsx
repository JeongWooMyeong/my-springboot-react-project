// src/components/template/PreviewImage.jsx

import {
    Rect,
    Text,
    Image as KonvaImage
} from "react-konva";

import useImage from "use-image";


export default function PreviewImage({
                                         field,
                                         src
                                     }) {


    const [img] =
        useImage(
            src || "",
            "anonymous"
        );



    const isField =
        field.imageType === "FIELD";



    return (

        <>


            {/* 실제 이미지 */}
            {
                img &&

                <KonvaImage

                    image={img}

                    x={field.x}

                    y={field.y}

                    width={field.width}

                    height={field.height}

                />

            }





            {/* 필드 이미지 빈 영역 */}
            {
                !img &&
                isField &&

                <>

                    <Rect

                        x={field.x}

                        y={field.y}

                        width={field.width}

                        height={field.height}


                        fill="#fafafa"


                        stroke="#aaa"


                        dash={[
                            6,
                            4
                        ]}

                    />



                    <Text

                        x={field.x}

                        y={
                            field.y +
                            field.height / 2 -
                            7
                        }


                        width={field.width}


                        text={
                            field.fieldName ||
                            "IMAGE"
                        }


                        fontSize={12}


                        fill="#888"


                        align="center"

                    />

                </>

            }



        </>

    );

}