import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Sidebar() {
    const [menus, setMenus] = useState([]);

    // 트리 변환 함수
    function buildTree(data) {
        const map = {};
        const roots = [];

        // SY prefix만 필터링
        const filtered = data.filter(item => item.menuCd.startsWith("SY"));

        // 각 메뉴를 map에 등록
        filtered.forEach(item => {
            map[item.menuCd] = { ...item, children: [] };
        });

        // 부모-자식 관계 연결
        filtered.forEach(item => {
            if (item.menuPrntCd === "0") {
                roots.push(map[item.menuCd]);
            } else {
                if (map[item.menuPrntCd]) {
                    map[item.menuPrntCd].children.push(map[item.menuCd]);
                }
            }
        });

        return roots;
    }

    useEffect(() => {
        axios.get("/api/sysm1000/menus")
            .then(res => {
                const treeData = buildTree(res.data);
                setMenus(treeData);
            })
            .catch(err => console.error(err));
    }, []);

    const renderTree = (menu) => (
        <li key={menu.menuCd}>
            <Link to={menu.dedName || "#"}>{menu.menuName}</Link>
            {menu.children && menu.children.length > 0 && (
                <ul>
                    {menu.children.map(child => renderTree(child))}
                </ul>
            )}
        </li>
    );

    return (
        <aside className="sidebar">
            <h3>SY 메뉴</h3>
            <ul>
                {menus.length > 0
                    ? menus.map(menu => renderTree(menu))
                    : <li>SY prefix 메뉴가 없습니다</li>}
            </ul>
        </aside>
    );
}

export default Sidebar;
