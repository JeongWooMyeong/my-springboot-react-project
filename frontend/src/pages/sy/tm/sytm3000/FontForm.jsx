import {useEffect,useState} from "react";


const init = {

    fontFamily:"",
    fontFileName:"",
    fontFilePath:"",
    fontWeight:400,
    fontStyle:"NORMAL"

};



export default function FontForm({
                                     font,
                                     onSave,
                                     onUpdate
                                 }){


    const [form,setForm] =
        useState(init);



    useEffect(()=>{

        if(font){

            setForm(font);

        }else{

            setForm(init);

        }

    },[font]);



    const change=(e)=>{

        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });

    };



    const submit=()=>{


        if(font){

            onUpdate(form);

        }else{

            onSave(form);

        }


    };



    return (

        <div>


            <input
                name="fontFamily"
                value={form.fontFamily}
                onChange={change}
                placeholder="폰트명"
            />


            <input
                name="fontFileName"
                value={form.fontFileName}
                onChange={change}
                placeholder="파일명"
            />


            <input
                name="fontFilePath"
                value={form.fontFilePath}
                onChange={change}
                placeholder="경로"
            />


            <button
                onClick={submit}
            >
                저장
            </button>


        </div>

    );

}