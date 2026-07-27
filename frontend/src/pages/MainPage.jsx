import "../css/pages/main.css";

function MainPage() {

    // 샘플 데이터 (실제로는 API 호출로 가져와야 함)
    const mainnoti = [
        { bltnno: 1, titl: "공지사항 제목1", upddate: "2026-06-08" },
        { bltnno: 2, titl: "공지사항 제목2", upddate: "2026-06-07" },
    ];


    return (
        <div id="main_wrap">

            {/* 공지사항 */}
            <div className="main_board01">

                <table>
                    <tbody>
                    {
                        mainnoti.length === 0 ? (
                            <tr>
                                <td>
                                    등록된 게시글이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            mainnoti.map((noti) => (
                                <tr key={noti.bltnno}>

                                    <td>
                                        <a href={`/goPageUrl.do?bltnno=${noti.bltnno}`}>
                                            {noti.titl}
                                        </a>
                                    </td>

                                    <td>
                                        {noti.upddate}
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