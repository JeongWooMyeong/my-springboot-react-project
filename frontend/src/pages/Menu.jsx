import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "../css/menu/menu.css";
import { useMenu } from "../context/MenuContext.jsx";
import { useTranslation } from "react-i18next";

function Menu({ userinfo }) {
    const { menus } = useMenu();
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    <Link to={menu.dedName}>{t(`menu.${menu.menuCd}`)}</Link>
                    <ul>{renderMenu(menu.menuCd)}</ul>
                </li>
            ));
    };

    return (
        <nav className="main-menu">
            <ul className="menu-root">

                {/* ✅ 메인 버튼 */}
                <li className="menu-item">
                    <button
                        type="button"
                        className="menu-button"
                        onClick={() => navigate("/main")}
                    >
                        {t("menu.main")}
                    </button>
                </li>

                {Array.isArray(menus) && menus
                    .filter(menu => menu.menuPrntCd === "0" && hasMenu(menu.menuCd))
                    .map(menu => (
                        <li key={menu.menuCd} className="menu-item">
                            <button
                                type="button"
                                className="menu-button"
                                onClick={() => goPage(menu.dedName)}
                            >
                                {t(`menu.${menu.menuCd}`)}
                            </button>
                            <ul className="submenu">{renderMenu(menu.menuCd)}</ul>
                        </li>
                    ))}
            </ul>
            <div className="logout-area">
                <button className="logout-button" onClick={fnLogout}>
                    {t("menu.logout")}
                </button>
            </div>
        </nav>
    );
}

export default Menu;
