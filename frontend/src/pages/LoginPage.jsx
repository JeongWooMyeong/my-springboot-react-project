import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/layout.css";

function LoginPage() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        Cookies.set("userid", userid, { expires: 7 });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userid, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/main");
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            console.error("서버 요청 오류:", error);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#f5f7fa"
        }}>
            <div style={{
                width: 350,
                padding: 32,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: 24 }}>로그인</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        placeholder="아이디"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            marginBottom: 16,
                            borderRadius: 6,
                            border: "1px solid #ddd"
                        }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            marginBottom: 16,
                            borderRadius: 6,
                            border: "1px solid #ddd"
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "#1890ff",
                            color: "#fff",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
