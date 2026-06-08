import { useLocation } from "react-router-dom";
import Menu from "./Menu";

function MainPage() {
    const location = useLocation();
    const user = location.state?.user;

    // 샘플 데이터 (실제로는 API 호출로 가져와야 함)
    const mainnoti = [
        { bltnno: 1, titl: "공지사항 제목1", upddate: "2026-06-08" },
        { bltnno: 2, titl: "공지사항 제목2", upddate: "2026-06-07" },
    ];

    const mainwebhard = [
        { filefsnm: "파일1.pdf", rgdate: "2026-06-08", savefilefsnm: "file1" },
        { filefsnm: "파일2.docx", rgdate: "2026-06-07", savefilefsnm: "file2" },
    ];

    const fnLogout = () => {
        console.log("로그아웃 처리");
    };

    const fnHelpManual = () => {
        console.log("도움말 실행");
    };

    return (
        <div id="main_wrap">
            <h2>
                안녕하세요, {user?.username}님! (토큰: {user?.token})
            </h2>
            <Menu />
            <div className="main_logout01">
                <button onClick={fnLogout}>로그아웃</button>
                <button onClick={fnHelpManual}>도움말</button>
            </div>

            {/* 공지사항 */}
            <div className="main_board01">
                <h3>공지사항</h3>
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

            {/* 파일 다운로드 */}
            <div className="main_board02">
                <h3>파일 다운로드</h3>
                <table>
                    {mainwebhard.length === 0 ? (
                        <tr>
                            <td>등록된 파일이 없습니다.</td>
                        </tr>
                    ) : (
                        mainwebhard.map((file, idx) => (
                            <tr key={idx}>
                                <td>
                                    <a
                                        href={`/pp/po/getfiledown.do?savefilefsnm=${file.savefilefsnm}&filefsnm=${file.filefsnm}`}
                                    >
                                        {file.filefsnm}
                                    </a>
                                </td>
                                <td>{file.rgdate}</td>
                            </tr>
                        ))
                    )}
                </table>
            </div>
        </div>
    );
}

export default MainPage;
