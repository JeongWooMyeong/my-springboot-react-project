import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ children }) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const [valid, setValid] = useState(null);

    useEffect(() => {
        if (!token) {
            setValid(false);
            return;
        }
        fetch("/api/verify", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setValid(res.ok))
            .catch(() => setValid(false));
    }, [token]);

    if (valid === null) return <div>검증 중...</div>;
    if (!valid) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
