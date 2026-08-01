import { Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";


export default function CanvasImage({
                                        el,
                                        src,
                                        isFocus,
                                        onClick
                                    }) {


    const resolveImageUrl = (url)=>{

        if(!url){
            return "";
        }


        if(url.startsWith("/")){

            return (
                window.location.origin +
                url
            );

        }


        return url;

    };



    let imageSrc = "";



    // 배경 / 고정 이미지
    if(
        el.imageType === "BACKGROUND" ||
        el.imageType === "FIXED"
    ){

        imageSrc =
            el.imageUrl;

    }



    // 필드 이미지
    if(
        el.imageType === "FIELD"
    ){

        imageSrc =
            src;

    }



    imageSrc =
        resolveImageUrl(
            imageSrc
        );



    const [img, status] =
        useImage(
            imageSrc,
            "anonymous"
        );



    const hasImage =
        !!imageSrc &&
        status === "loaded";



    return (

        <>


            <Rect

                x={el.x}

                y={el.y}

                width={el.width}

                height={el.height}


                fill={
                    hasImage
                        ?
                        "transparent"
                        :
                        "#f5f5f5"
                }


                stroke={
                    isFocus
                        ?
                        "#1976d2"
                        :
                        "#aaa"
                }


                dash={[6,4]}


                onClick={onClick}

            />



            {
                hasImage &&


                <KonvaImage

                    image={img}

                    x={el.x}

                    y={el.y}

                    width={el.width}

                    height={el.height}

                    onClick={onClick}

                />

            }


        </>

    );

}