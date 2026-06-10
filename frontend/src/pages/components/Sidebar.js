import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar({ selectedMenuCd }) {
    const [menuInfo, setMenuInfo] = useState(null);

    useEffect(() => {
        if (selectedMenuCd) {
            axios.get(`/api/sysm1000/menus/${selectedMenuCd}`)
                .then(res => setMenuInfo(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedMenuCd]);

    const renderTree = (menu) => {
        if (!menu) return null;
        return (
            <li key={menu.menuCd}>
                <Link to={menu.dedName}>{menu.menuName}</Link>
                {menu.children && menu.children.length > 0 && (
                    <ul>
                        {menu.children.map(child => renderTree(child))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <aside className="sidebar">
            <h3>메뉴</h3>
            <ul>
                {menuInfo ? renderTree(menuInfo) : <li>메뉴를 선택하세요</li>}
            </ul>
        </aside>
    );
}

export default Sidebar;