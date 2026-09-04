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

import "../../../../css/pages/pp/pppo2000/pppo2000-page.css";
import Pppo2000PdfPreview from "./Pppo2000PdfPreview.jsx";


export default function Pppo2000Page() {

    const [form] = Form.useForm();

    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedOrdnos, setSelectedOrdnos] = useState([]);
    const [status, setStatus] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null); //260905
    const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false); //260905

    const { showMessage } = useNotification();


    const handleSearch = async () => {

        const jijumcd =
            form.getFieldValue("jijumcd");

        const data =
            await searchRequests(
                jijumcd,
                status
            );

        setRequestList(data);
    };


    const handleSelect = async (req) => {

        const detail =
            await getRequestDetail(
                req.ordno
            );

        setSelectedDetail(detail);
    };


    const handleCheckboxChange = (
        ordno,
        checked
    ) => {

        setSelectedOrdnos(prev =>
            checked
                ? [...prev, ordno]
                : prev.filter(o => o !== ordno)
        );
    };


    const handleApprove = async () => {

        if (selectedOrdnos.length === 0) {

            alert(
                "선택된 신청내역이 없습니다."
            );

            return;
        }

        await updateRequests(
            selectedOrdnos,
            20
        );

        setSelectedOrdnos([]);

        await handleSearch();
    };


    const handleReject = async () => {

        if (selectedOrdnos.length === 0) {

            alert(
                "선택된 신청내역이 없습니다."
            );

            return;
        }

        await updateRequests(
            selectedOrdnos,
            50
        );

        setSelectedOrdnos([]);

        await handleSearch();
    };


    const handlePdf = async () => {

        if (selectedOrdnos.length === 0) {

            alert(
                "선택된 신청내역이 없습니다."
            );

            return;
        }

        try {

            // ⭐ jobId를 PDF 요청 전에 생성
            const jobid =
                crypto.randomUUID();


            // ⭐ SSE 먼저 연결
            subscribePdf(
                jobid,
                showMessage,
                (url) => {
                    setPdfUrl(url);
                    setPdfPreviewOpen(true);
                }
            );


            showMessage(
                "PDF 생성 요청되었습니다."
            );


            // ⭐ 생성한 jobId를 PDF 요청에 전달
            if (selectedOrdnos.length === 1) {

                await requestPdf(
                    selectedOrdnos[0],
                    jobid
                );

            } else {

                await requestPdfBulk(
                    selectedOrdnos,
                    jobid
                );
            }


        } catch (e) {

            console.error(e);

            alert(
                "PDF 생성 요청 실패"
            );

        }

    };


    return (

        <div className="pop-request-page">

            {/* 검색 조건 */}

            <section className="pop-request-filter">

                <Pppo2000Filter
                    form={form}
                    status={status}
                    setStatus={setStatus}
                    onSearch={handleSearch}
                />

            </section>


            {/* 목록 + 상세 */}

            <div className="pop-request-content">

                {/* 신청 목록 */}

                <section className="pop-request-list">

                    <Pppo2000List
                        data={requestList}
                        onSelect={handleSelect}
                        onCheck={handleCheckboxChange}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onPdf={handlePdf}
                        selectedOrdnos={selectedOrdnos}
                    />

                </section>


                {/* 상세 */}

                <section className="pop-request-detail">

                    <Pppo2000Detail
                        key={selectedDetail?.ordno}
                        detail={selectedDetail}
                    />

                </section>

            </div>

            {/* ⭐ PDF 미리보기 */}

            <Pppo2000PdfPreview
                open={pdfPreviewOpen}
                pdfUrl={pdfUrl}
                onClose={() => setPdfPreviewOpen(false)}
            />

        </div>

    );
}