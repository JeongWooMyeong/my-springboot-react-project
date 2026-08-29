import axios from "../util/axios";

const PRODUCT_API_URL = '/api/ext/products';
const PRODUCT_SEARCH_API_URL = '/api/products/search';


/**
 * 전체 상품 조회
 * Oracle
 */
export const getProducts = async (
    page = 0,
    size = 10
) => {

    const response = await axios.get(
        PRODUCT_API_URL,
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
};


/**
 * 상품 검색
 *
 * Redis Cache → Elasticsearch
 *
 * field:
 * - productName
 * - productCode
 *
 * keyword:
 * - 검색어
 *
 * page:
 * - 페이지 번호
 */
export const searchProducts = async (
    field,
    keyword,
    page = 0,
    size = 10
) => {

    const response = await axios.get(
        PRODUCT_SEARCH_API_URL,
        {
            params: {
                field,
                keyword,
                page,
                size,
            },
        }
    );

    return response.data;
};


/**
 * 상품 상세 조회
 */
export const getProduct = async (
    productId
) => {

    const response = await axios.get(
        `${PRODUCT_API_URL}/${productId}`
    );

    return response.data;
};


/**
 * 상품명으로 상품 조회
 */
export const getProductByName = async (
    name
) => {

    const response = await axios.get(
        `${PRODUCT_API_URL}/name/${encodeURIComponent(name)}`
    );

    return response.data;
};


/**
 * 상품 등록
 */
export const createProduct = async (
    product
) => {

    await axios.post(
        PRODUCT_API_URL,
        product
    );
};


/**
 * 상품 수정
 */
export const updateProduct = async (
    productId,
    product
) => {

    await axios.put(
        `${PRODUCT_API_URL}/${productId}`,
        product
    );
};


/**
 * 상품 삭제
 */
export const deleteProduct = async (
    productId
) => {

    await axios.delete(
        `${PRODUCT_API_URL}/${productId}`
    );
};
