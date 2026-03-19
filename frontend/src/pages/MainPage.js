import {useLocation} from "react-router-dom";

function MainPage(){
    const location = useLocation();
    const user = location.state?.user;

    return (<div>안녕하세요2ㄴㅇㄹㅇ32스킹2242433333, {user?.username}님! {user?.token}님!</div>);
}

export default MainPage;