import Menu from "../pages/Menu.jsx";
import { useTranslation } from "react-i18next";

function Header() {
    const userinfo = JSON.parse(localStorage.getItem("user"));
    const { t, i18n } = useTranslation();  // ✅ t도 함께 구조분해 할당

    const handleChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang).then(() => {
            // 언어 변경 후 실행할 추가 로직
            console.log("Language changed to", newLang);
        });
        localStorage.setItem("lang", newLang); // 선택 언어 저장
    };


    return (
        <header
            className="layout-header"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
            {/* 왼쪽: 메뉴 */}
            <Menu userinfo={userinfo} />

            {/* 오른쪽: 언어 선택 콤보박스 */}
            <select
                onChange={handleChange}
                value={i18n.language}
                style={{
                    fontSize: "1.1rem",
                    padding: "6px 12px",
                    marginRight: "20px",
                    borderRadius: "4px"
                }}
            >
                <option value="ko">한국어</option>
                <option value="en">English</option>
            </select>
        </header>
    );
}

export default Header;
