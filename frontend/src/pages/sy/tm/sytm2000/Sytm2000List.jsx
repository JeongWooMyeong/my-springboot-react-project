import React from "react";

import {
    Checkbox,
    Pagination
} from "antd";


export default function Sytm2000List({

                                         templates,
                                         currentTemplates,
                                         selectedTemplates,

                                         handleCheck,
                                         handleDelete,
                                         handleEdit,
                                         handleAdd,

                                         currentPage,
                                         setCurrentPage,
                                         pageSize

                                     }) {

    return (

        <div
            style={{
                width: "100%",
                height: "calc(100vh - 120px)",
                boxSizing: "border-box",
                padding: "20px",

                display: "flex",
                flexDirection: "column",

                overflow: "hidden"
            }}
        >

            {/* 제목 + 템플릿 등록 버튼 */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    marginBottom: "20px"
                }}
            >

                <h3
                    style={{
                        margin: 0
                    }}
                >
                    템플릿 리스트
                </h3>


                {/* 템플릿이 없어도 항상 표시 */}
                <button
                    onClick={handleAdd}
                >
                    새 템플릿 등록
                </button>

            </div>


            {/* 템플릿 목록 영역 */}
            <div
                style={{
                    flex: 1,
                    minHeight: 0,

                    overflowY: "auto"
                }}
            >

                {
                    (currentTemplates || []).length === 0 ? (

                        /* 템플릿이 없는 경우 */
                        <div
                            style={{
                                padding: "60px 20px",

                                textAlign: "center",

                                color: "#999"
                            }}
                        >
                            등록된 템플릿이 없습니다.
                        </div>

                    ) : (

                        /* 템플릿 목록 */
                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    "repeat(3, 1fr)",

                                gap: "20px"
                            }}
                        >

                            {
                                currentTemplates.map(t => (

                                    <div
                                        key={t.id}
                                        style={{
                                            border:
                                                "1px solid #ccc",

                                            padding: "10px"
                                        }}
                                    >

                                        {/* 썸네일 */}
                                        <img
                                            src={
                                                //`${import.meta.env.VITE_API_BASE_URL}${t.thumbnailpath}`
                                                `${t.thumbnailpath}`
                                            }
                                            alt={t.title}
                                            style={{
                                                width: "100%"
                                            }}
                                        />


                                        {/* 제목 */}
                                        <p>
                                            {t.title}
                                        </p>


                                        {/* 활성화 상태 */}
                                        <p
                                            style={{
                                                color:
                                                    t.active
                                                        ? "green"
                                                        : "gray"
                                            }}
                                        >
                                            {
                                                t.active
                                                    ? "활성화됨"
                                                    : "비활성화"
                                            }
                                        </p>


                                        {/* 선택 */}
                                        <Checkbox
                                            checked={
                                                (
                                                    selectedTemplates || []
                                                ).includes(t.id)
                                            }

                                            onChange={e =>
                                                handleCheck(
                                                    t.id,
                                                    e.target.checked
                                                )
                                            }
                                        >
                                            선택
                                        </Checkbox>


                                        {/* 삭제 */}
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    t.id,
                                                    t.clcd
                                                )
                                            }
                                        >
                                            삭제
                                        </button>


                                        {/* 수정 */}
                                        <button
                                            onClick={() =>
                                                handleEdit(t)
                                            }
                                        >
                                            수정
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>


            {/* Pagination 영역 */}
            <div
                style={{
                    flexShrink: 0,

                    display: "flex",
                    justifyContent: "center",

                    paddingTop: "20px",
                    paddingBottom: "10px",

                    background: "#fff"
                }}
            >

                <Pagination
                    current={currentPage}

                    pageSize={pageSize}

                    total={
                        (templates || []).length
                    }

                    onChange={page => {
                        setCurrentPage(page);
                    }}
                />

            </div>

        </div>

    );
}