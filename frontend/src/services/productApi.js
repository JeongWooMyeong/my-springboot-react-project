import axios from "../util/axios";


// 상품 검색
// Redis Cache → Elasticsearch
export async function searchProducts(
    field = "all",
    keyword = "",
    page = 0,
    size = 50
) {

    const url =
        `/api/products/search` +
        `?field=${encodeURIComponent(field)}` +
        `&keyword=${encodeURIComponent(keyword)}` +
        `&page=${page}` +
        `&size=${size}`;

    const res = await axios.get(url);

    return res.data;
}


// 상품 단건 조회
export async function getProduct(id) {

    const res = await axios.get(
        `/api/products/${id}`
    );

    return res.data;
}


// 상품 추가
export async function addProduct(product) {

    try {

        const res = await axios.post(
            "/api/products",
            product
        );

        return res.data;

    } catch (err) {

        console.error(
            "상품 추가 실패:",
            err
        );

        throw err;
    }
}


// 상품 수정
export async function updateProduct(
    id,
    product
) {

    try {

        const res = await axios.put(
            `/api/products/${id}`,
            product
        );

        return res.data;

    } catch (err) {

        console.error(
            "상품 수정 실패:",
            err
        );

        throw err;
    }
}


// 상품 삭제
export async function deleteProduct(id) {

    try {

        const res = await axios.delete(
            `/api/products/${id}`
        );

        return res.data;

    } catch (err) {

        console.error(
            "상품 삭제 실패:",
            err
        );

        throw err;
    }
}
