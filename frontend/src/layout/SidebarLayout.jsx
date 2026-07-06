import Sidebar from "../pages/components/Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function SidebarLayout({ children }) {
    return (
        <div className="layout">
            <Header />
            <div className="layout-body" style={{ display: "flex" }}>
                <Sidebar />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
export default SidebarLayout;
