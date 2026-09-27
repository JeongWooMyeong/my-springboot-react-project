import axios from "../util/axios";

export const getMenus = async () => {
    const res = await axios.get("/api/sysm1000/menus");
    return res.data;
};

export const getMenu = async (menuCd) => {
    const res = await axios.get(`/api/sysm1000/menus/${menuCd}`);
    return res.data;
};

export const createMenu = async (data) => {
    const res = await axios.post(
        "/api/sysm1000/menus",
        data
    );
    return res.data;
};

export const updateMenu = async (menuCd, data) => {
    const res = await axios.put(
        `/api/sysm1000/menus/${menuCd}`,
        data
    );
    return res.data;
};

export const deleteMenu = async (menuCd) => {
    await axios.delete(
        `/api/sysm1000/menus/${menuCd}`
    );
};

// 메뉴 코드 중복확인
export const checkMenuCdDuplicate = async (menuCd) => {
    const res = await axios.get(
        `/api/sysm1000/menus/${menuCd}`
    );

    return res.data;
};