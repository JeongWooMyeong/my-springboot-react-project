import { useEffect, useState } from "react";

import FontUpload from "./FontUpload.jsx";
import FontList from "./FontList.jsx";
import FontPreview from "./FontPreview.jsx";

import {
    getFontList,
    deleteFont
} from "../../../../services/sytm3000Api";

import "../../../../css/pages/sy/sytm3000/sytm3000-page.css";


export default function Sytm3000Page() {

    const [fonts, setFonts] = useState([]);

    const [selectedFont, setSelectedFont] = useState(null);


    useEffect(() => {

        loadFonts();

    }, []);


    const loadFonts = async () => {

        const data = await getFontList();

        setFonts(data);

    };


    const handleDelete = async (fontId) => {

        if (!confirm("삭제하시겠습니까?")) {
            return;
        }


        await deleteFont(fontId);


        if (selectedFont?.fontId === fontId) {
            setSelectedFont(null);
        }


        await loadFonts();

    };


    return (

        <div className="sytm3000-page">

            <h2 className="sytm3000-title">
                폰트 관리
            </h2>


            {/* 폰트 업로드 */}

            <section className="sytm3000-section">

                <FontUpload
                    reload={loadFonts}
                />

            </section>


            <div className="sytm3000-divider" />


            {/* 폰트 목록 */}

            <section className="sytm3000-section">

                <FontList
                    fonts={fonts}
                    onSelect={setSelectedFont}
                    onDelete={handleDelete}
                />

            </section>


            <div className="sytm3000-divider" />


            {/* 폰트 미리보기 */}

            {
                selectedFont && (

                    <section className="sytm3000-preview">

                        <FontPreview
                            font={selectedFont}
                        />

                    </section>

                )
            }

        </div>

    );
}