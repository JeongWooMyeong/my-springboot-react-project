// src/components/template/TemplatePreview.jsx

import {
    Stage,
    Layer,
    Group
} from "react-konva";

import {
    useEffect,
    useState
} from "react";

import PreviewText from "./PreviewText";
import PreviewImage from "./PreviewImage";

import {
    getFontList
} from "../../../services/sytm3000Api";

import {
    loadCustomFonts
} from "../../../util/fontLoader";



export default function TemplatePreview({
                                            request
                                        }) {


    let data = {};

    let fields = [];



    try {

        data =
            typeof request.data === "string"
                ? JSON.parse(request.data)
                : request.data || {};


    } catch(e) {

        console.error(
            "data parse error",
            e
        );

        data = {};

    }




    try {

        fields =
            typeof request.canvasData === "string"
                ? JSON.parse(request.canvasData)
                : request.canvasData || [];


    } catch(e) {

        console.error(
            "canvasData parse error",
            e
        );

        fields = [];

    }




    const [
        fontReady,
        setFontReady
    ] = useState(false);





    useEffect(()=>{


        const initFonts = async()=>{


            try {


                const fontNames =
                    [
                        ...new Set(

                            fields

                                .filter(
                                    el =>
                                        el.type === "text"
                                )

                                .map(
                                    el =>
                                        el.fontFamily
                                )

                                .filter(Boolean)

                        )
                    ];





                if(
                    fontNames.length === 0
                ){

                    setFontReady(true);

                    return;

                }





                const fontList =
                    await getFontList();





                const usedFonts =
                    fontList.filter(font =>

                        fontNames.includes(
                            font.fontfamily
                        )

                    );





                if(
                    usedFonts.length > 0
                ){

                    await loadCustomFonts(
                        usedFonts
                    );

                }




                setFontReady(true);



            } catch(e) {


                console.error(
                    "폰트 로딩 실패",
                    e
                );


                setFontReady(true);


            }


        };



        initFonts();



    },[request]);







    if(!fontReady){

        return (
            <div>
                폰트 로딩중...
            </div>
        );

    }






    const stageWidth = 800;

    const stageHeight = 600;






    const resolveImageUrl = (url)=>{


        if(!url){

            return "";

        }



        if(
            url.startsWith("/")
        ){

            return (
                window.location.origin
                +
                url
            );

        }


        return url;


    };








    return (

        <div

            style={{

                width:820,

                height:660,

                border:"1px solid #ccc",

                background:"#eee",

                padding:10

            }}

        >

            <div
                style={{
                    height:20,
                    lineHeight:"20px",
                    fontSize:14,
                    fontWeight:"bold",
                    marginBottom:5
                }}
            >
                템플릿명 : {request.title}
            </div>

            <Stage

                width={stageWidth}

                height={stageHeight}

                style={{

                    border:"2px dashed gray",

                    background:"#fff"

                }}

            >


                <Layer>


                    <Group>


                        {
                            fields.map(field=>{



                                // TEXT
                                if(
                                    field.type === "text"
                                ){


                                    const value =
                                        data[
                                            field.fieldName
                                            ]
                                        ??
                                        field.text
                                        ??
                                        "";



                                    return (

                                        <PreviewText

                                            key={field.id}

                                            field={field}

                                            value={value}

                                        />

                                    );

                                }







                                // IMAGE
                                if(
                                    field.type === "image"
                                ){



                                    let imgSrc = "";




                                    // 배경 / 고정 이미지
                                    if(
                                        field.imageType === "BACKGROUND"
                                        ||
                                        field.imageType === "FIXED"
                                    ){

                                        imgSrc =
                                            field.imageUrl;

                                    }






                                    // 필드 이미지
                                    if(
                                        field.imageType === "FIELD"
                                    ){

                                        imgSrc =
                                            data[
                                                field.fieldName
                                                ];

                                    }






                                    imgSrc =
                                        resolveImageUrl(
                                            imgSrc
                                        );





                                    return (

                                        <PreviewImage

                                            key={field.id}

                                            field={field}

                                            src={imgSrc}

                                        />

                                    );


                                }




                                return null;


                            })
                        }



                    </Group>


                </Layer>


            </Stage>



        </div>

    );


}