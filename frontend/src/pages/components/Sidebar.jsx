import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../context/MenuContext.jsx";
import { useTranslation } from "react-i18next";

function Sidebar() {
    const { menus } = useMenu(); // ✅ Context에서 메뉴 가져오기
    const { t } = useTranslation(); // ✅ 다국어 훅

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
            <Link to={menu.dedName || "#"}>
                {t(`menu.${menu.menuCd}`)} {/* ✅ 번역 키 사용 */}
            </Link>
            {menu.children?.length > 0 && <ul>{menu.children.map(renderTree)}</ul>}
        </li>
    );

    return (
        <aside className="sidebar">
            <h3>{t("menu.syTitle")}</h3> {/* ✅ 제목도 번역 처리 */}
            <ul>
                {treeData.length > 0
                    ? treeData.map(renderTree)
                    : <li>{t("menu.noSyMenu")}</li>} {/* ✅ 메시지도 번역 처리 */}
            </ul>
        </aside>
    );
}

export default Sidebar;
