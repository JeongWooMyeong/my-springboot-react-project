import React, { useState } from "react";
import ReactDOM from "react-dom";
import { getProducts, getProductByName } from "../../../../../services/productApi";

export default function ProductSearchModal({ onSelect, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleSearch = async () => {
        try {
            if (query) {
                // 값이 있으면 단일 조회
                const product = await getProductByName(query);
                setResults(product ? [product] : []);
            } else {
                // 값이 없으면 전체 조회
                const list = await getProducts(query);
                setResults(list);
            }
        } catch (e) {
            alert("검색 중 오류 발생: " + e.message);
        }
    };

    const toggleSelect = (prod) => {
        setSelected(prev => {
            if (prev.includes(prod)) {
                return prev.filter(p => p !== prod);
            } else {
                return [...prev, prod];
            }
        });
    };

    const toggleSelectAll = () => {
        if (selected.length === results.length) {
            setSelected([]); // 모두 해제
        } else {
            setSelected(results); // 모두 선택
        }
    };

    const handleApply = () => {
        if (selected.length === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }
        onSelect(selected); // 선택된 상품 배열 전달
        onClose();
    };

    const modalContent = (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#fff",
                    padding: 20,
                    borderRadius: 8,
                    width: "600px",
                    maxHeight: "80%",
                    overflowY: "auto",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
                onClick={e => e.stopPropagation()}
            >
                <h3>상품 검색</h3>
                <div style={{ marginBottom: 10 }}>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="상품명 입력"
                        style={{ marginRight: 8 }}
                    />
                    <button onClick={handleSearch}>검색</button>
                    <button onClick={onClose} style={{ marginLeft: 8 }}>닫기</button>
                </div>

                {results.length === 0 ? (
                    <div style={{ padding: 10 }}>검색 결과가 없습니다.</div>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ background: "#f5f5f5" }}>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={results.length > 0 && selected.length === results.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>상품코드</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>상품명</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>가격</th>
                            <th style={{ border: "1px solid #ddd", padding: 8 }}>재고</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(prod => (
                            <tr key={prod.productId}>
                                <td style={{ border: "1px solid #ddd", padding: 8, textAlign: "center" }}>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(prod)}
                                        onChange={() => toggleSelect(prod)}
                                    />
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.productId}</td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.productName}</td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.price}</td>
                                <td style={{ border: "1px solid #ddd", padding: 8 }}>{prod.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <div style={{ marginTop: 15, textAlign: "right" }}>
                    <button onClick={handleApply} style={{ padding: "6px 12px", background:"#52c41a", color:"#fff", borderRadius:4 }}>
                        적용
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}
