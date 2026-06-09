import { useLocation } from "react-router-dom";
import "../css/layout.css";

function MainPage() {
    const location = useLocation();

    // 샘플 데이터 (실제로는 API 호출로 가져와야 함)
    const mainnoti = [
        { bltnno: 1, titl: "공지사항 제목1", upddate: "2026-06-08" },
        { bltnno: 2, titl: "공지사항 제목2", upddate: "2026-06-07" },
    ];

    const fnLogout = () => {
        console.log("로그아웃 처리");
    };

    const fnHelpManual = () => {
        console.log("도움말 실행");
    };

    return (
        <div id="main_wrap">
            <div className="main_logout01">
                <button onClick={fnLogout}>로그아웃</button>
                <button onClick={fnHelpManual}>도움말</button>
            </div>

            {/* 공지사항 */}
            <div className="main_board01">
                <table>
                    {mainnoti.length === 0 ? (
                        <tr>
                            <td>등록된 게시글이 없습니다.</td>
                        </tr>
                    ) : (
                        mainnoti.map((noti) => (
                            <tr key={noti.bltnno}>
                                <td>
                                    <a href={`/goPageUrl.do?bltnno=${noti.bltnno}`}>
                                        {noti.titl}
                                    </a>
                                </td>
                                <td>{noti.upddate}</td>
                            </tr>
                        ))
                    )}
                </table>
            </div>

        </div>
    );
}

export default MainPage;
