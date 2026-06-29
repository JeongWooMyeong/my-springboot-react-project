import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [routesFromDB, setRoutesFromDB] = useState([]);

    // ✅ useYn을 인자로 받아서 동적으로 처리
    const fetchMenus = (useYn = "Y") => {
        axios.get("/api/sysm1000/menus", { params: { useYn } })
            .then(res => setRoutesFromDB(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMenus(); // 최초 실행 시 기본값 "Y"
    }, []);

    return (
        <MenuContext.Provider value={{ routesFromDB, fetchMenus }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
