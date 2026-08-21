import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../util/axios";

function ProtectedRoute({ children }) {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    const [valid, setValid] = useState(null);

    useEffect(() => {

        if (!token) {
            setValid(false);
            return;
        }

        api.get("/api/verify")
            .then(() => {
                setValid(true);
            })
            .catch(() => {
                setValid(false);
            });

    }, [token]);

    if (valid === null) {
        return <div>검증 중...</div>;
    }

    if (!valid) {
        localStorage.removeItem("user");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;