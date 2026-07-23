import {
    useEffect,
    useState
} from "react";


export default function useTemplateEditor(
    template,
    isOpen
) {


    const [elements, setElements] =
        useState([]);


    const [selectedId, setSelectedId] =
        useState(null);


    const [title, setTitle] =
        useState("");



    const selectedElement =
        elements.find(
            el => el.id === selectedId
        );




    /**
     * 모달 열림 초기화
     */
    useEffect(()=>{


        if(!isOpen){
            return;
        }


        setSelectedId(null);


        if(!template){

            setTitle("");

            setElements([]);

        }


    },[
        isOpen
    ]);





    /**
     * 기존 템플릿 로딩
     */
    useEffect(()=>{


        if(!template){
            return;
        }



        try{


            const parsed =

                typeof template.canvasData === "string"

                    ? JSON.parse(template.canvasData)

                    : template.canvasData;



            const loaded =

                (parsed || []).map(el=>{


                    if(el.type === "text"){


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



            console.log(
                "template loaded",
                loaded
            );



            setElements(
                loaded
            );


            setTitle(
                template.title || ""
            );



        }
        catch(e){


            console.error(
                "canvasData parse error",
                e
            );


            setElements([]);


        }



    },[
        template
    ]);







    /**
     * TEXT 추가
     */
    const addText = ()=>{


        const id =
            Date.now();



        const newEl = {


            id,


            type:"text",


            text:"텍스트",


            fieldName:
                `field_${id}`,


            x:100,

            y:100,


            width:150,

            height:40,


            fontFamily:
                "NanumGothic",


            fontSize:20,


            fill:"black"


        };



        setElements(prev=>[

            ...prev,

            newEl

        ]);



        setSelectedId(id);


    };






    /**
     * IMAGE 추가
     */
    const addImage = ()=>{


        const id =
            Date.now();



        const newEl = {


            id,


            type:"image",


            fieldName:
                `image_${id}`,


            x:100,

            y:100,


            width:150,

            height:120


        };



        setElements(prev=>[

            ...prev,

            newEl

        ]);



        setSelectedId(id);


    };







    const updateElement = (
        id,
        attrs
    )=>{


        setElements(prev=>


            prev.map(el=>


                el.id === id

                    ? {

                        ...el,

                        ...attrs

                    }

                    :

                    el


            )


        );


    };







    const updateText = (
        value
    )=>{


        setElements(prev=>


            prev.map(el=>


                el.id === selectedId

                    ? {

                        ...el,

                        text:value

                    }

                    :

                    el


            )


        );


    };







    const updateFieldName = (
        value
    )=>{


        setElements(prev=>


            prev.map(el=>


                el.id === selectedId

                    ? {

                        ...el,

                        fieldName:value

                    }

                    :

                    el


            )


        );


    };







    const deleteElement = ()=>{


        if(!selectedId)
            return;



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

        addImage,



        updateElement,



        updateText,

        updateFieldName,



        deleteElement


    };


}