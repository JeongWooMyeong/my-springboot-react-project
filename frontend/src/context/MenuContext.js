import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [routesFromDB, setRoutesFromDB] = useState([]);

    const fetchMenus = () => {
        axios.get("/api/sysm1000/menus", { params: { useYn: "Y" } })
            .then(res => setRoutesFromDB(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMenus(); // 최초 실행
    }, []);

    return (
        <MenuContext.Provider value={{ routesFromDB, fetchMenus }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
