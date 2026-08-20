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
import Sybs1000MainDetail from "./pages/sy/bs/sybs1000/Sybs1000MainDetail.jsx";
import Toast from "./pages/components/common/Toast.jsx";
import {NotificationProvider} from "./context/NotificationContext.jsx";

// 실제 로그인된 화면들
function AuthenticatedRoutes() {

    const { routesFromDB } = useMenu();

    return (
        <Routes>

            <Route
                path="/main"
                element={
                    <Layout>
                        <MainPage />
                    </Layout>
                }
            />

            <Route
                path="/sybs1000/detail"
                element={
                    <Layout>
                        <Sybs1000MainDetail />
                    </Layout>
                }
            />

            {routesFromDB.map(({ menuCd, dedName, xpn }) => {

                const PageComponent = componentMap[xpn];

                const LayoutComponent =
                    menuCd.startsWith("SY")
                        ? SidebarLayout
                        : Layout;

                return (
                    <Route
                        key={dedName}
                        path={dedName}
                        element={
                            <LayoutComponent>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PageComponent />
                                </Suspense>
                            </LayoutComponent>
                        }
                    />
                );
            })}

        </Routes>
    );
}


// 인증이 필요한 영역
function ProtectedApp() {

    return (
        <ProtectedRoute>

            <MenuProvider>

                <AuthenticatedRoutes />

            </MenuProvider>

        </ProtectedRoute>
    );
}


function App() {

    const userinfo =
        JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        checkToken();
    }, []);

    return (

        <Router>

            <NotificationProvider>

                <UserContext.Provider value={userinfo}>

                    <Toast />

                    <Routes>

                        {/* 로그인 페이지 */}
                        <Route
                            path="/"
                            element={<LoginPage />}
                        />

                        {/* 로그인 이후 */}
                        <Route
                            path="*"
                            element={<ProtectedApp />}
                        />

                    </Routes>

                </UserContext.Provider>

            </NotificationProvider>

        </Router>
    );
}

export default App;