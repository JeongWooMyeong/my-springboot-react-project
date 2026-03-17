import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ children }) {
    const location = useLocation();
    const user = location.state?.user;
    const [valid, setValid] = useState(null);

    useEffect(() => {
        if (!user?.token) {
            setValid(false);
            return;
        }

        //alert(user?.token);

        fetch("/api/verify", {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => setValid(res.ok))
            .catch(() => setValid(false));
    }, [user]);

    if (valid === null) return <div>검증 중...</div>;
    if (!valid) return <Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
