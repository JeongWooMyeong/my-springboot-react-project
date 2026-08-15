export default function ProductSearchInput({
                                               query,
                                               onChange,
                                               onSearch,
                                               onClose
                                           }) {

    return (
        <div className="product-search-input">

            <input
                value={query}
                onChange={e =>
                    onChange(e.target.value)
                }
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                placeholder="상품명 입력"
            />

            <button
                type="button"
                className="search-button"
                onClick={onSearch}
            >
                검색
            </button>

            <button
                type="button"
                className="close-button"
                onClick={onClose}
            >
                닫기
            </button>

        </div>
    );
}