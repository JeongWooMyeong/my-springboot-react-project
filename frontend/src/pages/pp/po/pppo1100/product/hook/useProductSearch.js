import { useState } from "react";

import {
    searchProducts
} from "../../../../../../services/productApi";

export default function useProductSearch() {

    const [query, setQuery] = useState("");

    // 검색 대상
    // all / productName / productCode
    const [field, setField] = useState("productCode");

    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);

    const [page, setPage] = useState(0);
    const [size] = useState(50);

    const [totalPages, setTotalPages] = useState(0);


    // 상품 검색
    // Redis Cache → Elasticsearch
    const loadProducts = async (
        targetPage = 0
    ) => {

        const data = await searchProducts(
            field,
            query.trim(),
            targetPage,
            size
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

        setSelected([]);
    };


    // 검색
    const search = async () => {

        setPage(0);
        setSelected([]);

        await loadProducts(0);
    };


    // 검색 대상 변경
    const changeField = (newField) => {

        setField(newField);

        setPage(0);
        setSelected([]);
    };


    // 이전
    const previous = async () => {

        if (page <= 0) {
            return;
        }

        await loadProducts(
            page - 1
        );
    };


    // 다음
    const next = async () => {

        if (page >= totalPages - 1) {
            return;
        }

        await loadProducts(
            page + 1
        );
    };


    // 상품 선택 / 선택 해제
    const toggleSelect = (product) => {

        setSelected(prev => {

            const exists =
                prev.some(
                    p =>
                        p.productId ===
                        product.productId
                );

            if (exists) {

                return prev.filter(
                    p =>
                        p.productId !==
                        product.productId
                );
            }

            return [
                ...prev,
                product
            ];
        });
    };


    // 현재 페이지 전체 선택
    const toggleSelectAll = () => {

        const allSelected =
            results.length > 0 &&
            results.every(product =>
                selected.some(
                    p =>
                        p.productId ===
                        product.productId
                )
            );

        if (allSelected) {

            setSelected(prev =>
                prev.filter(
                    selectedProduct =>
                        !results.some(
                            result =>
                                result.productId ===
                                selectedProduct.productId
                        )
                )
            );

        } else {

            setSelected(prev => {

                const newProducts =
                    results.filter(
                        result =>
                            !prev.some(
                                selectedProduct =>
                                    selectedProduct.productId ===
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


    const allSelected =
        results.length > 0 &&
        results.every(product =>
            selected.some(
                p =>
                    p.productId ===
                    product.productId
            )
        );


    return {
        query,
        setQuery,

        field,
        setField: changeField,

        results,
        selected,

        page,
        size,
        totalPages,

        allSelected,

        search,
        previous,
        next,

        toggleSelect,
        toggleSelectAll
    };
}
