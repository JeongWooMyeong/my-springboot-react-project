export default function ProductPagination({
                                              page,
                                              totalPages,
                                              onPrevious,
                                              onNext
                                          }) {

    const canPrevious =
        page > 0;

    const canNext =
        page < totalPages - 1;


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
                {`${page + 1} / ${totalPages}`}
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
