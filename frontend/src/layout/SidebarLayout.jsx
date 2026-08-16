import Sidebar from "../pages/components/Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../css/responsive/responsive-admin.css";

function SidebarLayout({ children }) {
    return (
        <div className="admin-layout">
            <Header />

            <div className="admin-layout-body">
                <Sidebar />

                <main className="admin-content">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default SidebarLayout;