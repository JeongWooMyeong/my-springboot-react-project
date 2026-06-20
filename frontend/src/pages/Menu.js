import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Menu() {
    const [menus, setMenus] = useState([]);

    const navigate = useNavigate();

    const goPage = (path) => {
        navigate(`${path}?t=${Date.now()}`);
    };

    useEffect(() => {
        axios.get("/api/sysm1000/menus", {
                params: {useYn : "Y"}
            }) // Sysm1000Controller에서 내려주는 API
            .then(res => setMenus(res.data))
            .catch(err => console.error(err));
    }, []);

    // 부모-자식 구조를 트리로 렌더링
    const renderMenu = (parentCd) => {
        return menus
            .filter(menu => menu.menuPrntCd === parentCd)
            .map(menu => (
                <li key={menu.menuCd}>
                    <Link to={menu.dedName}>{menu.menuName}</Link>
                    <ul>{renderMenu(menu.menuCd)}</ul>
                </li>
            ));
    };

    return (
        <nav className="main-menu">
            <ul className="menu-root">
                {menus
                    .filter(menu => menu.menuPrntCd === "0")
                    .map(menu => (
                        <li key={menu.menuCd} className="menu-item">
                            <button type="button" className="menu-button" onClick={()=> goPage(menu.dedName)}>
                                {menu.menuName}
                            </button>
                            <ul className="submenu">
                                {renderMenu(menu.menuCd)}
                            </ul>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

export default Menu;
