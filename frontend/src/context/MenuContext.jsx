import { createContext, useContext, useState, useEffect } from "react";
import axios from "../util/axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState([]);
    const [routesFromDB, setRoutesFromDB] = useState([]);

    const fetchMenus = (useYn = "Y") => {
        axios.get("/api/sysm1000/menus", { params: { useYn } })
            .then(res => {
                setMenus(res.data);        // ✅ menus 갱신
                setRoutesFromDB(res.data); // 필요하다면 routesFromDB도 같이 갱신
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    return (
        <MenuContext.Provider value={{ menus, routesFromDB, fetchMenus }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
