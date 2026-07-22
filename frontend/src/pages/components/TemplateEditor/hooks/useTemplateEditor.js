import { useEffect, useState } from "react";

export default function useTemplateEditor(template, isOpen) {

    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [title, setTitle] = useState("");


    const selectedElement =
        elements.find(el => el.id === selectedId);



    // 모달 열릴 때 초기화
    useEffect(() => {

        if(isOpen){

            setTitle("");
            setElements([]);
            setSelectedId(null);

        }

    },[isOpen]);



    // 기존 템플릿 로딩
    useEffect(() => {

        if(!template) return;


        const parsed =
            typeof template.canvasData === "string"
                ? JSON.parse(template.canvasData)
                : template.canvasData;


        setElements(parsed || []);

        setTitle(template.title || "");


    },[template]);



    // TEXT 추가
    const addText = () => {

        const newEl = {

            id: Date.now(),

            type:"text",

            text:"텍스트",

            fieldName:`field_${Date.now()}`,

            x:100,
            y:100,

            width:150,
            height:40,
            fontFamily:"NanumGothic",
            fontSize:20,

            fill:"black"

        };


        setElements(prev => [
            ...prev,
            newEl
        ]);

    };



    // IMAGE 추가
    const addImage = () => {

        const newEl = {

            id:Date.now(),

            type:"image",

            fieldName:`image_${Date.now()}`,

            x:100,
            y:100,

            width:150,
            height:120

        };


        setElements(prev=>[
            ...prev,
            newEl
        ]);

    };



    // 요소 변경
    const updateElement = (id, attrs)=>{

        setElements(prev =>
            prev.map(el =>
                el.id === id
                    ? {
                        ...el,
                        ...attrs
                    }
                    : el
            )
        );

    };



    // 텍스트 변경
    const updateText = (value)=>{

        setElements(prev =>
            prev.map(el =>
                el.id === selectedId
                    ? {
                        ...el,
                        text:value
                    }
                    : el
            )
        );

    };



    // fieldName 변경
    const updateFieldName = (value)=>{

        setElements(prev =>
            prev.map(el =>
                el.id === selectedId
                    ? {
                        ...el,
                        fieldName:value
                    }
                    : el
            )
        );

    };



    // 삭제
    const deleteElement = ()=>{

        if(!selectedId)
            return;


        setElements(prev =>
            prev.filter(
                el => el.id !== selectedId
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