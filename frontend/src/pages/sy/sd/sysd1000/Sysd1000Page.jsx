import { useEffect, useState } from 'react';

import ProductSearch from './components/ProductSearch';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import ProductPagination from './components/ProductPagination';

import {
    getProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../../../services/sysd1000Api.js';

import '../../../../css/sysd1000/Sysd1000Page.css';

const SySd1000Page = () => {
    const [products, setProducts] = useState([]);

    const [keyword, setKeyword] = useState('');

    // Oracle 페이지네이션
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // ES cursor 페이지네이션
    const [cursor, setCursor] = useState(null);
    const [cursorHistory, setCursorHistory] = useState([]);
    const [hasNext, setHasNext] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    // =========================================================
    // 전체 상품 조회
    // 검색어 없음 → Oracle
    // =========================================================

    const loadProducts = async (pageNumber = 0) => {
        try {
            const response = await getProducts(
                pageNumber,
                size
            );

            //console.log('상품 전체 조회 응답:', response);

            setProducts(response.content ?? []);

            setTotalPages(
                response.totalPages ?? 0
            );

            setTotalElements(
                response.totalElements ?? 0
            );

            setPage(pageNumber);

        } catch (error) {
            console.error(
                '상품 목록 조회 실패:',
                error
            );

            alert(
                '상품 목록을 불러오지 못했습니다.'
            );
        }
    };


    // =========================================================
    // ES 상품 검색
    // =========================================================

    const loadSearchProducts = async (
        searchKeyword,
        searchCursor = null
    ) => {
        try {
            const response = await searchProducts(
                searchKeyword,
                size,
                searchCursor
            );

            console.log('ES 검색 응답:', response);

            setProducts(response.content ?? []);

            setCursor(response.nextCursor ?? null);
            setHasNext(response.hasNext ?? false);

            setTotalPages(response.totalPages ?? 0);
            setTotalElements(response.content?.length ?? 0);

        } catch (error) {
            console.error('상품 검색 실패:', error);
            alert('상품 검색에 실패했습니다.');
        }
    };


    // =========================================================
    // 최초 조회
    // =========================================================

    useEffect(() => {
        loadProducts(0);
    }, []);


    // =========================================================
    // 검색
    // =========================================================

    const handleSearch = async (value) => {
        const searchKeyword = value.trim();

        setKeyword(searchKeyword);

        // 검색어 없음
        // → Oracle 전체 조회
        if (!searchKeyword) {
            setPage(0);

            setCursor(null);
            setCursorHistory([]);
            setHasNext(false);

            await loadProducts(0);

            return;
        }

        // 검색어 있음
        // → Elasticsearch 검색
        setPage(0);

        setCursor(null);
        setCursorHistory([]);

        await loadSearchProducts(
            searchKeyword,
            null
        );
    };


    // =========================================================
    // 페이지 변경
    // =========================================================

    const handlePageChange = async (pageNumber) => {

        // 검색어가 있으면
        // ES cursor pagination
        if (keyword.trim()) {

            // 다음 페이지
            if (pageNumber > page) {

                if (!cursor) {
                    return;
                }

                // 현재 페이지의 cursor를 저장
                setCursorHistory((prev) => [
                    ...prev,
                    cursor,
                ]);

                await loadSearchProducts(
                    keyword,
                    cursor
                );

                setPage(pageNumber);

                return;
            }

            // 이전 페이지
            if (pageNumber < page) {

                const previousCursor =
                    pageNumber === 0
                        ? null
                        : cursorHistory[pageNumber - 1];

                const newHistory =
                    cursorHistory.slice(
                        0,
                        pageNumber
                    );

                setCursorHistory(newHistory);

                await loadSearchProducts(
                    keyword,
                    previousCursor
                );

                setPage(pageNumber);

                return;
            }

            return;
        }


        // 검색어가 없으면
        // Oracle 일반 pagination
        setPage(pageNumber);

        await loadProducts(
            pageNumber
        );
    };


    // =========================================================
    // 상품 등록
    // =========================================================

    const handleCreate = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };


    // =========================================================
    // 상품 수정
    // =========================================================

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };


    // =========================================================
    // 상품 삭제
    // =========================================================

    const handleDelete = async (productId) => {

        if (
            !window.confirm(
                '상품을 삭제하시겠습니까?'
            )
        ) {
            return;
        }

        try {
            await deleteProduct(productId);

            alert('상품이 삭제되었습니다.');

            // 검색 중이면 ES 재검색
            if (keyword.trim()) {

                setCursor(null);
                setCursorHistory([]);
                setPage(0);

                await loadSearchProducts(
                    keyword,
                    null
                );

            } else {

                // 전체 조회 중이면
                // 현재 페이지 재조회
                await loadProducts(page);
            }

        } catch (error) {
            console.error(
                '상품 삭제 실패:',
                error
            );

            alert(
                '상품 삭제에 실패했습니다.'
            );
        }
    };


    // =========================================================
    // 상품 등록 / 수정
    // =========================================================

    const handleFormSubmit = async (product) => {

        try {

            if (selectedProduct) {

                // 수정
                await updateProduct(
                    selectedProduct.productId,
                    product
                );

                alert(
                    '상품이 수정되었습니다.'
                );

            } else {

                // 등록
                await createProduct(product);

                alert(
                    '상품이 등록되었습니다.'
                );
            }


            // Form 닫기
            setIsFormOpen(false);
            setSelectedProduct(null);


            // =================================================
            // 저장 후 재조회
            // =================================================

            if (keyword.trim()) {

                // ES 검색 중
                setCursor(null);
                setCursorHistory([]);
                setPage(0);

                await loadSearchProducts(
                    keyword,
                    null
                );

            } else {

                // 전체 조회 중
                await loadProducts(page);
            }

        } catch (error) {

            console.error(
                '상품 저장 실패:',
                error
            );

            alert(
                '상품 저장에 실패했습니다.'
            );
        }
    };


    return (
        <div className="sy-sd-1000-page">

            {/* Header */}
            <header className="page-header">

                <div>
                    <h1>PRODUCT</h1>

                    <p>
                        상품 정보를 관리합니다.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={handleCreate}
                >
                    + 상품 등록
                </button>

            </header>


            {/* Search */}
            <section className="search-section">

                <ProductSearch
                    keyword={keyword}
                    onSearch={handleSearch}
                />

            </section>


            {/* Table */}
            <section className="product-section">

                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    totalElements={totalElements}
                />

            </section>


            {/* Pagination */}
            <ProductPagination
                page={page}
                totalPages={
                    keyword.trim()
                        ? null
                        : totalPages
                }
                hasNext={
                    keyword.trim()
                        ? hasNext
                        : null
                }
                onPageChange={
                    handlePageChange
                }
            />


            {/* Form */}
            {isFormOpen && (

                <ProductForm
                    product={selectedProduct}

                    onSubmit={
                        handleFormSubmit
                    }

                    onClose={() => {
                        setIsFormOpen(false);
                        setSelectedProduct(null);
                    }}
                />

            )}

        </div>
    );
};

export default SySd1000Page;