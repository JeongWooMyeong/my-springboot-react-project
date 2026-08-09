import { useState } from "react";

import {
    getProducts,
    getProductByName
} from "../../../../../../services/productApi";

export default function useProductSearch() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);

    const [page, setPage] = useState(0);
    const [size] = useState(50);

    const [totalPages, setTotalPages] = useState(0);

    const [nextCursor, setNextCursor] = useState(null);
    const [hasNext, setHasNext] = useState(false);

    const [cursorHistory, setCursorHistory] = useState([]);


    const loadAllProducts = async (targetPage = 0) => {

        const data = await getProducts(
            targetPage,
            size
        );

        setResults(data.content || []);
        setPage(data.page ?? targetPage);
        setTotalPages(data.totalPages ?? 0);

        setNextCursor(null);
        setHasNext(false);
        setCursorHistory([]);

        setSelected([]);
    };


    const loadSearchProducts = async (
        cursor = null,
        targetPage = 0
    ) => {

        const data = await getProductByName(
            query.trim(),
            size,
            cursor
        );

        console.log(data.totalPages);

        setResults(data.content || []);

        setPage(targetPage);

        setNextCursor(
            data.nextCursor ?? null
        );

        setHasNext(
            data.hasNext ?? false
        );

        setTotalPages(
            data.totalPages ?? 0
        );

        setSelected([]);
    };


    const search = async () => {

        setPage(0);
        setNextCursor(null);
        setHasNext(false);
        setCursorHistory([]);
        setSelected([]);

        if (query.trim()) {

            await loadSearchProducts(
                null,
                0
            );

        } else {

            await loadAllProducts(0);
        }
    };


    const previous = async () => {

        if (page <= 0) {
            return;
        }

        if (!query.trim()) {

            await loadAllProducts(
                page - 1
            );

            return;
        }

        const history = [
            ...cursorHistory
        ];

        history.pop();

        const previousCursor =
            history.length > 0
                ? history[history.length - 1]
                : null;

        setCursorHistory(history);

        await loadSearchProducts(
            previousCursor,
            page - 1
        );
    };


    const next = async () => {

        if (!query.trim()) {

            if (page >= totalPages - 1) {
                return;
            }

            await loadAllProducts(
                page + 1
            );

            return;
        }

        if (
            !hasNext ||
            nextCursor === null
        ) {
            return;
        }

        setCursorHistory(prev => [
            ...prev,
            nextCursor
        ]);

        await loadSearchProducts(
            nextCursor,
            page + 1
        );
    };


    const toggleSelect = (product) => {

        setSelected(prev => {

            const exists = prev.some(
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

        results,

        selected,

        page,
        size,

        totalPages,

        nextCursor,
        hasNext,

        allSelected,

        search,
        previous,
        next,

        toggleSelect,
        toggleSelectAll
    };
}