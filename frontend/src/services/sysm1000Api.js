export const getMenus = async () => {
    const res = await fetch("/api/sysm1000/menus");
    return res.json();
};

export const getMenu = async (menuCd) => {
    const res = await fetch(`/api/sysm1000/menus/${menuCd}`);
    return res.json();
};

export const createMenu = async (data) => {
    const res = await fetch("/api/sysm1000/menus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const updateMenu = async (menuCd, data) => {
    const res = await fetch(`/api/sysm1000/menus/${menuCd}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteMenu = async (menuCd) => {
    await fetch(`/api/sysm1000/menus/${menuCd}`, {
        method: "DELETE"
    });
};