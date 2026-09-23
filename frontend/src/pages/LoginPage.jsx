import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/pages/login/login-page.css";
import { useTranslation } from "react-i18next";

function LoginPage() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userid) {
            alert("아이디를 입력하세요.");
            return;
        }

        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        Cookies.set("userid", userid, { expires: 7 });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/main");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "로그인 실패");
            }

        } catch (error) {
            console.error("서버 요청 오류:", error);
        }
    };


    const handleChangeLang = (e) => {
        const newLang = e.target.value;

        i18n.changeLanguage(newLang)
            .then(() => {
                localStorage.setItem("lang", newLang);
            });
    };


    return (
        <div className="login-page">

            <div className="login-box">

                <div className="login-lang">
                    <select
                        value={i18n.language}
                        onChange={handleChangeLang}
                    >
                        <option value="ko">
                            한국어
                        </option>

                        <option value="en">
                            English
                        </option>
                    </select>
                </div>


                <h2 className="login-title">
                    {t("login.title")}
                </h2>


                <form onSubmit={handleLogin}>

                    <input
                        className="login-input"
                        type="text"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        placeholder={t("login.userid")}
                    />


                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("login.password")}
                    />


                    <button
                        className="login-button"
                        type="submit"
                    >
                        {t("login.button")}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;