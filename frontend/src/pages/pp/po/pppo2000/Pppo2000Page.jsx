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

    /*
     * PDF 미리보기
     *
     * 단건 / 다건 모두 files 배열로 관리
     */
    const [pdfFiles, setPdfFiles] = useState([]);

    /*
     * 현재 보고 있는 PDF index
     */
    const [currentPdfIndex, setCurrentPdfIndex] = useState(0);

    /*
     * 기존 ZIP/PDF URL
     *
     * 필요하면 다운로드 용도로 사용할 수 있음
     */
    const [downloadUrl, setDownloadUrl] = useState(null);

    /*
     * Printer Agent에서 사용할 파일 경로
     */
    const [filePath, setFilePath] = useState(null);

    /*
     * PDF Preview Modal
     */
    const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

    const { showMessage } = useNotification();

    /*
     * 전체 인쇄용 PDF URL
     */
    const [allDownloadUrl, setAllDownloadUrl] = useState(null);


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

            /*
             * 기존 PDF 초기화
             */
            setPdfFiles([]);

            setDownloadUrl(null);

            setFilePath(null);

            setCurrentPdfIndex(0);

            setAllDownloadUrl(null);

            /*
             * Job ID 생성
             */
            const jobid =
                crypto.randomUUID();


            /*
             * SSE 먼저 연결
             */
            subscribePdf(
                jobid,
                showMessage,

                /*
                 * 기존에는 url 하나만 받았지만
                 * 이제 COMPLETE 결과 전체를 받도록 변경
                 */
                (result) => {

                    console.log(
                        "PDF 생성 완료:",
                        result
                    );

                    console.log("PDF files:", result.files);


                    /*
                     * 기존 다운로드 URL
                     */
                    setDownloadUrl(
                        result.downloadUrl
                    );

                    /*
                     * 전체 인쇄용 PDF URL
                     */
                    setAllDownloadUrl(
                        result.allDownloadUrl
                    );


                    /*
                     * 개별 PDF 목록
                     */
                    const files =
                        result.files || [];


                    setPdfFiles(files);

                    setCurrentPdfIndex(0);


                    /*
                     * 첫 번째 PDF
                     */
                    if (files.length > 0) {

                        setFilePath(
                            files[0].url
                        );

                    }


                    /*
                     * Preview 열기
                     */
                    setPdfPreviewOpen(true);
                }
            );


            showMessage(
                "PDF 생성 요청되었습니다."
            );


            /*
             * PDF 생성 요청
             */
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


    /*
     * 이전 PDF
     */
    const handlePreviousPdf = () => {

        if (currentPdfIndex <= 0) {
            return;
        }

        const newIndex =
            currentPdfIndex - 1;

        setCurrentPdfIndex(newIndex);

        setFilePath(
            pdfFiles[newIndex].url
        );
    };


    /*
     * 다음 PDF
     */
    const handleNextPdf = () => {

        if (
            currentPdfIndex >=
            pdfFiles.length - 1
        ) {
            return;
        }

        const newIndex =
            currentPdfIndex + 1;

        setCurrentPdfIndex(newIndex);

        setFilePath(
            pdfFiles[newIndex].url
        );
    };


    /*
     * PDF Preview 닫기
     */
    const handlePdfPreviewClose = () => {

        setPdfPreviewOpen(false);

        setPdfFiles([]);

        setCurrentPdfIndex(0);

        setDownloadUrl(null);

        setFilePath(null);
    };


    /*
     * 현재 PDF
     */
    const currentPdf =
        pdfFiles[currentPdfIndex];


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


            {/* PDF 미리보기 */}

            <Pppo2000PdfPreview
                open={pdfPreviewOpen}

                /*
                 * 현재 선택된 PDF 하나만 Viewer에 전달
                 */
                pdfUrl={
                    currentPdf?.url || null
                }

                /*
                 * 현재 선택된 PDF
                 */
                filePath={filePath}

                /*
                 * 전체 PDF 목록
                 */
                pdfFiles={pdfFiles}

                /*
                 * 전체 인쇄용 PDF
                 */
                allDownloadUrl={allDownloadUrl}

                /*
                 * 현재 index
                 */
                currentPdfIndex={
                    currentPdfIndex
                }

                /*
                 * 이전 / 다음
                 */
                onPrevious={
                    handlePreviousPdf
                }

                onNext={
                    handleNextPdf
                }

                onClose={
                    handlePdfPreviewClose
                }
            />

        </div>
    );
}
