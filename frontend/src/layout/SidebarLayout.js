import Sidebar from "../pages/components/Sidebar";
import Header from "./Header";
import Footer from "./Footer";

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
