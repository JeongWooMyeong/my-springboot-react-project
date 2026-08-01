import { useEffect, useState } from "react";


export default function useTemplateEditor(
    template,
    isOpen,
    paperWidth = 800,
    paperHeight = 600
) {


    const [elements,setElements] =
        useState([]);


    const [selectedId,setSelectedId] =
        useState(null);


    const [title,setTitle] =
        useState("");



    const selectedElement =
        elements.find(
            el => el.id === selectedId
        );





    useEffect(()=>{


        if(!isOpen){
            return;
        }


        setSelectedId(null);


        if(!template){

            setTitle("");

            setElements([]);

        }


    },[isOpen]);







    useEffect(()=>{


        if(!template){
            return;
        }


        try{


            const parsed =
                typeof template.canvasData === "string"
                    ?
                    JSON.parse(template.canvasData)
                    :
                    template.canvasData;



            const loaded =
                (parsed || []).map(el=>{


                    if(el.type==="IMAGE"){

                        return {

                            ...el,

                            type:"image"

                        };

                    }



                    if(el.type==="text"){

                        return {

                            ...el,

                            fontFamily:
                                el.fontFamily ||
                                "NanumGothic",

                            fontSize:
                                el.fontSize ||
                                20

                        };

                    }


                    return el;


                });



            setElements(loaded);


            setTitle(
                template.title || ""
            );


        }catch(e){


            console.error(
                "canvas parse error",
                e
            );


            setElements([]);


        }



    },[template]);









    // TEXT
    const addText=()=>{


        const id =
            crypto.randomUUID();



        const element={


            id,


            type:"text",


            text:"텍스트",


            x:100,

            y:100,


            width:150,

            height:40,


            fontFamily:"NanumGothic",


            fontSize:20,


            fill:"black"


        };



        setElements(prev=>[

            ...prev,

            element

        ]);



        setSelectedId(id);


    };









    // 배경 이미지
    const addBackground=(imageUrl)=>{


        const id =
            crypto.randomUUID();



        const element={


            id,


            type:"image",


            imageType:"BACKGROUND",


            imageUrl,



            x:0,

            y:0,


            width:800,

            height:600,



            fit:"cover",


            locked:true


        };



        setElements(prev=>{


            const filtered =
                prev.filter(
                    el =>
                        el.imageType !== "BACKGROUND"
                );


            return [
                element,
                ...filtered
            ];

        });



        setSelectedId(id);


    };









    // 고정 이미지
    const addFixedImage=({
                             imageUrl
                         })=>{


        const id =
            crypto.randomUUID();


        const element={

            id,

            type:"image",

            imageType:"FIXED",

            imageUrl,


            x:100,
            y:100,


            width:150,
            height:150,


            locked:false

        };


        setElements(prev=>[
            ...prev,
            element
        ]);


        setSelectedId(id);

    };









    // 필드 이미지 영역
    const addFieldImage=()=>{


        const id =
            crypto.randomUUID();



        const element={


            id,


            type:"image",


            imageType:"FIELD",



            fieldName:"",



            x:100,

            y:100,


            width:200,

            height:200


        };



        setElements(prev=>[

            ...prev,

            element

        ]);



        setSelectedId(id);


    };









    const updateElement=(id,attrs)=>{


        setElements(prev=>

            prev.map(el=>

                el.id===id

                    ?

                    {
                        ...el,
                        ...attrs
                    }

                    :

                    el

            )

        );


    };









    const updateText=(value)=>{


        updateElement(

            selectedId,

            {
                text:value
            }

        );


    };







    const updateFieldName=(value)=>{


        updateElement(

            selectedId,

            {
                fieldName:value
            }

        );


    };









    const deleteElement=()=>{


        if(!selectedId){
            return;
        }



        setElements(prev=>

            prev.filter(
                el =>
                    el.id !== selectedId
            )

        );



        setSelectedId(null);


    };







    return {


        elements,

        setElements,


        selectedId,

        setSelectedId,


        selectedElement,


        title,

        setTitle,


        addText,


        addBackground,


        addFixedImage,


        addFieldImage,


        updateElement,


        updateText,


        updateFieldName,


        deleteElement


    };


}