import axios from "axios";

//전체 상품 조회
export async function getProducts(query) {
    const res = await axios.get(`/api/ext/products?query=${query}`);
    return res.data;
}

export async function getProduct(id) {
    const res = await axios.get(`/api/ext/products/${id}`);
    return res.data;
}

export async function getProductByName(name) {
    const res = await axios.get(`/api/ext/products/name/${name}`);
    return res.data;
}


// 상품 추가
export async function addProduct(product) {
    try {
        const res = await axios.post("/api/ext/products", product);
        return res.data;
    } catch (err) {
        console.error("상품 추가 실패:", err);
        throw err;
    }
}

// 상품 수정
export async function updateProduct(id, product) {
    try {
        const res = await axios.put(`/api/ext/products/${id}`, product);
        return res.data;
    } catch (err) {
        console.error("상품 수정 실패:", err);
        throw err;
    }
}

// 상품 삭제
export async function deleteProduct(id) {
    try {
        const res = await axios.delete(`/api/ext/products/${id}`);
        return res.data;
    } catch (err) {
        console.error("상품 삭제 실패:", err);
        throw err;
    }
}
