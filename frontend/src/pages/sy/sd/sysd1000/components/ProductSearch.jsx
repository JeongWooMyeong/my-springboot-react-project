import { useEffect, useState } from 'react';


const ProductSearch = ({
                           keyword,
                           field,
                           onFieldChange,
                           onSearch
                       }) => {

    const [inputValue, setInputValue] =
        useState(keyword);


    // 외부 keyword 변경 시 input 동기화
    useEffect(() => {

        setInputValue(keyword);

    }, [keyword]);


    // 검색 실행
    const handleSearch = () => {

        onSearch(
            field,
            inputValue.trim()
        );
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

                {/* 검색 대상 */}
                <select
                    value={field}
                    onChange={(e) =>
                        onFieldChange(
                            e.target.value
                        )
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
                    type="text"
                    value={inputValue}
                    placeholder={
                        field === 'productCode'
                            ? '상품코드를 입력하세요'
                            : '상품명을 입력하세요'
                    }
                    onChange={(e) => {
                        setInputValue(
                            e.target.value
                        );
                    }}
                    onKeyDown={handleKeyDown}
                />


                {/* 검색 */}
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
