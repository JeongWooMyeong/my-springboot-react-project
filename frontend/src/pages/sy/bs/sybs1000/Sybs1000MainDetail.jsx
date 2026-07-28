import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {selectSybs1000} from "../../../../services/sybs1000Api";


function Sybs1000MainDetail(){


    const [params] = useSearchParams();

    const notice_id = params.get("notice_id");


    const [data,setData] = useState({});



    useEffect(()=>{

        if(notice_id){

            load();

        }

    },[notice_id]);



    const load = async()=>{

        try{

            const res = await selectSybs1000(notice_id);

            setData(res.data);


        }catch(e){

            console.error(e);

        }

    };



    return (

        <div className="detail-container">

            <div className="detail-card">


                <h2>
                    {data.title}
                </h2>


                <div className="detail-info">

                    <span>
                        작성자 : {data.writer}
                    </span>


                    <span>
                        작성일 : {data.created_at}
                    </span>

                </div>


                <div className="detail-content">

                    {data.content}

                </div>


            </div>


        </div>

    );

}


export default Sybs1000MainDetail;