import { useState, useEffect } from "react";

export default function Pppo2000List({ data = [], onSelect, onCheck }) {
    const [requests, setRequests] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setRequests(data);
    }, [data]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(requests.length / itemsPerPage);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h3 style={{ margin: 0 }}>신청내역</h3>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => console.log("승인", requests)}>승인</button>
                    <button onClick={() => console.log("반려", requests)}>반려</button>
                    <button onClick={() => console.log("PDF 생성", requests)}>PDF</button>
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
                            <tr key={req.ordno} style={{ cursor: "pointer" }}>
                                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                                    <input
                                        type="checkbox"
                                        id={req.ordno}
                                        onChange={(e) => onCheck(req.ordno, e.target.checked)}
                                    />
                                </td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }} onClick={() => onSelect(req)}>{req.ordno}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }} onClick={() => onSelect(req)}>{req.rgr}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }} onClick={() => onSelect(req)}>{req.rgdate}</td>
                                <td style={{ border: "1px solid #ccc", padding: 8 }} onClick={() => onSelect(req)}>{req.ordstate}</td>
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
