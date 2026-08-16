import { useState } from "react";
import { useCategories } from "./useCategories";
import CategorySelector from "./CategorySelector";
import Pppo1000List from "./Pppo1000List";
import Pppo1100Page from "../pppo1100/Pppo1100Page";

import "../../../../css/pages/pp/pppo1000/pppo1000-page.css";


export default function Pppo1000Page() {

    const [selectedId, setSelectedId] = useState(null);

    const [selectedLevel1, setSelectedLevel1] = useState(null);
    const [selectedLevel2, setSelectedLevel2] = useState(null);
    const [selectedLevel3, setSelectedLevel3] = useState(null);


    const token =
        JSON.parse(
            localStorage.getItem("user")
        )?.token;


    // 분류 1
    const level1List =
        useCategories(token, 0);


    // 분류 2
    const level2List =
        useCategories(
            token,
            selectedLevel1
        );


    // 분류 3
    const level3List =
        useCategories(
            token,
            selectedLevel2
        );


    // 현재 선택된 가장 하위 분류
    const selectedClcd =
        selectedLevel3 ||
        selectedLevel2 ||
        selectedLevel1;


    // 분류 1 선택
    const handleLevel1Click = (clcd) => {

        setSelectedLevel1(clcd);

        // 하위 분류 초기화
        setSelectedLevel2(null);
        setSelectedLevel3(null);

    };


    // 분류 2 선택
    const handleLevel2Click = (clcd) => {

        setSelectedLevel2(clcd);

        // 분류 3 초기화
        setSelectedLevel3(null);

    };


    // 분류 3 선택
    const handleLevel3Click = (clcd) => {

        setSelectedLevel3(clcd);

    };


    return (

        <div className="pppo1000-page">


            {/* =========================
                분류 선택
            ========================= */}

            <section className="pppo1000-category">

                <CategorySelector

                    level1List={level1List}

                    level2List={level2List}

                    level3List={level3List}

                    selectedLevel1={selectedLevel1}

                    selectedLevel2={selectedLevel2}

                    selectedLevel3={selectedLevel3}

                    onLevel1Click={
                        handleLevel1Click
                    }

                    onLevel2Click={
                        handleLevel2Click
                    }

                    onLevel3Click={
                        handleLevel3Click
                    }

                />

            </section>


            {/* =========================
                템플릿 목록 / 상세
            ========================= */}

            <section className="pppo1000-content">

                {
                    selectedId === null ? (

                        <Pppo1000List

                            onSelect={
                                setSelectedId
                            }

                            clcd={
                                selectedClcd
                            }

                        />

                    ) : (

                        <Pppo1100Page

                            templateid={
                                selectedId
                            }

                            onBack={() =>
                                setSelectedId(null)
                            }

                        />

                    )
                }

            </section>


        </div>

    );
}