import { useState } from "react";
import Pppo2000List from "./Pppo2000List.jsx";
import TemplatePreview from "../../components/TemplatePreview.jsx";

export default function Pppo2000Page() {
    const [selectedDetail, setSelectedDetail] = useState(null);

    // 신청내역 클릭 시 상세 데이터 가져오기
    const handleSelect = (req) => {
        fetch(`/api/pppo2000/${req.ordno}`)
            .then(res => res.json())
            .then(data => setSelectedDetail(data));
    };

    return (
        <div style={{ display: "flex", gap: 20 }}>
            {/* 왼쪽: 신청내역 리스트 */}
            <div style={{ flex: 1 }}>
                <Pppo2000List onSelect={handleSelect} />
            </div>

            {/* 오른쪽: 템플릿 미리보기 */}
            <div style={{ flex: 1, border: "1px solid #ddd", padding: 20 }}>
                {selectedDetail ? (
                    <TemplatePreview request={selectedDetail} />
                ) : (
                    <p>신청내역을 선택하면 오른쪽에 템플릿 미리보기가 표시됩니다.</p>
                )}
            </div>
        </div>
    );
}
