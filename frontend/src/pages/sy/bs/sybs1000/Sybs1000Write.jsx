import {useState} from "react";
import {insertSybs1000} from "../../../../services/sybs1000Api";

function Sybs1000Write({setViewType}){

    const [form,setForm] = useState({
        title:"",
        content:"",
        writer:""
    });

    const change = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const save = async()=>{

        await insertSybs1000(form);

        alert("등록되었습니다.");

        setViewType("LIST");
    };

    return(

        <div className="write-container">

            <div className="write-card">

                <h2>공지사항 작성</h2>

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
                        onClick={()=>setViewType("LIST")}
                    >
                        목록
                    </button>

                    <button
                        className="btn-save"
                        onClick={save}
                    >
                        등록
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Sybs1000Write;