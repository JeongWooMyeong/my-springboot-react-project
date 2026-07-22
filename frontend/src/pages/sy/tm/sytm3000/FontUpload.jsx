import {useState} from "react";

import {
    uploadFont
} from "../../../../services/sytm3000Api";


export default function FontUpload({
                                       reload
                                   }){


    const [file,setFile] = useState(null);



    const handleUpload = async()=>{


        if(!file){

            alert("폰트 파일을 선택하세요");

            return;

        }



        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        try {


            const res =
                await uploadFont(formData);


            console.log(
                "upload response",
                res
            );


            alert("등록 완료");


            setFile(null);


            reload();


        } catch(e) {


            console.error(
                "폰트 업로드 실패",
                e
            );


            console.error(
                e.response
            );


            alert(
                "업로드 실패"
            );

        }


    };



    return (

        <div>

            <h3>
                폰트 등록
            </h3>


            <input
                type="file"
                accept=".ttf,.otf"
                onChange={(e)=>
                    setFile(
                        e.target.files[0]
                    )
                }
            />


            <button
                onClick={handleUpload}
            >
                업로드
            </button>


        </div>

    );

}