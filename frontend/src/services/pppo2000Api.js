// src/services/pppo2000Api.js

// 신청내역 조회
import axios from "../util/axios";

export async function searchRequests(jijumcd, status) {
    const res = await fetch(`/api/pppo2000/search?jijumcd=${jijumcd}&status=${status}`);
    if (!res.ok) throw new Error("조회 실패");
    return res.json();
}

// 상세 조회
export async function getRequestDetail(ordno) {
    const res = await fetch(`/api/pppo2000/${ordno}`);
    if (!res.ok) throw new Error("상세 조회 실패");
    const text = await res.text();
    return text ? JSON.parse(text) : null;
}

// 상태 업데이트 (승인/반려)
export async function updateRequests(ordnos, ordstate) {
    const res = await fetch("/api/pppo2000/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordnos, ordstate })
    });
    if (!res.ok) throw new Error("상태 업데이트 실패");
    return res.json();
}

export const requestPdf = (ordno) => {

    return axios.post(
        "/api/pppo2000/pdf",
        {
            ordno: ordno
        }
    );

};



export const requestPdfBulk = (ordnos) => {

    return axios.post(
        "/api/pppo2000/pdf/bulk",
        {
            ordnos: ordnos
        }
    );

};



export const subscribePdf = (
    jobid,
    onMessage
)=>{


    const eventSource =
        new EventSource(
            `/api/pppo2000/pdf/subscribe/${jobid}`
        );



    eventSource.addEventListener(
        "PDF_COMPLETE",
        (event)=>{


            const data =
                JSON.parse(
                    event.data
                );



            if(data.status === "COMPLETE"){


                onMessage(
                    "PDF 생성 완료. 다운로드를 시작합니다."
                );



                setTimeout(()=>{


                    window.location.href =
                        `${import.meta.env.VITE_API_BASE_URL}`
                        +
                        data.downloadUrl;


                },1000);


            }


            eventSource.close();


        }
    );



    eventSource.addEventListener(
        "PDF_FAIL",
        (event)=>{


            const data =
                JSON.parse(
                    event.data
                );



            onMessage(
                data.message || "PDF 생성 실패"
            );



            eventSource.close();


        }
    );



    eventSource.onerror = ()=>{


        onMessage(
            "PDF 생성 상태 확인 실패"
        );


        eventSource.close();


    };


};