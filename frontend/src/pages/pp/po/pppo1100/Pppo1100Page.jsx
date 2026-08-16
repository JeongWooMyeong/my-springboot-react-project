import React, { useEffect, useState } from "react";

import DataForm from "./DataForm";
import CanvasPreview from "./CanvasPreview";
import "../../../../css/pages/pp/pppo1100/pppo1100-page.css";

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
import * as XLSX from "xlsx";

export default function Pppo1100Page({ templateid, onBack }) {

    const ordno =
        "TP" +
        Math.floor(Math.random() * 1_000_000_000000)
            .toString()
            .padStart(12, "0");

    const token =
        JSON.parse(localStorage.getItem("user"))?.token;

    const [templateData, setTemplateData] = useState(null);
    const [productList, setProductList] = useState([{}]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const productData =
        productList[currentIndex] || {};
    const [focusField, setFocusField] = useState(null);
    const [fontReady, setFontReady] = useState(false);

    useEffect(() => {

        if (!templateid) return;

        const load = async () => {

            try {

                setFontReady(false);

                const data =
                    await getTemplate(templateid);

                const canvasElements =
                    typeof data.canvasData === "string"
                        ? JSON.parse(data.canvasData)
                        : data.canvasData || [];

                data.canvasData = canvasElements;

                const usedFontNames = [
                    ...new Set(
                        canvasElements
                            .filter(el => el.type === "text")
                            .map(el => el.fontFamily)
                            .filter(Boolean)
                    )
                ];

                if (usedFontNames.length > 0) {

                    const fontList =
                        await getFontList();

                    const usedFonts =
                        fontList.filter(font =>
                            usedFontNames.includes(
                                font.fontfamily
                            )
                        );

                    if(usedFonts.length > 0){

                        try {

                            await loadCustomFonts(
                                usedFonts
                            );

                        } catch(e){

                            console.warn(
                                "일부 폰트 로딩 실패",
                                e
                            );

                        }

                    }


                    await document.fonts.ready;

                }

                setTemplateData(data);
                setFontReady(true);

            } catch (e) {

                console.error(
                    "template load error",
                    e
                );

                setFontReady(true);

            }

        };

        load();

    }, [templateid]);

    if (!templateData || !fontReady) {
        return <div>로딩중...</div>;
    }

    const handleChange = (key, value) => {

        setProductList(prev => {

            const list = [...prev];

            list[currentIndex] = {
                ...list[currentIndex],
                [key]: value
            };

            return list;

        });

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

            setProductList(prev => {

                const list = [...prev];

                list[currentIndex] = {
                    ...list[currentIndex],
                    [fieldName]: result.url
                };

                return list;

            });

        } catch (e) {

            alert(e.message);

        }

    };

    const handleExcelUpload = async (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        try {

            const list =
                await readExcel(
                    file,
                    templateData.canvasData
                );


            setProductList(list);

            setCurrentIndex(0);


            alert("엑셀 데이터 적용 완료");


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
                    data: productList
                },
                token
            );

            alert("저장 완료");

            onBack();

        } catch (e) {

            alert(e.message);

        }

    };

    const handleExcelTemplateDownload = () => {

        const headers = [
            ...new Set(
                templateData.canvasData
                    .map(item => item.fieldName)
                    .filter(Boolean)
            )
        ];

        const worksheet =
            XLSX.utils.aoa_to_sheet([
                headers
            ]);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Template"
        );

        XLSX.writeFile(
            workbook,
            "product_template.xlsx"
        );

    };

    const handleAddProduct = () => {

        setProductList(prev => {

            const list = [...prev, {}];

            setCurrentIndex(list.length - 1);

            return list;

        });

    };

    const handleDeleteProduct = () => {

        if(productList.length === 1){

            setProductList([{}]);
            setCurrentIndex(0);
            return;

        }

        const list =
            productList.filter(
                (_, i) => i !== currentIndex
            );

        setProductList(list);

        if(currentIndex >= list.length){

            setCurrentIndex(list.length - 1);

        }

    };

    return (
        <div className="pop-editor">

            {/* 왼쪽 상품 데이터 입력 */}
            <section className="pop-editor-form">
                <DataForm
                    templateData={templateData}
                    productData={productData}

                    productList={productList}
                    setProductList={setProductList}

                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}

                    handleAddProduct={handleAddProduct}
                    handleDeleteProduct={handleDeleteProduct}

                    handleChange={handleChange}
                    handleImageUpload={handleImageUpload}
                    handleExcelUpload={handleExcelUpload}
                    handleExcelTemplateDownload={handleExcelTemplateDownload}

                    saveData={handleSave}

                    setFocusField={setFocusField}
                    onBack={onBack}
                />
            </section>


            {/* 오른쪽 미리보기 */}
            <section className="pop-editor-preview">

                <CanvasPreview
                    key={fontReady ? "ready" : "loading"}
                    templateData={templateData}
                    productData={productData}
                    focusField={focusField}
                    setFocusField={setFocusField}
                />

            </section>

        </div>
    );

}