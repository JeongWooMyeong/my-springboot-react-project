import {useLocation} from "react-router-dom";
import Menu from "../pages/Menu";


function Header(){
    //const location = useLocation();

    return(
        <header className="layout-header">
            <Menu />
        </header>
    );
}

export default Header;