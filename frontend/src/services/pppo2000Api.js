// src/services/pppo2000Api.js

// 신청내역 조회
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

// PDF 단건 다운로드
export async function downloadPdfSingle(ordno) {
    const res = await fetch("/api/pppo2000/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordno })
    });
    if (!res.ok) throw new Error("PDF 생성 실패");
    return res.blob();
}

// PDF 여러건 다운로드 (zip)
export async function downloadPdfBulk(ordnos) {
    const res = await fetch("/api/pppo2000/pdf/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordnos })
    });
    if (!res.ok) throw new Error("PDF 생성 실패");
    return res.blob();
}
