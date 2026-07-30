import { useState } from "react";
import { Form } from "antd";
import Pppo2000Filter from "./Pppo2000Filter.jsx";
import Pppo2000List from "./Pppo2000List.jsx";
import Pppo2000Detail from "./Pppo2000Detail.jsx";
import {
    searchRequests,
    getRequestDetail,
    updateRequests,
    requestPdf,
    requestPdfBulk,
    subscribePdf
} from "../../../../services/pppo2000Api.js";

import {
    useNotification
} from "../../../../context/NotificationContext.jsx";

export default function Pppo2000Page() {
    const [form] = Form.useForm();
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOrdnos, setSelectedOrdnos] = useState([]);
    const [status, setStatus] = useState("");
    const [requestList, setRequestList] = useState([]);

    const {
        showMessage
    } = useNotification();

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


        try {

            let response;


            // 단건
            if (selectedOrdnos.length === 1) {

                response =
                    await requestPdf(
                        selectedOrdnos[0]
                    );

            }
            // 다건
            else {

                response =
                    await requestPdfBulk(
                        selectedOrdnos
                    );

            }



            const jobid =
                response.data.jobid;



            // 생성 요청 알림

            showMessage(
                "PDF 생성 요청되었습니다."
            );



            // SSE 연결

            subscribePdf(
                jobid,
                showMessage
            );



        } catch(e) {

            alert("PDF 생성 요청 실패");

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
