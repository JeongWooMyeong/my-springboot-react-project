import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import Sysm1000Page from "./pages/sy/sm/Sysm1000Page";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          {/*보호된 라우트들*/}
          <Route path="/main" element={
              <ProtectedRoute>
                  <Layout>
                    <MainPage />
                  </Layout>
              </ProtectedRoute>
          } />
          <Route path="/sysm1000" element={
              <ProtectedRoute>
                  <Layout>
                      <Sysm1000Page />   {/* 해당 페이지 컴포넌트 */}
                  </Layout>
              </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;