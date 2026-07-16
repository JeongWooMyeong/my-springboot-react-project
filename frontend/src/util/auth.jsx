import { jwtDecode } from "jwt-decode";


export function logout(){

    localStorage.removeItem("token");

    window.location.href = "/";

}


/*
 * JWT 만료 체크
 */
export function checkToken(){

    const token = localStorage.getItem("token");


    if(!token){
        return false;
    }


    try{

        const decoded = jwtDecode(token);


        const now =
            Date.now() / 1000;


        // 만료됨
        if(decoded.exp <= now){

            logout();

            return false;
        }


        return true;


    }catch(e){

        logout();

        return false;

    }

}


/*
 * 로그인 후 만료 타이머 시작
 */
export function startTokenTimer(){

    const token = localStorage.getItem("token");


    if(!token){
        return;
    }


    try{


        const decoded =
            jwtDecode(token);


        const expireTime =
            decoded.exp * 1000;


        const remain =
            expireTime - Date.now();



        if(remain <= 0){

            logout();

            return;

        }



        setTimeout(()=>{

            logout();

        }, remain);



    }catch(e){

        logout();

    }

}