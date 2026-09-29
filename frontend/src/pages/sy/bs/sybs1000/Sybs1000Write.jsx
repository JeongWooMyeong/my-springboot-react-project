import {useState} from "react";
import {insertSybs1000} from "../../../../services/sybs1000Api";
import TiptapEditor from "../../../editor/TiptapEditor.jsx";

function Sybs1000Write({setViewType}){

    const [form,setForm] = useState({
        title:"",
        content:"",
        writer:""
    });
    //단일 파일 -> 다중 파일
    const [files,setFiles] = useState([]);


    const change = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };


    const fileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        setFiles((prev) => [
            ...prev,
            ...selectedFiles
        ]);

        e.target.value = "";
    };


    const save = async()=>{

        try {

            const formData = new FormData();

            formData.append(
                "data",
                new Blob(
                    [JSON.stringify(form)],
                    {
                        type: "application/json"
                    }
                )
            );

            // 다중 파일 추가
            files.forEach((file)=>{
                formData.append("files", file);
            });


            await insertSybs1000(formData);

            alert("등록되었습니다.");

            setViewType("LIST");

        } catch(error) {

            console.error(error);

            alert("등록 중 오류가 발생했습니다.");
        }
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

                    <TiptapEditor
                        value={form.content}
                        onChange={(content) =>
                            setForm({
                                ...form,
                                content: content
                            })
                        }
                    />
                </div>


                <div className="form-group">
                    <label>첨부파일</label>

                    <input
                        type="file"
                        multiple
                        onChange={fileChange}
                    />

                    {files.length > 0 && (
                        <div>
                            {files.map((file, index) => (
                                <div key={index}>
                                    {index + 1}. {file.name}
                                </div>
                            ))}
                        </div>
                    )}
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
