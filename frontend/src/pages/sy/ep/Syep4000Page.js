import React from "react";
import "../../../css/page.css";

function Syep4000Page() {
    // 예시 데이터
    const data = [
        { id: 1, name: "상품 A", price: 1000, stock: 20 },
        { id: 2, name: "상품 B", price: 2000, stock: 15 },
        { id: 3, name: "상품 C", price: 3000, stock: 5 },
        { id: 4, name: "상품 D", price: 4000, stock: 0 },
    ];

    return (
        <div className="syep4000-container">
            <h2>사용자관리</h2>
            <div className="grid-table">
                <div className="grid-header">
                    <div>ID</div>
                    <div>상품명</div>
                    <div>가격</div>
                    <div>재고</div>
                </div>
                {data.map(item => (
                    <div className="grid-row" key={item.id}>
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                        <div>{item.price.toLocaleString()}원</div>
                        <div>{item.stock}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Syep4000Page;