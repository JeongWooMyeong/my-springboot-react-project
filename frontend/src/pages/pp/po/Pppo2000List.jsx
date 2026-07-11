import { useEffect, useState } from "react";

export default function Pppo2000List({ onSelect }) {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("/api/pppo2000/list") // 신청내역 API 호출
            .then(res => res.json())
            .then(data => setRequests(data));
    }, []);

    // 현재 페이지에 보여줄 데이터
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수
    const totalPages = Math.ceil(requests.length / itemsPerPage);

    return (
        <div>
            <h3>신청내역</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>주문번호</th>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>등록자</th>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>등록일자</th>
                    <th style={{ border: "1px solid #ccc", padding: 8 }}>상태</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map(req => (
                    <tr
                        key={req.ordno}
                        onClick={() => onSelect(req)}
                        style={{ cursor: "pointer" }}
                    >
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.ordno}</td>
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.rgr}</td>
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.rgdate}</td>
                        <td style={{ border: "1px solid #ccc", padding: 8 }}>{req.ordstate}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* 페이지네이션 버튼 */}
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
        </div>
    );
}
