import { useState } from "react";
import { Form, Select, Button } from "antd";
import JijumInlineSelect from "../../components/JijumInlineSelect.jsx";
import Pppo2000List from "./Pppo2000List.jsx";
import TemplatePreview from "../../components/TemplatePreview.jsx";

export default function Pppo2000Page() {
    const [form] = Form.useForm();
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOrdnos, setSelectedOrdnos] = useState([]);
    const [status, setStatus] = useState("");
    const [requestList, setRequestList] = useState([]); // ✅ 조회 결과 상태 추가

    // 신청내역 클릭 시 상세 데이터 가져오기
    const handleSelect = (req) => {
        fetch(`/api/pppo2000/${req.ordno}`)
            .then(res => res.json())
            .then(data => setSelectedDetail(data));
    };

    // 체크박스 선택 처리
    const handleCheckboxChange = (ordno, checked) => {
        setSelectedOrdnos(prev =>
            checked ? [...prev, ordno] : prev.filter(o => o !== ordno)
        );
    };

    // 조회 버튼
    const handleSearch = () => {
        const jijumcd = form.getFieldValue("jijumcd");
        fetch(`/api/pppo2000/search?jijumcd=${jijumcd}&status=${status}`)
            .then(res => res.json())
            .then(data => {
                console.log("조회 결과:", data);
                // 조회 결과를 Pppo2000List에 반영하도록 props 전달 필요
                setRequestList(data); // ✅ 리스트 갱신
            });
    };

    // 승인/반려/PDF 버튼
    const handleApprove = () => {
        console.log("승인 처리:", selectedOrdnos);
    };
    const handleReject = () => {
        console.log("반려 처리:", selectedOrdnos);
    };
    const handlePdf = () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }

        if (selectedOrdnos.length === 1) {
            // 단건 PDF 요청
            fetch("/api/pppo2000/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ordno: selectedOrdnos[0] })
            })
                .then(res => res.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${selectedOrdnos[0]}.pdf`;
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
        } else {
            // 여러건 → zip 요청
            fetch("/api/pppo2000/pdf/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ordnos: selectedOrdnos })
            })
                .then(res => res.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "pppo2000_pdfs.zip";
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
        }
    };

    return (
        <div>
            {/* 상단 필터 영역 */}
            <Form form={form} layout="inline" style={{ marginBottom: 20 }}>
                <JijumInlineSelect form={form} />

                <Form.Item label="신청상태" name="status" initialValue="">
                    <Select
                        value={status}
                        onChange={val => setStatus(val)}
                        style={{ width: 150 }}
                        placeholder="상태 선택"
                    >
                        <Select.Option value="">전체</Select.Option>
                        <Select.Option value="10">신청</Select.Option>
                        <Select.Option value="20">승인</Select.Option>
                        <Select.Option value="30">반려</Select.Option>
                    </Select>
                </Form.Item>

                <Button type="primary" onClick={handleSearch}>
                    조회
                </Button>
            </Form>

            <div style={{ display: "flex", gap: 20 }}>
                {/* 왼쪽: 신청내역 리스트 */}
                <div style={{ flex: 1 }}>
                    <Pppo2000List
                        data={requestList}          // ✅ 조회 결과 전달
                        onSelect={handleSelect}
                        onCheck={handleCheckboxChange}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onPdf={handlePdf}
                    />
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

        </div>
    );
}
