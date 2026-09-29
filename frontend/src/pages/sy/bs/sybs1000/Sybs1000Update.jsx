import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    selectSybs1000,
    updateSybs1000,
    downloadSybs1000File
} from "../../../../services/sybs1000Api";

function Sybs1000Update({
                            notice_id: propNoticeId,
                            setViewType
                        }) {

    const [params] = useSearchParams();

    const notice_id =
        propNoticeId ?? params.get("notice_id");


    const [form, setForm] = useState({
        notice_id: "",
        title: "",
        writer: "",
        content: "",
        files: []
    });


    const [files, setFiles] = useState([]);


    useEffect(() => {

        if (!notice_id) return;

        load();

    }, [notice_id]);


    const load = async () => {

        try {

            const res =
                await selectSybs1000(notice_id);

            setForm(res.data);

        } catch (e) {

            console.error(e);

        }

    };


    const change = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleFileChange = (e) => {

        const selectedFiles =
            Array.from(e.target.files);

        setFiles((prev) => [
            ...prev,
            ...selectedFiles
        ]);

        e.target.value = "";
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

            alert(
                "파일 다운로드에 실패했습니다."
            );

        }

    };


    const save = async () => {

        try {

            const formData =
                new FormData();


            formData.append(
                "data",
                new Blob(
                    [
                        JSON.stringify(form)
                    ],
                    {
                        type:
                            "application/json"
                    }
                )
            );


            files.forEach((file) => {

                formData.append(
                    "files",
                    file
                );

            });


            await updateSybs1000(
                formData
            );


            alert("수정되었습니다.");


            if (setViewType) {

                setViewType("DETAIL");

            } else {

                window.location.href =
                    `/sybs1000/detail?notice_id=${form.notice_id}`;

            }

        } catch (e) {

            console.error(e);

            alert("수정 중 오류가 발생했습니다.");

        }

    };


    return (

        <div className="write-container">

            <div className="write-card">

                <h2>
                    공지사항 수정
                </h2>


                <div className="form-group">

                    <label>
                        제목
                    </label>

                    <input
                        name="title"
                        value={form.title || ""}
                        placeholder="제목을 입력하세요."
                        onChange={change}
                    />

                </div>


                <div className="form-group">

                    <label>
                        작성자
                    </label>

                    <input
                        name="writer"
                        value={form.writer || ""}
                        placeholder="작성자"
                        onChange={change}
                    />

                </div>


                <div className="form-group">

                    <label>
                        내용
                    </label>

                    <textarea
                        name="content"
                        value={form.content || ""}
                        placeholder="내용을 입력하세요."
                        onChange={change}
                    />

                </div>


                {/* 기존 첨부파일 */}

                {form.files &&
                    form.files.length > 0 && (

                        <div className="form-group">

                            <label>
                                기존 첨부파일
                            </label>


                            {form.files.map(
                                (item) => (

                                    <div
                                        key={
                                            item.file_id
                                        }
                                        onClick={() =>
                                            handleDownload(
                                                item
                                            )
                                        }
                                        style={{
                                            cursor:
                                                "pointer",
                                            color:
                                                "#1677ff",
                                            marginBottom:
                                                "6px"
                                        }}
                                    >

                                        📎{" "}
                                        {
                                            item.original_name
                                        }

                                    </div>

                                ))}

                        </div>

                    )}


                {/* 새 파일 */}

                <div className="form-group">

                    <label>
                        파일 첨부
                    </label>

                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />

                    {files.length > 0 && (

                        <div style={{ marginTop: 8 }}>

                            {files.map((file, index) => (

                                <div key={index}>
                                    선택 파일: {file.name}
                                </div>

                            ))}

                        </div>

                    )}

                </div>


                <div className="button-area">

                    <button
                        className="btn-list"
                        onClick={() =>
                            setViewType
                                ? setViewType("DETAIL")
                                : window.history.back()
                        }
                    >
                        취소
                    </button>


                    <button
                        className="btn-save"
                        onClick={save}
                    >
                        수정
                    </button>

                </div>

            </div>

        </div>

    );


}

export default Sybs1000Update;