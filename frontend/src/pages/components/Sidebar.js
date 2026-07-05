import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext";

function Sidebar() {
    const { menus } = useMenu(); // ✅ Context에서 메뉴 가져오기

    function buildTree(data) {
        const map = {};
        const roots = [];
        const filtered = data.filter(item => item.menuCd.startsWith("SY"));
        filtered.forEach(item => { map[item.menuCd] = { ...item, children: [] }; });
        filtered.forEach(item => {
            if (item.menuPrntCd === "0") roots.push(map[item.menuCd]);
            else if (map[item.menuPrntCd]) map[item.menuPrntCd].children.push(map[item.menuCd]);
        });
        return roots;
    }

    const treeData = buildTree(menus);

    const renderTree = (menu) => (
        <li key={menu.menuCd}>
            <Link to={menu.dedName || "#"}>{menu.menuName}</Link>
            {menu.children?.length > 0 && <ul>{menu.children.map(renderTree)}</ul>}
        </li>
    );

    return (
        <aside className="sidebar">
            <h3>SY 메뉴</h3>
            <ul>
                {treeData.length > 0
                    ? treeData.map(renderTree)
                    : <li>SY prefix 메뉴가 없습니다</li>}
            </ul>
        </aside>
    );
}

export default Sidebar;
