import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/layout.css";

function Menu({ userinfo }) {   // ✅ 로그인 응답에서 받은 userinfo props로 전달
    const [menus, setMenus] = useState([]);
    const navigate = useNavigate();

    const goPage = (path) => {
        navigate(`${path}?t=${Date.now()}`);
    };

    const fnLogout = () => {
        console.log("로그아웃 처리");
        localStorage.removeItem("user");   // ✅ 저장된 사용자 정보 삭제
        navigate("/");                // ✅ 로그인 화면으로 이동
    };

    useEffect(() => {
        axios.get("/api/sysm1000/menus", { params: { useYn: "Y" } })
            .then(res => setMenus(res.data))
            .catch(err => console.error(err));
    }, []);

    // ✅ 권한에 해당 메뉴가 있는지 여부만 체크
    // ✅ 권한에 해당 메뉴가 있고 qryrole이 T인지 체크
    const hasMenu = (menuCd) => {
        if (!userinfo?.roles) return false;
        const result = userinfo.roles.some(role =>
            role.permissions?.some(p => p.menucd === menuCd && p.qryrole === "T")
        );
        //console.log("check", menuCd, result);
        return result;
    };


    // 부모-자식 구조 렌더링
    const renderMenu = (parentCd) => {
        return menus
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
                {menus
                    .filter(menu => menu.menuPrntCd === "0" && hasMenu(menu.menuCd))
                    .map(menu => (
                        <li key={menu.menuCd} className="menu-item">
                            <button type="button" className="menu-button" onClick={() => goPage(menu.dedName)}>
                                {menu.menuName}
                            </button>
                            <ul className="submenu">
                                {renderMenu(menu.menuCd)}
                            </ul>
                        </li>
                    ))}
            </ul>
            {/* ✅ 오른쪽에 로그아웃 버튼 추가 */}
            <div className="logout-area">
                <button className="logout-button" onClick={fnLogout}>
                    로그아웃
                </button>
            </div>
        </nav>
    );
}

export default Menu;
