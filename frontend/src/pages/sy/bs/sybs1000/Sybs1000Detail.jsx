import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    selectSybs1000,
    deleteSybs1000,
    downloadSybs1000File
} from "../../../../services/sybs1000Api";


function Sybs1000Detail({
                            notice_id: propNoticeId,
                            setViewType
                        }) {

    const [params] = useSearchParams();

    const notice_id =
        propNoticeId ?? params.get("notice_id");

    const [data, setData] = useState({});


    useEffect(() => {

        if (!notice_id) return;

        load();

    }, [notice_id]);


    const load = async () => {

        try {

            const res =
                await selectSybs1000(notice_id);

            setData(res.data);

        } catch (e) {

            console.error(e);

        }

    };


    const handleDownload = async (file) => {

        try {

            const res =
                await downloadSybs1000File(
                    file.file_id
                );

            const blob =
                new Blob(
                    [res.data],
                    {
                        type:
                            file.content_type ||
                            "application/octet-stream"
                    }
                );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                file.original_name;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (e) {

            console.error(e);

            alert("파일 다운로드에 실패했습니다.");

        }

    };


    const remove = async () => {

        if (!window.confirm("삭제하시겠습니까?"))
            return;

        try {

            await deleteSybs1000(notice_id);

            alert("삭제되었습니다.");

            if (setViewType) {

                setViewType("LIST");

            } else {

                window.history.back();

            }

        } catch (e) {

            console.error(e);

        }

    };


    const formatDate = (dateString) => {

        if (!dateString) return "";

        const date =
            new Date(dateString);

        const yyyy =
            date.getFullYear();

        const mm =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const dd =
            String(
                date.getDate()
            ).padStart(2, "0");

        const hh =
            String(
                date.getHours()
            ).padStart(2, "0");

        const min =
            String(
                date.getMinutes()
            ).padStart(2, "0");

        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;

    };


    return (

        <div className="detail-container">

            <div className="detail-card">

                <h2>
                    {data.title}
                </h2>


                <div className="detail-info">

                    <div>
                        <strong>작성자</strong>
                        <span>
                            {data.writer}
                        </span>
                    </div>

                    <div>
                        <strong>작성일</strong>
                        <span>
                            {formatDate(
                                data.created_at
                            )}
                        </span>
                    </div>

                    <div>
                        <strong>조회수</strong>
                        <span>
                            {data.view_count}
                        </span>
                    </div>

                </div>


                <div
                    className="detail-content"
                    dangerouslySetInnerHTML={{
                        __html: data.content || ""
                    }}
                />


                {/* 첨부파일 */}
                {data.files &&
                    data.files.length > 0 && (

                        <div className="detail-files">

                            <strong>
                                첨부파일
                            </strong>

                            <div>

                                {data.files.map(
                                    (file) => (

                                        <div
                                            key={
                                                file.file_id
                                            }
                                            onClick={() =>
                                                handleDownload(
                                                    file
                                                )
                                            }
                                            style={{
                                                cursor:
                                                    "pointer",
                                                color:
                                                    "#1677ff",
                                                marginTop:
                                                    "8px"
                                            }}
                                        >

                                            📎{" "}
                                            {
                                                file.original_name
                                            }

                                        </div>

                                    ))}

                            </div>

                        </div>

                    )}


                <div className="button-area">

                    <button
                        className="btn-list"
                        onClick={() =>
                            setViewType
                                ? setViewType("LIST")
                                : window.history.back()
                        }
                    >
                        목록
                    </button>


                    <button
                        className="btn-edit"
                        onClick={() => {

                            if (setViewType) {

                                setViewType("UPDATE");

                            } else {

                                window.location.href =
                                    `/sybs1000/update?notice_id=${notice_id}`;

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
