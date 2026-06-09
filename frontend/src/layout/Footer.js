import { useLocation } from "react-router-dom";

function Footer() {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <footer className="layout-footer">
            © 2026 Company Name {user && `| 안녕하세요, ${user.username}님!`}
        </footer>
    );
}

export default Footer;