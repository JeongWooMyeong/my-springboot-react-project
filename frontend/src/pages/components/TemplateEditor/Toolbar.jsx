import { useRef } from "react";

import PropertyPanel from "./PropertyPanel";

import {
    uploadImage
} from "../../../services/imageApi";


export default function Toolbar({

                                    title,
                                    setTitle,

                                    papersize,
                                    setPapersize,

                                    addText,

                                    addBackground,
                                    addFixedImage,
                                    addFieldImage,

                                    deleteElement,

                                    handleSave,

                                    template,

                                    selectedElement,
                                    updateText,
                                    updateFieldName,

                                    elements,
                                    fonts,
                                    updateElement

                                }) {


    const backgroundInputRef =
        useRef(null);


    const fixedInputRef =
        useRef(null);



    // 배경 이미지 업로드
    const handleBackgroundUpload = async(e)=>{

        const file = e.target.files[0];


        if(!file){
            return;
        }


        try {


            const imageUrl =
                await uploadImage(file);


            console.log(
                "background url",
                imageUrl
            );


            addBackground(
                imageUrl
            );



        } catch(error){


            console.error(
                "background upload error",
                error
            );


            alert(
                "배경 이미지 업로드 실패"
            );


        }


        e.target.value="";

    };



    // 고정 이미지 업로드
    // 고정 이미지 업로드
    const handleFixedUpload = async(e)=>{

        const file =
            e.target.files[0];


        if(!file){
            return;
        }


        try {


            const imageUrl =
                await uploadImage(file);



            console.log(
                "fixed image url",
                imageUrl
            );



            addFixedImage({

                imageUrl

            });



        } catch(error){


            console.error(
                "fixed upload error",
                error
            );


            alert(
                "고정 이미지 업로드 실패"
            );


        }


        e.target.value="";

    };



    return (

        <div
            style={{
                width:250,
                height:"100%",
                overflowY:"auto",
                flexShrink:0
            }}
        >


            <h3>템플릿</h3>


            <input

                value={title}

                onChange={(e)=>
                    setTitle(e.target.value)
                }

                placeholder="템플릿 이름"

                style={{
                    width:"100%",
                    padding:6
                }}

            />



            <h3>용지 크기</h3>


            <select

                value={papersize}

                onChange={(e)=>
                    setPapersize(
                        e.target.value
                    )
                }

            >

                <option value="A4">
                    A4
                </option>

                <option value="A3">
                    A3
                </option>

                <option value="Letter">
                    Letter
                </option>

                <option value="Legal">
                    Legal
                </option>

            </select>




            <h3>툴</h3>



            <button
                onClick={addText}
            >
                + 텍스트
            </button>




            {/* 숨김 파일 선택 */}
            <input

                ref={backgroundInputRef}

                type="file"

                accept="image/*"

                style={{
                    display:"none"
                }}

                onChange={
                    handleBackgroundUpload
                }

            />



            <button

                onClick={()=>
                    backgroundInputRef.current.click()
                }

            >
                + 배경 이미지
            </button>





            <input

                ref={fixedInputRef}

                type="file"

                accept="image/*"

                style={{
                    display:"none"
                }}

                onChange={
                    handleFixedUpload
                }

            />



            <button

                onClick={()=>
                    fixedInputRef.current.click()
                }

            >
                + 고정 이미지
            </button>





            <button

                onClick={addFieldImage}

            >
                + 필드 이미지
            </button>





            <br/>
            <br/>




            <button

                onClick={deleteElement}

                style={{
                    color:"red"
                }}

            >
                삭제
            </button>



            <button

                onClick={handleSave}

            >

                {
                    template?.id
                        ?
                        "수정"
                        :
                        "저장"
                }

            </button>




            <hr />



            <PropertyPanel

                selectedElement={
                    selectedElement
                }

                updateText={
                    updateText
                }

                updateFieldName={
                    updateFieldName
                }

                updateElement={
                    updateElement
                }

                fonts={
                    fonts
                }

            />



            <hr />



            <pre
                style={{
                    fontSize:11
                }}
            >

                {
                    JSON.stringify(
                        elements,
                        null,
                        2
                    )
                }

            </pre>


        </div>

    );

}