import Menu from "../pages/Menu.jsx";


function Header(){

    // 로그인 시 localStorage에 저장한 user 꺼내오기
    const userinfo = JSON.parse(localStorage.getItem("user"));

    return(
        <header className="layout-header">
            <Menu userinfo={userinfo} />  {/* ✅ props로 전달 */}
        </header>
    );
}

export default Header;