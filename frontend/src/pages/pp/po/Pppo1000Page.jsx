import { useState } from "react";
import Pppo1000List from "./Pppo1000List.jsx";
import Pppo1100Page from "./Pppo1100Page.jsx";

export default function Pppo1000Page() {

    const [selectedId, setSelectedId] = useState(null);

    // 목록에서 선택
    const handleSelect = (id) => {
        setSelectedId(id);
    };

    // 뒤로가기 (수정 화면 → 목록)
    const handleBack = () => {
        setSelectedId(null);
    };

    return (
        <div>

            {/* LIST 영역 */}
            {selectedId === null ? (
                <Pppo1000List onSelect={handleSelect} />
            ) : (
                /* EDIT 영역 (1100Page로 이동) */
                <Pppo1100Page
                    templateid={selectedId}
                    onBack={handleBack}
                />
            )}

        </div>
    );
}