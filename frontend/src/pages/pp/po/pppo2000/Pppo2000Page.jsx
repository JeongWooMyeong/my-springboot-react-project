import { useState } from "react";
import { Form } from "antd";
import Pppo2000Filter from "./Pppo2000Filter.jsx";
import Pppo2000List from "./Pppo2000List.jsx";
import Pppo2000Detail from "./Pppo2000Detail.jsx";
import {
    searchRequests,
    getRequestDetail,
    updateRequests,
    downloadPdfSingle,
    downloadPdfBulk
} from "../../../../services/pppo2000Api.js";

export default function Pppo2000Page() {
    const [form] = Form.useForm();
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOrdnos, setSelectedOrdnos] = useState([]);
    const [status, setStatus] = useState("");
    const [requestList, setRequestList] = useState([]);

    const handleSearch = async () => {
        const jijumcd = form.getFieldValue("jijumcd");
        const data = await searchRequests(jijumcd, status);
        setRequestList(data);
    };

    const handleSelect = async (req) => {
        const detail = await getRequestDetail(req.ordno);
        setSelectedDetail(detail);
    };

    const handleCheckboxChange = (ordno, checked) => {
        setSelectedOrdnos(prev =>
            checked ? [...prev, ordno] : prev.filter(o => o !== ordno)
        );
    };

    const handleApprove = async () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }
        await updateRequests(selectedOrdnos, 20);
        setSelectedOrdnos([]);   // 체크 해제
        await handleSearch();
    };

    const handleReject = async () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }
        await updateRequests(selectedOrdnos, 50);
        setSelectedOrdnos([]);   // 체크 해제
        await handleSearch();
    };

    const handlePdf = async () => {
        if (selectedOrdnos.length === 0) {
            alert("선택된 신청내역이 없습니다.");
            return;
        }
        let blob;
        if (selectedOrdnos.length === 1) {
            blob = await downloadPdfSingle(selectedOrdnos[0]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${selectedOrdnos[0]}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            blob = await downloadPdfBulk(selectedOrdnos);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "pppo2000_pdfs.zip";
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };

    return (
        <div>
            <Pppo2000Filter form={form} status={status} setStatus={setStatus} onSearch={handleSearch} />
            <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                    <Pppo2000List
                        data={requestList}
                        onSelect={handleSelect}
                        onCheck={handleCheckboxChange}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onPdf={handlePdf}
                        selectedOrdnos={selectedOrdnos}
                    />
                </div>
                <div style={{ flex: 1, minHeight: 700 }}>
                    <Pppo2000Detail detail={selectedDetail} />
                </div>
            </div>
        </div>
    );
}
