import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
    getProducts,
    getProductByName
} from "../../../../../services/productApi";

export default function ProductSearchModal({
                                               onSelect,
                                               onClose
                                           }) {

    // ========================================
    // 검색어
    // ========================================

    const [query, setQuery] = useState("");


    // ========================================
    // 현재 상품 목록
    // ========================================

    const [results, setResults] = useState([]);


    // ========================================
    // 선택된 상품
    // ========================================

    const [selected, setSelected] = useState([]);


    // ========================================
    // 현재 페이지
    // ========================================

    const [page, setPage] = useState(0);


    // ========================================
    // 페이지 크기
    // ========================================

    const [size] = useState(50);


    // ========================================
    // 전체검색(DB)용
    // ========================================

    const [totalPages, setTotalPages] = useState(0);


    // ========================================
    // Elasticsearch용
    // ========================================

    // 현재 페이지에서 받은 다음 cursor
    const [nextCursor, setNextCursor] = useState(null);


    // 다음 페이지 존재 여부
    const [hasNext, setHasNext] = useState(false);


    // 이전 페이지 이동용 cursor history
    //
    // 예:
    //
    // 0페이지
    // []
    //
    // 1페이지
    // [60050]
    //
    // 2페이지
    // [60050, 60100]
    //
    const [cursorHistory, setCursorHistory] = useState([]);


    // ========================================
    // 전체상품 조회
    // DB Page 방식
    // ========================================

    const loadAllProducts = async (
        targetPage = 0
    ) => {

        try {

            const data = await getProducts(
                targetPage,
                size
            );


            console.log(
                "전체상품 조회:",
                data
            );


            setResults(
                data.content || []
            );


            setPage(
                data.page ?? targetPage
            );


            setTotalPages(
                data.totalPages ?? 0
            );


            // 전체검색에서는 ES cursor 사용 안함
            setNextCursor(null);
            setHasNext(false);
            setCursorHistory([]);


            // 페이지 이동 시 선택 초기화
            setSelected([]);


        } catch (e) {

            console.error(
                "전체 상품 조회 실패:",
                e
            );

            alert(
                "상품 조회 중 오류 발생: " +
                (
                    e.response?.data?.message ||
                    e.message
                )
            );
        }
    };


    // ========================================
    // Elasticsearch 검색
    // Cursor 방식
    // ========================================

    const loadSearchProducts = async (
        cursor = null,
        targetPage = 0
    ) => {

        try {

            console.log(
                "ES 검색 요청:",
                {
                    keyword: query.trim(),
                    size: size,
                    cursor: cursor
                }
            );


            const data = await getProductByName(
                query.trim(),
                size,
                cursor
            );


            console.log(
                "ES 검색 응답:",
                data
            );


            // ProductSearchResponse
            //
            // {
            //     content: [],
            //     nextCursor: 12345,
            //     hasNext: true
            // }

            setResults(
                data.content || []
            );


            setPage(
                targetPage
            );


            setNextCursor(
                data.nextCursor ?? null
            );


            setHasNext(
                data.hasNext ?? false
            );


            // ES에서는 totalPages 사용 안함
            setTotalPages(0);


            // 페이지 이동 시 선택 초기화
            setSelected([]);


        } catch (e) {

            console.error(
                "ES 상품 검색 실패:",
                e
            );

            alert(
                "상품 검색 중 오류 발생: " +
                (
                    e.response?.data?.message ||
                    e.message
                )
            );
        }
    };


    // ========================================
    // 검색 버튼
    // ========================================

    const handleSearch = async () => {

        // ====================================
        // 검색어 있음
        // Elasticsearch 검색
        // ====================================

        if (query.trim()) {

            setPage(0);

            setNextCursor(null);

            setHasNext(false);

            setCursorHistory([]);

            setSelected([]);


            // 첫 페이지
            // cursor = null
            await loadSearchProducts(
                null,
                0
            );

            return;
        }


        // ====================================
        // 검색어 없음
        // 전체 상품 DB 조회
        // ====================================

        setPage(0);

        setNextCursor(null);

        setHasNext(false);

        setCursorHistory([]);

        setSelected([]);


        await loadAllProducts(0);
    };


    // ========================================
    // 전체검색 이전
    // ========================================

    const handleAllPrevious = async () => {

        if (page <= 0) {
            return;
        }


        await loadAllProducts(
            page - 1
        );
    };


    // ========================================
    // 전체검색 다음
    // ========================================

    const handleAllNext = async () => {

        if (
            page >= totalPages - 1
        ) {
            return;
        }


        await loadAllProducts(
            page + 1
        );
    };


    // ========================================
    // ES 검색 다음
    // ========================================

    const handleSearchNext = async () => {

        if (
            !hasNext ||
            nextCursor === null
        ) {
            return;
        }


        /*
         * 현재 페이지의 nextCursor를
         * history에 저장
         *
         * 예:
         *
         * 0 -> 1
         * [60050]
         *
         * 1 -> 2
         * [60050, 60100]
         */

        setCursorHistory(prev => [
            ...prev,
            nextCursor
        ]);


        await loadSearchProducts(
            nextCursor,
            page + 1
        );
    };


    // ========================================
    // ES 검색 이전
    // ========================================

    const handleSearchPrevious = async () => {

        if (page <= 0) {
            return;
        }


        const history = [
            ...cursorHistory
        ];


        /*
         * 예:
         *
         * 현재 2페이지
         *
         * history
         * [60050, 60100]
         *
         * 2 -> 1
         *
         * 마지막 cursor 60100 제거
         *
         * [60050]
         *
         * 60050으로 1페이지 조회
         */


        history.pop();


        const previousCursor =
            history.length > 0
                ? history[history.length - 1]
                : null;


        setCursorHistory(
            history
        );


        await loadSearchProducts(
            previousCursor,
            page - 1
        );
    };


    // ========================================
    // 상품 선택
    // ========================================

    const toggleSelect = (prod) => {

        setSelected(prev => {

            const exists = prev.some(
                p =>
                    p.productId ===
                    prod.productId
            );


            if (exists) {

                return prev.filter(
                    p =>
                        p.productId !==
                        prod.productId
                );
            }


            return [
                ...prev,
                prod
            ];
        });
    };


    // ========================================
    // 현재 페이지 전체 선택
    // ========================================

    const toggleSelectAll = () => {

        const allSelected =
            results.length > 0 &&
            results.every(
                prod =>
                    selected.some(
                        p =>
                            p.productId ===
                            prod.productId
                    )
            );


        if (allSelected) {

            // 현재 페이지 상품만 해제
            setSelected(prev =>
                prev.filter(
                    selectedProd =>
                        !results.some(
                            result =>
                                result.productId ===
                                selectedProd.productId
                        )
                )
            );

        } else {

            // 현재 페이지 상품 추가
            setSelected(prev => {

                const newProducts =
                    results.filter(
                        result =>
                            !prev.some(
                                selectedProd =>
                                    selectedProd.productId ===
                                    result.productId
                            )
                    );


                return [
                    ...prev,
                    ...newProducts
                ];
            });
        }
    };


    // ========================================
    // 적용
    // ========================================

    const handleApply = () => {

        if (selected.length === 0) {

            alert(
                "선택된 상품이 없습니다."
            );

            return;
        }


        onSelect(
            selected
        );

        onClose();
    };


    // ========================================
    // 전체 선택 여부
    // ========================================

    const allSelected =
        results.length > 0 &&
        results.every(
            prod =>
                selected.some(
                    p =>
                        p.productId ===
                        prod.productId
                )
        );


    // ========================================
    // Modal
    // ========================================

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
                    width: "700px",
                    maxHeight: "80%",
                    overflowY: "auto",
                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.3)"
                }}
                onClick={e =>
                    e.stopPropagation()
                }
            >

                <h3>
                    상품 검색
                </h3>


                {/* ====================================
                    검색 영역
                ==================================== */}

                <div
                    style={{
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center"
                    }}
                >

                    <input
                        value={query}
                        onChange={e =>
                            setQuery(
                                e.target.value
                            )
                        }
                        onKeyDown={e => {

                            if (
                                e.key === "Enter"
                            ) {
                                handleSearch();
                            }
                        }}
                        placeholder="상품명 입력"
                        style={{
                            marginRight: 8,
                            padding:
                                "6px 8px",
                            width: "250px"
                        }}
                    />


                    <button
                        onClick={
                            handleSearch
                        }
                    >
                        검색
                    </button>


                    <button
                        onClick={onClose}
                        style={{
                            marginLeft: 8
                        }}
                    >
                        닫기
                    </button>

                </div>


                {/* ====================================
                    검색 결과
                ==================================== */}

                {results.length === 0 ? (

                    <div
                        style={{
                            padding: 10
                        }}
                    >
                        검색 결과가 없습니다.
                    </div>

                ) : (

                    <>

                        {/* ====================================
                            상품 테이블
                        ==================================== */}

                        <table
                            style={{
                                width: "100%",
                                borderCollapse:
                                    "collapse"
                            }}
                        >

                            <thead>

                            <tr
                                style={{
                                    background:
                                        "#f5f5f5"
                                }}
                            >

                                <th
                                    style={{
                                        border:
                                            "1px solid #ddd",
                                        padding: 8
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            allSelected
                                        }
                                        onChange={
                                            toggleSelectAll
                                        }
                                    />
                                </th>


                                <th
                                    style={{
                                        border:
                                            "1px solid #ddd",
                                        padding: 8
                                    }}
                                >
                                    상품코드
                                </th>


                                <th
                                    style={{
                                        border:
                                            "1px solid #ddd",
                                        padding: 8
                                    }}
                                >
                                    상품명
                                </th>


                                <th
                                    style={{
                                        border:
                                            "1px solid #ddd",
                                        padding: 8
                                    }}
                                >
                                    가격
                                </th>


                                <th
                                    style={{
                                        border:
                                            "1px solid #ddd",
                                        padding: 8
                                    }}
                                >
                                    재고
                                </th>

                            </tr>

                            </thead>


                            <tbody>

                            {results.map(
                                prod => (

                                    <tr
                                        key={
                                            prod.productId
                                        }
                                    >

                                        {/* 선택 */}

                                        <td
                                            style={{
                                                border:
                                                    "1px solid #ddd",
                                                padding: 8,
                                                textAlign:
                                                    "center"
                                            }}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    selected.some(
                                                        p =>
                                                            p.productId ===
                                                            prod.productId
                                                    )
                                                }
                                                onChange={() =>
                                                    toggleSelect(
                                                        prod
                                                    )
                                                }
                                            />

                                        </td>


                                        {/* 상품코드 */}

                                        <td
                                            style={{
                                                border:
                                                    "1px solid #ddd",
                                                padding: 8
                                            }}
                                        >
                                            {
                                                prod.productId
                                            }
                                        </td>


                                        {/* 상품명 */}

                                        <td
                                            style={{
                                                border:
                                                    "1px solid #ddd",
                                                padding: 8
                                            }}
                                        >
                                            {
                                                prod.productName
                                            }
                                        </td>


                                        {/* 가격 */}

                                        <td
                                            style={{
                                                border:
                                                    "1px solid #ddd",
                                                padding: 8
                                            }}
                                        >
                                            {
                                                prod.price
                                            }
                                        </td>


                                        {/* 재고 */}

                                        <td
                                            style={{
                                                border:
                                                    "1px solid #ddd",
                                                padding: 8
                                            }}
                                        >
                                            {
                                                prod.stock
                                            }
                                        </td>

                                    </tr>
                                )
                            )}

                            </tbody>

                        </table>


                        {/* ====================================
                            페이지네이션
                        ==================================== */}

                        <div
                            style={{
                                marginTop: 15,
                                display: "flex",
                                justifyContent:
                                    "center",
                                alignItems:
                                    "center",
                                gap: 10
                            }}
                        >

                            {/* 이전 */}

                            <button
                                onClick={
                                    query.trim()
                                        ? handleSearchPrevious
                                        : handleAllPrevious
                                }
                                disabled={
                                    page === 0
                                }
                            >
                                이전
                            </button>


                            {/* 페이지 표시 */}

                            <span>

                                {query.trim()
                                    ? `${page + 1} 페이지`
                                    : `${page + 1} / ${totalPages}`}

                            </span>


                            {/* 다음 */}

                            <button
                                onClick={
                                    query.trim()
                                        ? handleSearchNext
                                        : handleAllNext
                                }
                                disabled={
                                    query.trim()
                                        ? (
                                            !hasNext ||
                                            nextCursor === null
                                        )
                                        : (
                                            page >=
                                            totalPages - 1
                                        )
                                }
                            >
                                다음
                            </button>

                        </div>

                    </>

                )}


                {/* ====================================
                    적용
                ==================================== */}

                <div
                    style={{
                        marginTop: 15,
                        textAlign: "right"
                    }}
                >

                    <button
                        onClick={
                            handleApply
                        }
                        style={{
                            padding:
                                "6px 12px",
                            background:
                                "#52c41a",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            cursor:
                                "pointer"
                        }}
                    >
                        적용
                    </button>

                </div>

            </div>

        </div>
    );


    return ReactDOM.createPortal(
        modalContent,
        document.body
    );
}