import ReactDOM from "react-dom";

import useProductSearch
    from "./hook/useProductSearch";

import ProductSearchInput
    from "./ProductSearchInput";

import ProductTable
    from "./ProductTable";

import ProductPagination
    from "./ProductPagination";

import "../../../../../css/product/ProductSearchModal.css";


export default function ProductSearchModal({
                                               onSelect,
                                               onClose
                                           }) {

    const {
        query,
        setQuery,

        // 검색 대상
        field,
        setField,

        results,
        selected,

        page,
        totalPages,

        allSelected,

        search,
        previous,
        next,

        toggleSelect,
        toggleSelectAll
    } = useProductSearch();


    const handleApply = () => {

        if (selected.length === 0) {

            alert(
                "선택된 상품이 없습니다."
            );

            return;
        }

        onSelect(selected);
        onClose();
    };


    const modalContent = (

        <div
            className="product-search-modal-overlay"
            onClick={onClose}
        >

            <div
                className="product-search-modal"
                onClick={e =>
                    e.stopPropagation()
                }
            >

                <h3>
                    상품 검색
                </h3>


                <ProductSearchInput
                    query={query}
                    field={field}
                    onFieldChange={setField}
                    onChange={setQuery}
                    onSearch={search}
                    onClose={onClose}
                />


                {results.length === 0 ? (

                    <div>
                        검색 결과가 없습니다.
                    </div>

                ) : (

                    <>

                        <ProductTable
                            results={results}
                            selected={selected}
                            allSelected={allSelected}
                            onToggleSelect={toggleSelect}
                            onToggleSelectAll={
                                toggleSelectAll
                            }
                        />


                        <ProductPagination
                            page={page}
                            totalPages={totalPages}
                            onPrevious={previous}
                            onNext={next}
                        />

                    </>

                )}


                <div>
                    <button
                        onClick={handleApply}
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
