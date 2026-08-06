import React, { useState } from "react";
import ProductSearchModal from "./product/ProductSearchModal"; // 모달 컴포넌트 import

export default function DataForm({
                                     templateData,
                                     productData,
                                     productList,
                                     setProductList,
                                     currentIndex,
                                     setCurrentIndex,
                                     handleAddProduct,
                                     handleDeleteProduct,
                                     handleChange,
                                     handleImageUpload,
                                     handleExcelUpload,
                                     handleExcelTemplateDownload,
                                     saveData,
                                     setFocusField,
                                     onBack
                                 }) {
    const [showSearchModal, setShowSearchModal] = useState(false);

    // 상품 선택 시 템플릿 필드 매핑
    const handleProductSelect = (products) => {
        setProductList(() => {
            const list = [];
            products.forEach(prod => {
                const mapped = {};
                (templateData.canvasData || []).forEach(field => {
                    if (!field.fieldName) return;
                    switch (field.fieldName) {
                        case "상품코드": mapped[field.fieldName] = prod.productId; break;
                        case "상품명": mapped[field.fieldName] = prod.productName; break;
                        case "가격": mapped[field.fieldName] = prod.price; break;
                        case "재고": mapped[field.fieldName] = prod.stock; break;
                        default: break;
                    }
                });
                list.push(mapped);
            });
            return list; // 🔥 기존 데이터 초기화 후 새로 채움
        });

        // 첫 번째 데이터 선택 상태로 맞추기
        setCurrentIndex(0);
    };


    return (
        <div style={{ width: 320, padding: 10, borderRight: "1px solid #ddd", overflowY: "auto" }}>
            {/* 상단 버튼 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 15, flexWrap: "wrap" }}>
                <button onClick={onBack}>← 뒤로</button>
                <button onClick={handleAddProduct}>+ 데이터 추가</button>
                <button onClick={handleDeleteProduct}>삭제</button>
                <button onClick={handleExcelTemplateDownload}>양식 다운로드</button>

                <label style={{ background:"#1677ff", color:"#fff", padding:"6px 12px", borderRadius:4, cursor:"pointer", fontSize:14 }}>
                    엑셀 업로드
                    <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} style={{ display:"none" }} />
                </label>

                {/* 상품 검색 버튼 */}
                <button
                    style={{ background:"#52c41a", color:"#fff", padding:"6px 12px", borderRadius:4 }}
                    onClick={() => setShowSearchModal(true)}
                >
                    상품 검색
                </button>
            </div>

            {/* 데이터 목록 */}
            <div style={{ border:"1px solid #ddd", marginBottom:20 }}>
                <div style={{ padding:8, background:"#f5f5f5", fontWeight:"bold" }}>데이터 목록</div>
                <div style={{ maxHeight:100, overflowY:"auto" }}>
                    {productList.map((item,index)=>(
                        <div
                            key={index}
                            onClick={()=>setCurrentIndex(index)}
                            style={{
                                padding:10,
                                cursor:"pointer",
                                borderBottom:"1px solid #eee",
                                background:index === currentIndex ? "#e6f4ff" : "#fff"
                            }}
                        >
                            {index + 1}번 데이터
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom:10, fontWeight:"bold" }}>
                현재 데이터 : {currentIndex + 1}/{productList.length}
            </div>

            <h3>데이터 입력</h3>

            {(templateData.canvasData || []).map(field=>{
                const isImage = field.type === "image";
                return (
                    <div key={field.id} style={{ marginBottom:12 }}>
                        <label>{field.fieldName}</label>
                        {!isImage && (
                            <input
                                value={productData[field.fieldName] || ""}
                                onChange={e=>handleChange(field.fieldName, e.target.value)}
                                onFocus={()=>setFocusField(field.fieldName)}
                                style={{ width:"100%" }}
                            />
                        )}
                        {isImage && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e=>{
                                    const file = e.target.files[0];
                                    if(file){
                                        handleImageUpload(field.fieldName, file);
                                    }
                                }}
                            />
                        )}
                    </div>
                );
            })}

            <button onClick={saveData} style={{ width:"100%", marginTop:20, padding:10 }}>
                전체 저장
            </button>

            {/* 상품검색 모달 */}
            {showSearchModal && (
                <ProductSearchModal
                    onSelect={handleProductSelect}
                    onClose={() => setShowSearchModal(false)}
                />
            )}
        </div>
    );
}
