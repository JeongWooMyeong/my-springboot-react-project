import axios from "axios";


// 사용자 목록 조회
export async function getUsers(filters = {}) {
    const res = await axios.get("/api/users", {
        params: filters
    });

    return res.data;
}


// 사용자 등록
export async function createUser(data) {
    const res = await axios.post("/api/users", data);

    return res.data;
}


// 사용자 수정
export async function updateUser(userid, data) {
    const res = await axios.put(
        `/api/users/${userid}`,
        data
    );

    return res.data;
}


// 사용자 삭제
export async function deleteUsers(userids) {
    const res = await axios.delete(
        "/api/users",
        {
            data: userids
        }
    );

    return res.data;
}


// User ID 중복 확인
export async function checkUserId(userid) {
    const res = await axios.get(
        `/api/users/check/${userid}`
    );

    return res.data;
}


// 전체 Role 조회
export async function getRoles() {
    const res = await axios.get(
        "/api/users/roles"
    );

    return res.data;
}


// 사용자 Role 조회
export async function getUserRoles(userid) {
    const res = await axios.get(
        `/api/users/${userid}/roles`
    );

    return res.data;
}


// 사용자 Role 저장
export async function saveUserRoles(userid, rolenos) {

    const res = await axios.post(
        "/api/users/roles",
        {
            userid,
            rolenos
        }
    );

    return res.data;
}