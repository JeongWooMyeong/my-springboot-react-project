import {useNavigate, useLocation} from "react-router-dom";

function MainPage(){
    const location = useLocation();
    const user = location.state?.user;

    return (<div>안녕하세요, {user?.username}님! {user?.token}님!</div>);
}

export default MainPage;