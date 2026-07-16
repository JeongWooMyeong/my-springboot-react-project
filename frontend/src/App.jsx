import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./layout/Layout.jsx";
import SidebarLayout from "./layout/SidebarLayout.jsx"; // 새로 만든 사이드바 레이아웃
import { componentMap } from "./pages/routes/routes.jsx";
import { MenuProvider, useMenu } from "./context/MenuContext.jsx";
import { UserContext } from "./context/UserContext";
import {checkToken} from "./util/auth.jsx";

function AppRoutes() {
    const { routesFromDB } = useMenu();

    return (
        <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<LoginPage />} />

            {/* 메인 페이지 */}
            <Route path="/main" element={
                <ProtectedRoute>
                    <Layout>
                        <MainPage />
                    </Layout>
                </ProtectedRoute>
            } />

            {/* DB 기반 라우트 */}
            {routesFromDB.map(({ menuCd, dedName, xpn }) => {
                const PageComponent = componentMap[xpn];
                // menuCd가 "SY"로 시작하면 SidebarLayout, 아니면 기본 Layout
                const LayoutComponent = menuCd.startsWith("SY") ? SidebarLayout : Layout;

                return (
                    <Route
                        key={dedName}
                        path={dedName}
                        element={
                            <ProtectedRoute>
                                <LayoutComponent>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <PageComponent />
                                    </Suspense>
                                </LayoutComponent>
                            </ProtectedRoute>
                        }
                    />
                );
            })}
        </Routes>
    );
}

function App() {
    const userinfo = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{

        checkToken();


    },[]);

    return (
        <Router>
            <MenuProvider>
                <UserContext.Provider value={userinfo}>
                    <AppRoutes />
                </UserContext.Provider>
            </MenuProvider>
        </Router>
    );
}

export default App;
