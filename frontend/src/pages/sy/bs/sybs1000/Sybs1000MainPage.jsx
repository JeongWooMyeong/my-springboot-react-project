import {useSearchParams} from "react-router-dom";
import Sybs1000MainDetail from "./Sybs1000MainDetail.jsx";


function Sybs1000MainPage(){


    const [params] = useSearchParams();


    const notice_id = params.get("notice_id");



    return (

        <Sybs1000MainDetail
            notice_id={notice_id}
        />

    );

}


export default Sybs1000MainPage;