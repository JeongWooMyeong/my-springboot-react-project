const ProductPagination = ({
                               page,
                               totalPages,
                               onPageChange,
                           }) => {
    if (totalPages <= 1) {
        return null;
    }

    const pageGroupSize = 5;

    const currentGroup = Math.floor(
        page / pageGroupSize
    );

    const startPage = currentGroup * pageGroupSize;

    const endPage = Math.min(
        startPage + pageGroupSize,
        totalPages
    );

    const pages = [];

    for (let i = startPage; i < endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="product-pagination">

            {/* 처음 */}
            <button
                type="button"
                disabled={page === 0}
                onClick={() => onPageChange(0)}
            >
                «
            </button>

            {/* 이전 */}
            <button
                type="button"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                ‹
            </button>

            {/* 페이지 번호 */}
            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    type="button"
                    className={
                        page === pageNumber
                            ? 'active'
                            : ''
                    }
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber + 1}
                </button>
            ))}

            {/* 다음 */}
            <button
                type="button"
                disabled={page === totalPages - 1}
                onClick={() => onPageChange(page + 1)}
            >
                ›
            </button>

            {/* 마지막 */}
            <button
                type="button"
                disabled={page === totalPages - 1}
                onClick={() => onPageChange(totalPages - 1)}
            >
                »
            </button>

        </div>
    );
};

export default ProductPagination;