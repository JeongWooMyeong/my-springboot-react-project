import axios from "../util/axios";

// Role 목록 조회
export const getRoles = async () => {

    const res = await axios.get(
        "/api/sysm2000/roles"
    );

    return res.data;
};



// Role 등록
export const createRole = async (data) => {

    const res = await axios.post(
        "/api/sysm2000/roles",
        data
    );

    return res.data;
};



// Role 수정
export const updateRole = async (roleno, data) => {

    const res = await axios.put(
        `/api/sysm2000/roles/${roleno}`,
        data
    );

    return res.data;
};



// Role 삭제
export const deleteRole = async (roleno) => {

    return axios.delete(
        `/api/sysm2000/roles/${roleno}`
    );

};



// Role 권한 조회
export const getPermissions = async (
    roleno,
    menuCds
) => {

    const res = await axios.get(
        `/api/sysm2000/roles/${roleno}/permissions`,
        {
            params: {
                menuCds
            }
        }
    );

    return res.data;
};



// Role 권한 저장
export const savePermissions = async (
    data
) => {

    const res = await axios.post(
        "/api/sysm2000/roles/savePermissions",
        data
    );

    return res.data;
};

// Role No 중복확인
export const checkRoleNoDuplicate = async (roleno) => {
    const res = await axios.get(`/api/sysm2000/roles/${roleno}`);
    return res.data;
};