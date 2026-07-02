import { useState } from "react";
import Pppo1000List from "./Pppo1000List";
import Sytm2000Page from "../../sy/tm/Sytm2000Page"; // 기존 에디터 재사용

export default function Pppo1000Page() {

    const [selectedId, setSelectedId] = useState(null);
    const [mode, setMode] = useState("list");

    // 리스트 → 편집
    const handleSelect = (id) => {
        setSelectedId(id);
        setMode("edit");
    };

    // 뒤로가기
    const handleBack = () => {
        setSelectedId(null);
        setMode("list");
    };

    return (
        <div>

            {mode === "list" && (
                <Pppo1000List onSelect={handleSelect} />
            )}

            {mode === "edit" && (
                <div>
                    <button onClick={handleBack}>
                        ← 뒤로
                    </button>

                    <Sytm2000Page templateId={selectedId} />
                </div>
            )}

        </div>
    );
}