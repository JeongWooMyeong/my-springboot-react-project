export default function ProductSearchInput({
                                               query,
                                               field,
                                               onFieldChange,
                                               onChange,
                                               onSearch,
                                               onClose
                                           }) {

    return (
        <div className="product-search-input">

            {/* 검색 대상 */}
            <select
                value={field}
                onChange={e =>
                    onFieldChange(e.target.value)
                }
            >
                <option value="productName">
                    상품명
                </option>

                <option value="productCode">
                    상품코드
                </option>
            </select>


            {/* 검색어 */}
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
                placeholder={
                    field === "productCode"
                        ? "상품코드 입력"
                        : field === "productName"
                            ? "상품명 입력"
                            : "상품명 또는 상품코드 입력"
                }
            />


            {/* 검색 */}
            <button
                type="button"
                className="search-button"
                onClick={onSearch}
            >
                검색
            </button>


            {/* 닫기 */}
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
