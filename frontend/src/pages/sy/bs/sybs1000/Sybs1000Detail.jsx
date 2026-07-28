import { useEffect, useState } from "react";
import {
    selectSybs1000,
    deleteSybs1000
} from "../../../../services/sybs1000Api";

function Sybs1000Detail({
                            notice_id,
                            setViewType
                        }) {

    const [data, setData] = useState({});

    useEffect(() => {

        if (!notice_id) return;

        load();

    }, [notice_id]);

    const load = async () => {

        try {

            const res = await selectSybs1000(notice_id);

            setData(res.data);

        } catch (e) {

            console.error(e);

        }

    };

    const remove = async () => {

        if (!window.confirm("삭제하시겠습니까?")) return;

        try {

            await deleteSybs1000(notice_id);

            alert("삭제되었습니다.");

            setViewType("LIST");

        } catch (e) {

            console.error(e);

        }

    };

    return (

        <div className="detail-container">

            <div className="detail-card">

                <h2>{data.title}</h2>

                <div className="detail-info">

                    <div>
                        <strong>작성자</strong>
                        <span>{data.writer}</span>
                    </div>

                    <div>
                        <strong>작성일</strong>
                        <span>{data.created_at}</span>
                    </div>

                    <div>
                        <strong>조회수</strong>
                        <span>{data.view_count}</span>
                    </div>

                </div>

                <div className="detail-content">
                    {data.content}
                </div>

                <div className="button-area">

                    <button
                        className="btn-list"
                        onClick={() => setViewType("LIST")}
                    >
                        목록
                    </button>

                    <button
                        className="btn-edit"
                        onClick={() => setViewType("UPDATE")}
                    >
                        수정
                    </button>

                    <button
                        className="btn-delete"
                        onClick={remove}
                    >
                        삭제
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Sybs1000Detail;