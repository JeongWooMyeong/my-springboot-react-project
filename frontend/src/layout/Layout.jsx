import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "../css/component.css";
import "../css/layout.css";

function Layout({ children }){
    return(
      <div className="layout">
        <Header />
            <main className="layout-body">{children}</main>
        <Footer />
      </div>
    );
}

export default Layout;