import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/layout.css";
import { useTranslation } from "react-i18next";

function LoginPage() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

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
                alert(t("login.fail")); // ✅ 다국어 메시지
            }
        } catch (error) {
            console.error("서버 요청 오류:", error);
        }
    };

    const handleChangeLang = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang).then(() => {
            localStorage.setItem("lang", newLang);
        });
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
                {/* ✅ 언어 선택 콤보박스 */}
                <div style={{ textAlign: "right", marginBottom: 12 }}>
                    <select
                        onChange={handleChangeLang}
                        value={i18n.language}
                        style={{
                            fontSize: "0.9rem",
                            padding: "4px 8px",
                            borderRadius: "4px"
                        }}
                    >
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <h2 style={{ textAlign: "center", marginBottom: 24 }}>
                    {t("login.title")}
                </h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        placeholder={t("login.userid")}
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
                        placeholder={t("login.password")}
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
                        {t("login.button")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
