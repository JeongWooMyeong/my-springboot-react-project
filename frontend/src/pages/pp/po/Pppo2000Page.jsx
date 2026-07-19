import { useState } from "react";
import { Form, Select, Button } from "antd";
import JijumInlineSelect from "../../components/JijumInlineSelect.jsx";
import Pppo2000List from "./Pppo2000List.jsx";
import TemplatePreview from "../../components/TemplatePreview/TemplatePreview.jsx";

export default function Pppo2000Page() {
    const [form] = Form.useForm();
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOrdnos, setSelectedOrdnos] = useState([]);
    const [status, setStatus] = useState("");
    const [requestList, setRequestList] = useState([]); // ✅ 조회 결과 상태 추가

    const handleSelect = (req) => {
        fetch(`/api/pppo2000/${req.ordno}`)
            .then(async res => {
                if (!res.ok) throw new Error("서버 에러");
                const text = await res.text();
                return text ? JSON.parse(text) : null;
            })
            .then(data => {
                setSelectedDetail(data);
            })
            .catch(err => console.error("상세 조회 에러:", err));
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
    // 승인 처리
    const handleApprove = () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }

        // 선택된 건 중 상태가 10이 아닌 게 있는지 확인
        const invalid = requestList.filter(req => selectedOrdnos.includes(req.ordno) && req.ordstate !== "10");
        if (invalid.length > 0) {
            alert("승인할 수 없는 상태의 신청내역이 포함되어 있습니다.");
            return;
        }

        fetch("/api/pppo2000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ordnos: selectedOrdnos,
                ordstate: 20   // 승인 상태 코드
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("승인 결과:", result);
                handleSearch(); // 리스트 갱신
            })
            .catch(err => console.error("승인 에러:", err));
    };

    // 반려 처리
    const handleReject = () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }

        // 선택된 건 중 상태가 10이 아닌 게 있는지 확인
        const invalid = requestList.filter(req => selectedOrdnos.includes(req.ordno) && req.ordstate !== "10");
        if (invalid.length > 0) {
            alert("승인할 수 없는 상태의 신청내역이 포함되어 있습니다.");
            return;
        }

        fetch("/api/pppo2000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ordnos: selectedOrdnos,
                ordstate: 50   // 반려 상태 코드
            })
        })
            .then(res => res.json())
            .then(result => {
                console.log("반려 결과:", result);
                handleSearch(); // 리스트 갱신
            })
            .catch(err => console.error("반려 에러:", err));
    };

    const handlePdf = () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }

        const invalid = requestList.filter(req => selectedOrdnos.includes(req.ordno) && req.ordstate !== "30" && req.ordstate !== "20");
        if (invalid.length > 0) {
            alert("PDF 생성 할 수 없는 상태의 신청내역이 포함되어 있습니다.");
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
                        selectedOrdnos={selectedOrdnos}   // ✅ 추가
                    />
                </div>

                {/* 오른쪽: 템플릿 미리보기 */}
                <div
                    style={{
                        display:"flex",
                        gap:20,
                        minHeight:700
                    }}
                >
                    {selectedDetail ? (
                        <TemplatePreview request={selectedDetail} />
                    ) : (
                        <div
                            style={{
                                flex:1,
                                minHeight:700,
                                height:700,
                                border:"1px solid #ddd",
                                padding:20,
                                boxSizing:"border-box"
                            }}
                        >
                            미리보기 상세 데이터가 없습니다.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
