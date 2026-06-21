import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import { componentMap } from "./pages/routes/routes";

function App(){
    const [routesFromDB, setRoutesFromDB] = useState([]);

    useEffect(() => {
        axios.get("/api/sysm1000/menus", { params: { useYn: "Y" } })
            .then(res => {
                console.log("routesFromDB:", res.data); // 응답 확인
                setRoutesFromDB(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    return(
        <Router>
            <Routes>
                {/* 로그인 페이지는 고정 */}
                <Route path="/" element={<LoginPage />} />

                {/*보호된 라우트들*/}
                <Route path="/main" element={
                    <ProtectedRoute>
                        <Layout>
                            <MainPage />
                        </Layout>
                    </ProtectedRoute>
                } />

                {/* DB 기반 보호된 라우트 */}
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
        </Router>
    );
}

export default App;
