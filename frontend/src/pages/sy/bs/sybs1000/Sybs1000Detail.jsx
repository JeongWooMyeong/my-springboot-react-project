import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { selectSybs1000, deleteSybs1000 } from "../../../../services/sybs1000Api";

function Sybs1000Detail({ notice_id: propNoticeId, setViewType }) {
    const [params] = useSearchParams();
    const notice_id = propNoticeId ?? params.get("notice_id"); // 관리업무 or 메인

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
            if (setViewType) {
                setViewType("LIST"); // 관리업무에서는 목록 전환
            } else {
                window.history.back(); // 메인에서는 뒤로가기
            }
        } catch (e) {
            console.error(e);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h2>{data.title}</h2>

                <div className="detail-info">
                    <div><strong>작성자</strong><span>{data.writer}</span></div>
                    <div><strong>작성일</strong><span>{formatDate(data.created_at)}</span></div>
                    <div><strong>조회수</strong><span>{data.view_count}</span></div>
                </div>

                <div className="detail-content">{data.content}</div>

                <div className="button-area">
                    <button
                        className="btn-list"
                        onClick={() => setViewType ? setViewType("LIST") : window.history.back()}
                    >
                        목록
                    </button>
                    <button
                        className="btn-edit"
                        onClick={() => {
                            if (setViewType) {
                                setViewType("UPDATE"); // 관리업무에서는 상태 전환
                            } else {
                                window.location.href = `/sybs1000/update?notice_id=${notice_id}`; // 메인에서는 라우터 이동
                            }
                        }}
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
