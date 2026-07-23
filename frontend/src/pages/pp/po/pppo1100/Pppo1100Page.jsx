import React, { useEffect, useState } from "react";

import DataForm from "./DataForm";
import CanvasPreview from "./CanvasPreview";

import {
    getTemplate,
    uploadImage,
    saveProduct
} from "../../../../services/pppo1100Api";

import {
    getFontList
} from "../../../../services/sytm3000Api";

import {
    loadCustomFonts
} from "../../../../util/fontLoader";

import { readExcel } from "../../../../util/excel";


export default function Pppo1100Page({ templateid, onBack }) {


    const ordno =
        "TP" +
        Math.floor(Math.random() * 1_000_000_000000)
            .toString()
            .padStart(12, "0");


    const token =
        JSON.parse(localStorage.getItem("user"))?.token;


    const [templateData, setTemplateData] = useState(null);

    const [productData, setProductData] = useState({});

    const [focusField, setFocusField] = useState(null);



    useEffect(() => {

        if (!templateid) return;


        const load = async () => {

            try {

                const data =
                    await getTemplate(templateid);


                /*
                    템플릿에서 사용한 폰트 찾기
                */

                const usedFontNames =
                    [
                        ...new Set(
                            data.canvasData
                                .filter(
                                    el => el.type === "text"
                                )
                                .map(
                                    el => el.fontFamily
                                )
                                .filter(Boolean)
                        )
                    ];


                /*
                    DB 폰트 목록 조회
                */

                const fontList =
                    await getFontList();


                /*
                    사용하는 폰트만 선택
                */

                const usedFonts =
                    fontList.filter(font =>
                        usedFontNames.includes(
                            font.fontfamily
                        )
                    );


                /*
                    브라우저 폰트 등록
                */

                await loadCustomFonts(
                    usedFonts
                );


                setTemplateData(data);


            } catch (e) {

                console.error(e);

            }

        };


        load();


    }, [templateid]);



    if (!templateData) {
        return <div>로딩중...</div>;
    }



    const handleChange = (key, value) => {

        setProductData(prev => ({
            ...prev,
            [key]: value
        }));

    };



    const handleImageUpload = async (
        fieldName,
        file
    ) => {

        try {

            const result =
                await uploadImage(
                    file,
                    token
                );


            setProductData(prev => ({
                ...prev,
                [fieldName]: result.url
            }));


        } catch (e) {

            alert(e.message);

        }

    };



    const handleExcelUpload = async (e) => {

        const file =
            e.target.files[0];


        if (!file) return;


        try {

            const data =
                await readExcel(
                    file,
                    templateData.canvasData
                );


            setProductData(prev => ({
                ...prev,
                ...data
            }));


            alert(
                "엑셀 데이터 적용 완료"
            );


        } catch (e) {

            alert(e.message);

        }

    };



    const handleSave = async () => {

        try {

            await saveProduct(
                {
                    ordno,
                    templateid,
                    data: productData
                },
                token
            );


            alert(
                "저장 완료"
            );


            onBack();


        } catch (e) {

            alert(e.message);

        }

    };



    return (

        <div
            style={{
                display:"flex",
                height:"100%"
            }}
        >

            <DataForm
                templateData={templateData}
                productData={productData}
                handleChange={handleChange}
                handleImageUpload={handleImageUpload}
                handleExcelUpload={handleExcelUpload}
                saveData={handleSave}
                setFocusField={setFocusField}
                onBack={onBack}
            />


            <div
                style={{
                    padding:20
                }}
            >

                <CanvasPreview
                    templateData={templateData}
                    productData={productData}
                    focusField={focusField}
                    setFocusField={setFocusField}
                />

            </div>


        </div>

    );

}