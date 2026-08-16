import {useEffect, useState} from "react";
import "../css/pages/main/main-page.css";
import {selectMainNoticeList} from "../services/sybs1000Api";


function MainPage() {


    const [mainnoti,setMainNoti] = useState([]);


    useEffect(()=>{

        loadNotice();

    },[]);



    const loadNotice = async()=>{

        try{

            const res = await selectMainNoticeList();

            console.log("메인 공지 :", res.data);

            setMainNoti(res.data);


        }catch(e){

            console.error(e);

        }

    };



    return (

        <div id="main_wrap">


            <div className="main_board01">


                <table>

                    <tbody>


                    {
                        mainnoti.length === 0 ?

                            (
                                <tr>
                                    <td>
                                        등록된 게시글이 없습니다.
                                    </td>
                                </tr>
                            )

                            :

                            (

                                mainnoti.map((noti)=>(

                                    <tr key={noti.notice_id}>


                                        <td>

                                            <a href={`/sybs1000/detail?notice_id=${noti.notice_id}`}>
                                                {noti.title}
                                            </a>

                                        </td>


                                        <td>

                                            {noti.created_at.substring(0,10)}

                                        </td>


                                    </tr>


                                ))

                            )

                    }


                    </tbody>


                </table>


            </div>


        </div>

    );

}


export default MainPage;