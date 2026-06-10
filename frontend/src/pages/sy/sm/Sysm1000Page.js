import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";   // 아까 만든 Sidebar 컴포넌트
import "../../../css/layout.css";

function Sysm1000Page() {
    // 현재 선택된 메뉴 코드 상태
    const [selectedMenuCd, setSelectedMenuCd] = useState(null);

    return (
        <div className="layout">
            {/* 왼쪽 사이드바 */}
            <Sidebar selectedMenuCd={selectedMenuCd} />

            {/* 오른쪽 콘텐츠 영역 */}
            <div className="content">
                <h2>Sysm1000 Page</h2>
                <p>여기에 Sysm1000 관련 본문 콘텐츠가 들어갑니다.</p>
            </div>
        </div>
    );
}

export default Sysm1000Page;