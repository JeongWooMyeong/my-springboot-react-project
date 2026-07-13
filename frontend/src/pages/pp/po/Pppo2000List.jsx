import { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";

export default function Pppo2000List({ data = [], onSelect, onCheck, onApprove, onReject, onPdf }) {
    const [requests, setRequests] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState(null); // 선택된 신청내역
    const itemsPerPage = 10;

    useEffect(() => {
        setRequests(data);
    }, [data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(requests.length / itemsPerPage);

    const userinfo = useUser();

    // 권한 체크 함수
    const canApproveReject = (req) => {
        console.log("userinfo:", userinfo);
        console.log("req:", req);

        if (!userinfo?.roles) {
            console.log("roles 없음");
            return false;
        }

        const hasSystemRole = userinfo.roles.some(role => role.rolename === "시스템총괄");
        console.log("hasSystemRole:", hasSystemRole);
        console.log("ordstate:", req?.ordstate);

        return hasSystemRole && req?.ordstate === "10";
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h3 style={{ margin: 0 }}>신청내역</h3>
                <div style={{ display: "flex", gap: 8 }}>
                    {/* 선택된 신청내역이 있고 조건을 만족할 때만 버튼 노출 */}
                    {selectedRequest && canApproveReject(selectedRequest) && (
                        <>
                            <button onClick={() => onApprove(selectedRequest)}>승인</button>
                            <button onClick={() => onReject(selectedRequest)}>반려</button>
                        </>
                    )}
                    {selectedRequest && (Number(selectedRequest.ordstate) === 20 || Number(selectedRequest.ordstate) === 30) && (
                        <button onClick={onPdf}>PDF</button>
                    )}
                </div>
            </div>

            {requests.length === 0 ? (
                <p style={{ textAlign: "center", padding: 20 }}>조회된 데이터가 없습니다.</p>
            ) : (
                <>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            <th style={{ border: "1px solid #ccc", padding: 8 }}>선택</th>
                            <th style={{ border: "1px solid #ccc", padding: 8 }}>주문번호</th>
                            <th style={{ border: "1px solid #ccc", padding: 8 }}>등록자</th>
                            <th style={{ border: "1px solid #ccc", padding: 8 }}>등록일자</th>
                            <th style={{ border: "1px solid #ccc", padding: 8 }}>상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map(req => (
                            <tr key={req.ordno} style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setSelectedRequest(req);
                                    onSelect(req);
                                }
                            }>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                                    <input
                                        type="checkbox"
                                        id={req.ordno}
                                        onChange={(e) => onCheck(req.ordno, e.target.checked)}
                                    />
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.ordno}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.rgr}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.rgdate}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.ordstate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: 20, textAlign: "center" }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    background: currentPage === i + 1 ? "#007bff" : "#f9f9f9",
                                    color: currentPage === i + 1 ? "#fff" : "#000",
                                    border: "1px solid #ccc",
                                    borderRadius: 4,
                                    cursor: "pointer"
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
