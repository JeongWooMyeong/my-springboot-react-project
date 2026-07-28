import { useEffect, useState } from "react";
import { selectSybs1000List } from "../../../../services/sybs1000Api";

function Sybs1000List({ setViewType, setNoticeId }) {

    const [list, setList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await selectSybs1000List();

            console.log("공지사항 목록 :", res.data);

            setList(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const clickRow = (item) => {

        console.log("클릭한 데이터 :", item);

        // notice_id가 없으면 noticeId도 확인
        const id = item.notice_id ?? item.notice_id;

        console.log("선택 ID :", id);

        if (!id) {
            alert("게시글 번호를 찾을 수 없습니다.");
            return;
        }

        setNoticeId(id);
        setViewType("DETAIL");
    };

    return (
        <div className="notice-container">

            <div className="notice-header">
                <h2>공지사항</h2>

                <button
                    className="write-btn"
                    onClick={() => setViewType("WRITE")}
                >
                    등록
                </button>
            </div>

            <table className="notice-table">
                <thead>
                <tr>
                    <th width="80">번호</th>
                    <th>제목</th>
                    <th width="120">작성자</th>
                    <th width="150">작성일</th>
                    <th width="80">조회수</th>
                </tr>
                </thead>

                <tbody>
                {list.map(item => (
                    <tr
                        key={item.notice_id}
                        onClick={() => clickRow(item)}
                    >
                        <td>{item.notice_id}</td>

                        <td className="title">
                            {item.is_pinned && <span className="pin">📌</span>}
                            {item.title}
                        </td>

                        <td>{item.writer}</td>

                        <td>{item.created_at}</td>

                        <td>{item.view_count}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default Sybs1000List;