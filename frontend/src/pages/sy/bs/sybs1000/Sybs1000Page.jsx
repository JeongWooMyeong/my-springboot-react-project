import {useState} from "react";
import {useSearchParams} from "react-router-dom";

import Sybs1000Write from "./Sybs1000Write.jsx";
import Sybs1000Detail from "./Sybs1000Detail.jsx";
import Sybs1000List from "./Sybs1000List.jsx";
import Sybs1000Update from "./Sybs1000Update.jsx";
import "../../../../css/pages/sy/sybs1000/sybs1000-page.css";


function Sybs1000Page(){

    const [searchParams] = useSearchParams();

    const paramId = searchParams.get("notice_id");


    const [viewType,setViewType] = useState(
        paramId ? "DETAIL" : "LIST"
    );


    const [notice_id,setNoticeId] = useState(paramId);



    return (

        <>


            {
                viewType === "LIST" &&

                <Sybs1000List
                    setViewType={setViewType}
                    setNoticeId={setNoticeId}
                />

            }


            {
                viewType === "DETAIL" &&

                <Sybs1000Detail
                    notice_id={notice_id}
                    setViewType={setViewType}
                />

            }


            {
                viewType === "WRITE" &&

                <Sybs1000Write
                    setViewType={setViewType}
                />

            }


            {
                viewType === "UPDATE" &&

                <Sybs1000Update
                    notice_id={notice_id}
                    setViewType={setViewType}
                />

            }


        </>

    );

}

export default Sybs1000Page;