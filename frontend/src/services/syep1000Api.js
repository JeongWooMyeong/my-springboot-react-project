import axios from "axios";

// 고객사 목록 조회
export const getCompanies = async () => {
    const res = await axios.get("/api/company");
    return res.data;
};

// 고객사별 지점 조회
export const getJijums = async (coid) => {
    const res = await axios.get(`/api/jijum?coid=${coid}`);
    return res.data;
};

// 지점 상세 조회
export const getJijumDetail = async (jijumcd) => {
    const res = await axios.get(`/api/jijum/${jijumcd}`);
    return res.data;
};

// 지점 등록
export const createJijum = async (data) => {
    const res = await axios.post("/api/jijum", data);
    return res.data;
};

// 지점 수정
export const updateJijum = async (jijumcd, data) => {
    const res = await axios.put(`/api/jijum/${jijumcd}`, data);
    return res.data;
};

// 지점 삭제
export const deleteJijum = async (jijumcd, coid) => {
    const res = await axios.delete(`/api/jijum/${jijumcd}`, {
        params: { coid }
    });
    return res.data;
};