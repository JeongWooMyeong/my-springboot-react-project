// src/services/pppo2000Api.js

import axios from "../util/axios";

// 신청내역 조회
export async function searchRequests(jijumcd, status) {
    const res = await axios.get("/api/pppo2000/search", {
        params: {
            jijumcd,
            status
        }
    });

    return res.data;
}

// 상세 조회
export async function getRequestDetail(ordno) {
    const res = await axios.get(`/api/pppo2000/${ordno}`);

    return res.data;
}

// 상태 업데이트 (승인/반려)
export async function updateRequests(ordnos, ordstate) {
    const res = await axios.post("/api/pppo2000/update", {
        ordnos,
        ordstate
    });

    return res.data;
}

// PDF 생성
export const requestPdf = (
    ordno,
    jobid
) => {

    return axios.post(
        "/api/pppo2000/pdf",
        {
            ordno: ordno,
            jobid: jobid
        }
    );

};

// PDF 일괄 생성
export const requestPdfBulk = (
    ordnos,
    jobid
) => {

    return axios.post(
        "/api/pppo2000/pdf/bulk",
        {
            ordnos: ordnos,
            jobid: jobid
        }
    );

};

// PDF 생성 상태 구독
export const subscribePdf = (
    jobid,
    onMessage
) => {

    return new Promise((resolve, reject) => {

        const eventSource =
            new EventSource(
                `/api/pppo2000/pdf/subscribe/${jobid}`
            );


        // ⭐ SSE 연결 성공
        eventSource.onopen = () => {

            console.log(
                "🔥 SSE 연결 완료:",
                jobid
            );

            resolve();
        };


        // ⭐ PDF 완료
        eventSource.addEventListener(
            "PDF_COMPLETE",
            (event) => {

                console.log(
                    "🔥 PDF_COMPLETE 수신:",
                    jobid
                );

                const data =
                    JSON.parse(event.data);


                if (data.status === "COMPLETE") {

                    onMessage(
                        "PDF 생성 완료. 다운로드를 시작합니다."
                    );

                    setTimeout(() => {

                        window.location.href =
                            `${import.meta.env.VITE_API_BASE_URL}`
                            +
                            data.downloadUrl;

                    }, 1000);
                }


                eventSource.close();
            }
        );


        // ⭐ PDF 실패
        eventSource.addEventListener(
            "PDF_FAIL",
            (event) => {

                console.log(
                    "🔥 PDF_FAIL 수신:",
                    jobid
                );

                const data =
                    JSON.parse(event.data);


                onMessage(
                    data.message ||
                    "PDF 생성 실패"
                );


                eventSource.close();
            }
        );


        // ⭐ 연결 실패
        eventSource.onerror = () => {

            console.error(
                "🔥 SSE 연결 실패:",
                jobid
            );

            eventSource.close();

            reject(
                new Error(
                    "SSE 연결 실패"
                )
            );
        };

    });

};