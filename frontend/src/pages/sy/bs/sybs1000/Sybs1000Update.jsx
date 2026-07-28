import {useEffect, useState} from "react";
import {
    selectSybs1000,
    updateSybs1000
} from "../../../../services/sybs1000Api";

function Sybs1000Update({
                            notice_id,
                            setViewType
                        }) {

    const [form, setForm] = useState({
        notice_id: "",
        title: "",
        writer: "",
        content: ""
    });

    useEffect(() => {

        if (!notice_id) return;

        load();

    }, [notice_id]);

    const load = async () => {

        try {

            const res = await selectSybs1000(notice_id);

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

    const save = async () => {

        try {

            await updateSybs1000(form);

            alert("수정되었습니다.");

            setViewType("DETAIL");

        } catch (e) {

            console.error(e);

        }

    };

    return (

        <div className="write-container">

            <div className="write-card">

                <h2>공지사항 수정</h2>

                <div className="form-group">

                    <label>제목</label>

                    <input
                        name="title"
                        value={form.title}
                        placeholder="제목을 입력하세요."
                        onChange={change}
                    />

                </div>

                <div className="form-group">

                    <label>작성자</label>

                    <input
                        name="writer"
                        value={form.writer}
                        placeholder="작성자"
                        onChange={change}
                    />

                </div>

                <div className="form-group">

                    <label>내용</label>

                    <textarea
                        name="content"
                        value={form.content}
                        placeholder="내용을 입력하세요."
                        onChange={change}
                    />

                </div>

                <div className="button-area">

                    <button
                        className="btn-list"
                        onClick={() => setViewType("DETAIL")}
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