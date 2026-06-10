import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/layout.css"; // 기존 CSS import
import loginBtnImg from "../images/btn/btn_login_lottedDep.png";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // JSP의 document.ready 대체
        console.log("Login page mounted");
        // 팝업이나 쿠키 관련 초기화 로직을 여기에
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        // 쿠키 저장
        Cookies.set("userid", userid, { expires: 7 });

        try{
            const response = await fetch("/api/login",{
               method : "POST",
               headers : {
                   "Content-Type" : "application/json",
               } ,
                body : JSON.stringify({userid, password}),
            });

            if(response.ok){
                const data = await response.json();
                console.log("로그인 성공", data);

                // 로그인 정보 저장 (localStorage)
                localStorage.setItem("user", JSON.stringify(data));

                // 메인 페이지로 이동 (state 넘길 필요 없음)
                navigate("/main");
            }else{
                alert("로그인 실패");
            }

        } catch (error){
            console.error("서버 요청 오류 : ", error);
        }

        // 서버로 로그인 요청 (fetch/axios 사용)
        //
        // console.log("로그인 시도:", { userid, password });
    };

    return (
        <div className="login_wrap">
            <div className="login_box_lotteDep">
                <form onSubmit={handleLogin}>
                    <ul className="login_idpw_lotteDep">
                        <li>
                            <input
                                type="text"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                placeholder="사용자 아이디"
                            />
                        </li>
                        <li>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                            />
                        </li>
                    </ul>
                    <div className="login_btn_lotteDep">
                        <button type="submit">  {/*엔터 입력*/}
                            <img src={loginBtnImg} alt={"login"} />
                        </button>
                        {/*<img src={loginBtnImg} title="login"
                             onClick={handleLogin}/>*/}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;