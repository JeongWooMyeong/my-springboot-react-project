import axios from "../util/axios";


/**
 * 전체 분류 트리 조회
 */
export const getCategoryTree = async () => {

    const res =
        await axios.get(
            "/api/sytm1000"
        );

    return res.data;

};


/**
 * 분류별 템플릿 목록 조회
 */
export const getTemplatesByCategory = async (
    clcd
) => {

    const res =
        await axios.get(
            `/api/sytm2010/category/${clcd}`
        );

    return res.data;

};


/**
 * 템플릿 삭제
 */
export const deleteTemplate = async (
    id,
    clcd
) => {

    const res =
        await axios.delete(
            `/api/sytm2000/${id}/${clcd}`
        );

    return res.data;

};