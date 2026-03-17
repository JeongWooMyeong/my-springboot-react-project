import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
          {/*보호된 라우트들*/}
          <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;