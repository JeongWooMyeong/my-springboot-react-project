import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { Suspense } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import SidebarLayout from "./layout/SidebarLayout"; // 새로 만든 사이드바 레이아웃
import { componentMap } from "./pages/routes/routes";
import { MenuProvider, useMenu } from "./context/MenuContext";

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
    return (
        <Router>
            <MenuProvider>
                <AppRoutes />
            </MenuProvider>
        </Router>
    );
}

export default App;
