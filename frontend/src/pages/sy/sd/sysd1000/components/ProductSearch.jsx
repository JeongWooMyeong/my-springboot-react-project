import { useEffect, useState } from 'react';

const ProductSearch = ({ keyword, onSearch }) => {
    const [inputValue, setInputValue] = useState(keyword);

    // 외부 keyword가 변경되면 input도 동기화
    useEffect(() => {
        setInputValue(keyword);
    }, [keyword]);

    // 검색 실행
    const handleSearch = () => {
        onSearch(inputValue.trim());
    };

    // Enter 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="product-search">
            <div className="product-search__field">

                <input
                    type="text"
                    value={inputValue}
                    placeholder="상품명을 입력하세요"
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    onClick={handleSearch}
                >
                    검색
                </button>

            </div>
        </div>
    );
};

export default ProductSearch;