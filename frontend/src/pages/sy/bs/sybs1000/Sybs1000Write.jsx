import {useState} from "react";
import {insertSybs1000} from "../../../../services/sybs1000Api";

function Sybs1000Write({setViewType}){

    const [form,setForm] = useState({
        title:"",
        content:"",
        writer:""
    });

    const [file,setFile] = useState(null);


    const change = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };


    const fileChange = (e)=>{
        setFile(e.target.files[0]);
    };


    const save = async()=>{

        try {

            const formData = new FormData();

            // formData.append(
            //     "title",
            //     form.title
            // );
            //
            // formData.append(
            //     "content",
            //     form.content
            // );
            //
            // formData.append(
            //     "writer",
            //     form.writer
            // );
            //
            //
            // if(file){
            //     formData.append(
            //         "file",
            //         file
            //     );
            // }

            formData.append(
                "data",
                new Blob(
                    [JSON.stringify(form)],
                    {
                        type: "application/json"
                    }
                )
            );

            if (file) {
                formData.append(
                    "file",
                    file
                );
            }


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

                    <textarea
                        name="content"
                        value={form.content}
                        placeholder="내용을 입력하세요."
                        onChange={change}
                    />
                </div>


                <div className="form-group">
                    <label>첨부파일</label>

                    <input
                        type="file"
                        onChange={fileChange}
                    />

                    {file && (
                        <div>
                            선택 파일: {file.name}
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
