import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { Suspense } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
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
            {routesFromDB.map(({ dedName, xpn }) => {
                const PageComponent = componentMap[xpn];
                return (
                    <Route
                        key={dedName}
                        path={dedName}
                        element={
                            <ProtectedRoute>
                                <Layout>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <PageComponent />
                                    </Suspense>
                                </Layout>
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
