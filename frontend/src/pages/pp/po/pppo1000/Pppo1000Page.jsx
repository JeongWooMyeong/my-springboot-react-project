import { useState } from "react";
import { useCategories } from "./useCategories";
import CategorySelector from "./CategorySelector";
import Pppo1000List from "./Pppo1000List";
import Pppo1100Page from "../Pppo1100/Pppo1100Page";
//헤이요

export default function Pppo1000Page() {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedLevel1, setSelectedLevel1] = useState(null);
    const [selectedLevel2, setSelectedLevel2] = useState(null);
    const [selectedLevel3, setSelectedLevel3] = useState(null);

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    // 항상 훅 호출, 내부에서 parentId 없으면 빈 배열 반환
    const level1List = useCategories(token, 0);
    const level2List = useCategories(token, selectedLevel1);
    const level3List = useCategories(token, selectedLevel2);

    const selectedClcd = selectedLevel3 || selectedLevel2 || selectedLevel1;

    const handleLevel1Click = (clcd) => {
        setSelectedLevel1(clcd);
        setSelectedLevel2(null);   // 분류2 초기화
        setSelectedLevel3(null);   // 분류3 초기화
    };

    const handleLevel2Click = (clcd) => {
        setSelectedLevel2(clcd);
        setSelectedLevel3(null);   // 분류3 초기화
    };

    const handleLevel3Click = (clcd) => {
        setSelectedLevel3(clcd);
    };

    return (
        <div>
            <CategorySelector
                level1List={level1List}
                level2List={level2List}
                level3List={level3List}
                selectedLevel1={selectedLevel1}
                selectedLevel2={selectedLevel2}
                selectedLevel3={selectedLevel3}
                onLevel1Click={handleLevel1Click}
                onLevel2Click={handleLevel2Click}
                onLevel3Click={handleLevel3Click}
            />

            <div style={{ border: "1px solid #ddd", padding: 20 }}>
                {selectedId === null ? (
                    <Pppo1000List onSelect={setSelectedId} clcd={selectedClcd} />
                ) : (
                    <Pppo1100Page templateid={selectedId} onBack={() => setSelectedId(null)} />
                )}
            </div>
        </div>
    );
}
