export default function ProductPagination({
                                              isSearch,
                                              page,
                                              totalPages,
                                              hasNext,
                                              nextCursor,
                                              onPrevious,
                                              onNext
                                          }) {

    const canPrevious =
        page > 0;

    const canNext =
        isSearch
            ? hasNext && nextCursor !== null
            : page < totalPages - 1;


    return (
        <div
            style={{
                marginTop: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10
            }}
        >

            <button
                onClick={onPrevious}
                disabled={!canPrevious}
            >
                이전
            </button>

            <span>
                {isSearch
                    ? `${page + 1} 페이지`
                    : `${page + 1} / ${totalPages}`}
            </span>

            <button
                onClick={onNext}
                disabled={!canNext}
            >
                다음
            </button>

        </div>
    );
}