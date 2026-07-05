import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../css/layout.css";
import { useMenu } from "../context/MenuContext";

function Menu({ userinfo }) {
    const { menus } = useMenu();  // ✅ menus가 undefined일 경우 빈 배열로 처리
    const navigate = useNavigate();

    const goPage = (path) => {
        navigate(`${path}?t=${Date.now()}`);
    };

    const fnLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const hasMenu = (menuCd) => {
        if (!userinfo?.roles) return false;
        return userinfo.roles.some(role =>
            role.permissions?.some(p => p.menucd === menuCd && p.qryrole === "T")
        );
    };

    const renderMenu = (parentCd) => {
        return Array.isArray(menus) && menus
            .filter(menu => menu.menuPrntCd === parentCd && hasMenu(menu.menuCd))
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
                {Array.isArray(menus) && menus
                    .filter(menu => menu.menuPrntCd === "0" && hasMenu(menu.menuCd))
                    .map(menu => (
                        <li key={menu.menuCd} className="menu-item">
                            <button type="button" className="menu-button" onClick={() => goPage(menu.dedName)}>
                                {menu.menuName}
                            </button>
                            <ul className="submenu">{renderMenu(menu.menuCd)}</ul>
                        </li>
                    ))}
            </ul>
            <div className="logout-area">
                <button className="logout-button" onClick={fnLogout}>
                    로그아웃
                </button>
            </div>
        </nav>
    );
}

export default Menu;
