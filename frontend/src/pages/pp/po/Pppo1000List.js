import { useEffect, useState } from "react";
import axios from "axios";

export default function Pppo1000List({ onSelect }) {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/api/sytm2000")
            .then(res => {
                setList(res.data);
            })
            .catch(err => {
                console.error("list load error", err);
            });
    }, []);

    return (
        <div style={{ padding: 20 }}>

            <h2 style={{ marginBottom: 20 }}>
                POP 템플릿 리스트
            </h2>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12
                }}
            >

                {list.map(item => (
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
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow =
                                "0 2px 10px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >

                        {/* 썸네일 */}
                        <img
                            src={
                                item.thumbnailpath
                                    ? `http://localhost:8081${item.thumbnailpath}`
                                    : "/thumb/noimage.png"
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

                        {/* 제목 */}
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
        </div>
    );
}