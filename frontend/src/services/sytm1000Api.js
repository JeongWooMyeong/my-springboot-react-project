import axios from "axios";


/**
 * 전체 분류 트리 조회
 */
export const getTreeData = async () => {

    const res =
        await axios.get("/api/sytm1000");

    return res.data;

};



/**
 * 지점별 활성화 분류 조회
 */
export const getActiveList = async (jijumcd) => {

    const res =
        await axios.get(
            `/api/sytm1000/active?jijumcd=${jijumcd}`
        );

    return res.data;

};



/**
 * 선택 지점 저장
 */
export const saveActivate = async (list) => {

    return axios.post(
        "/api/sytm1000/activate",
        list
    );

};



/**
 * 하위 포함 저장
 */
export const saveActivateChildren = async (list) => {

    return axios.post(
        "/api/sytm1000/activate/children",
        list
    );

};



/**
 * 분류 등록
 */
export const addClassification = async (data) => {

    return axios.post(
        "/api/sytm1000/add",
        data
    );

};



/**
 * 분류 수정
 */
export const updateClassification = async (data) => {

    return axios.put(
        "/api/sytm1000/update",
        data
    );

};



/**
 * 분류 삭제
 */
export const deleteClassification = async (clcds) => {

    return axios.delete(
        "/api/sytm1000/delete",
        {
            data:{
                clcds
            }
        }
    );

};