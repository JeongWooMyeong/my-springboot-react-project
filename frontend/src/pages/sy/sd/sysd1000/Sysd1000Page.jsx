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

import '../../../../css/pages/sy/sysd1000/sysd1000-page.css';


const SySd1000Page = () => {

    const [products, setProducts] = useState([]);

    // 검색 조건
    const [keyword, setKeyword] = useState('');
    const [field, setField] = useState('productName');


    // 페이지네이션
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);


    // 상품 Form
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] =
        useState(null);


    // =========================================================
    // 전체 상품 조회
    // Oracle
    // =========================================================

    const loadProducts = async (
        pageNumber = 0
    ) => {

        try {

            const response =
                await getProducts(
                    pageNumber,
                    size
                );


            setProducts(
                response.content ?? []
            );

            setPage(
                response.page ?? pageNumber
            );

            setTotalPages(
                response.totalPages ?? 0
            );

            setTotalElements(
                response.totalElements ?? 0
            );

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
    // 상품 검색
    // Redis Cache → Elasticsearch
    // =========================================================

    const loadSearchProducts = async (
        searchField,
        searchKeyword,
        pageNumber = 0
    ) => {

        try {

            const response =
                await searchProducts(
                    searchField,
                    searchKeyword,
                    pageNumber,
                    size
                );


            console.log(
                '상품 검색 응답:',
                response
            );


            setProducts(
                response.content ?? []
            );

            setPage(
                response.page ?? pageNumber
            );

            setTotalPages(
                response.totalPages ?? 0
            );

            setTotalElements(
                response.totalCount ?? 0
            );

        } catch (error) {

            console.error(
                '상품 검색 실패:',
                error
            );

            alert(
                '상품 검색에 실패했습니다.'
            );
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

    const handleSearch = async (
        searchField,
        searchKeyword
    ) => {

        const trimmedKeyword =
            searchKeyword.trim();


        setField(
            searchField
        );

        setKeyword(
            trimmedKeyword
        );

        setPage(0);


        // 검색어가 없으면 전체 조회
        if (!trimmedKeyword) {

            await loadProducts(0);

            return;
        }


        // 검색어가 있으면
        // Redis → Elasticsearch
        await loadSearchProducts(
            searchField,
            trimmedKeyword,
            0
        );
    };


    // =========================================================
    // 검색 필드 변경
    // =========================================================

    const handleFieldChange = (
        newField
    ) => {

        setField(
            newField
        );

        setPage(0);
    };


    // =========================================================
    // 페이지 변경
    // =========================================================

    const handlePageChange = async (
        pageNumber
    ) => {

        if (pageNumber < 0) {
            return;
        }


        if (
            pageNumber >= totalPages
        ) {
            return;
        }


        // 검색 중
        if (keyword.trim()) {

            await loadSearchProducts(
                field,
                keyword,
                pageNumber
            );

            return;
        }


        // 전체 조회
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

        setSelectedProduct(
            product
        );

        setIsFormOpen(true);
    };


    // =========================================================
    // 상품 삭제
    // =========================================================

    const handleDelete = async (
        productId
    ) => {

        if (
            !window.confirm(
                '상품을 삭제하시겠습니까?'
            )
        ) {
            return;
        }


        try {

            await deleteProduct(
                productId
            );

            alert(
                '상품이 삭제되었습니다.'
            );


            // 검색 중
            if (keyword.trim()) {

                await loadSearchProducts(
                    field,
                    keyword,
                    page
                );

                return;
            }


            // 전체 조회
            await loadProducts(
                page
            );

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

    const handleFormSubmit = async (
        product
    ) => {

        try {

            if (selectedProduct) {

                await updateProduct(
                    selectedProduct.productId,
                    product
                );

                alert(
                    '상품이 수정되었습니다.'
                );

            } else {

                await createProduct(
                    product
                );

                alert(
                    '상품이 등록되었습니다.'
                );
            }


            // Form 닫기
            setIsFormOpen(false);
            setSelectedProduct(null);


            // 저장 후 현재 조건으로 재조회
            if (keyword.trim()) {

                await loadSearchProducts(
                    field,
                    keyword,
                    page
                );

            } else {

                await loadProducts(
                    page
                );
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


            {/* =================================================
                Header
            ================================================= */}

            <header className="page-header">

                <div>

                    <h1>
                        PRODUCT
                    </h1>

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


            {/* =================================================
                Search
            ================================================= */}

            <section className="search-section">

                <ProductSearch
                    keyword={keyword}
                    field={field}
                    onFieldChange={
                        handleFieldChange
                    }
                    onSearch={
                        handleSearch
                    }
                />

            </section>


            {/* =================================================
                Table
            ================================================= */}

            <section className="product-section">

                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    totalElements={
                        totalElements
                    }
                />

            </section>


            {/* =================================================
                Pagination
            ================================================= */}

            <ProductPagination
                page={page}
                totalPages={totalPages}
                onPageChange={
                    handlePageChange
                }
            />


            {/* =================================================
                Form
            ================================================= */}

            {isFormOpen && (

                <ProductForm
                    product={
                        selectedProduct
                    }

                    onSubmit={
                        handleFormSubmit
                    }

                    onClose={() => {

                        setIsFormOpen(false);

                        setSelectedProduct(
                            null
                        );
                    }}
                />

            )}

        </div>
    );
};


export default SySd1000Page;
