import axios from "axios";

const BASE_URL = "/api/sybs1000";

/**
 * 공지사항 목록 조회
 */
export const selectSybs1000List = () => {
    return axios.get(`${BASE_URL}/list`);
};

/**
 * 공지사항 상세 조회
 */
export const selectSybs1000 = (notice_id) => {
    return axios.get(`${BASE_URL}/${notice_id}`);
};

/**
 * 공지사항 등록
 */
export const insertSybs1000 = (data) => {
    return axios.post(BASE_URL, data);
};

/**
 * 공지사항 수정
 */
export const updateSybs1000 = (data) => {
    return axios.put(BASE_URL, data);
};

/**
 * 공지사항 삭제
 */
export const deleteSybs1000 = (notice_id) => {
    return axios.delete(`${BASE_URL}/${notice_id}`);
};

/*
메인페이지 공지사항
 */

export const selectMainNoticeList = () => {
    return axios.get(`${BASE_URL}/mainList`);
};