export default function ProductSearchInput({
                                               query,
                                               onChange,
                                               onSearch,
                                               onClose
                                           }) {

    return (
        <div
            style={{
                marginBottom: 10,
                display: "flex",
                alignItems: "center"
            }}
        >

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

            <button onClick={onSearch}>
                검색
            </button>

            <button onClick={onClose}>
                닫기
            </button>

        </div>
    );
}