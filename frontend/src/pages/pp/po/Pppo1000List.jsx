import { useEffect, useState } from "react";
import axios from "axios";

export default function Pppo1000List({ onSelect, clcd }) {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (!clcd) return;

        axios
            .get(`/api/sytm2000?clcd=${clcd}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token?.trim()}`
                }
            })
            .then(res => {
                setList(res.data);
                setPage(1); // 분류 바뀌면 첫 페이지로 초기화
            })
            .catch(err => {
                console.error("list load error", err);
            });
    }, [clcd]);

    const startIndex = (page - 1) * itemsPerPage;
    const currentItems = list.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(list.length / itemsPerPage);

    return (
        <div
            style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center" // ✅ 전체 가운데
            }}
        >
            <h2 style={{ marginBottom: 20 }}>POP 템플릿 리스트</h2>

            {/* 리스트 영역 */}
            <div
                style={{
                    width: 1200,   // ✅ 고정 폭
                    height: 400,   // ✅ 고정 높이
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    justifyContent: "center",
                    overflow: "hidden", // 스크롤 대신 페이지네이션
                    background: "#fafafa",
                    padding: 20,
                    border: "1px solid #ddd",
                    borderRadius: 8
                }}
            >
                {currentItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        style={{
                            width: 200,
                            border: "1px solid #ddd",
                            borderRadius: 8,
                            padding: 10,
                            cursor: "pointer",
                            transition: "0.2s",
                            background: "#fff"
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <img
                            src={
                                item.thumbnailpath
                                    ? `http://localhost:8081${item.thumbnailpath}`
                                    : "/upload/thumb/noimage.png"
                            }
                            alt="thumb"
                            style={{
                                width: "100%",
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 6,
                                marginBottom: 10,
                                backgroundColor: "#f5f5f5"
                            }}
                        />
                        <div
                            style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#333",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <div style={{ marginTop: 20 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        style={{
                            margin: "0 4px",
                            padding: "6px 12px",
                            borderRadius: 4,
                            border: "1px solid #ccc",
                            background: page === i + 1 ? "#333" : "#fff",
                            color: page === i + 1 ? "#fff" : "#333",
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
