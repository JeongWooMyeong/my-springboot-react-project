import {useEffect, useState} from "react";

import FontUpload from "./FontUpload.jsx";
import FontList from "./FontList.jsx";
import FontPreview from "./FontPreview.jsx";

import {
    getFontList,
    deleteFont
} from "../../../../services/sytm3000Api";


export default function Sytm3000Page(){

    const [fonts,setFonts] = useState([]);

    const [selectedFont,setSelectedFont] = useState(null);



    useEffect(()=>{

        loadFonts();

    },[]);



    const loadFonts = async()=>{

        const data =
            await getFontList();

        setFonts(data);

    };



    const handleDelete = async(fontId)=>{

        if(!confirm("삭제하시겠습니까?")){
            return;
        }


        await deleteFont(fontId);


        if(
            selectedFont?.fontId === fontId
        ){
            setSelectedFont(null);
        }


        loadFonts();

    };



    return (

        <div
            style={{
                padding:20
            }}
        >

            <h2>
                폰트 관리
            </h2>


            <FontUpload
                reload={loadFonts}
            />


            <hr/>


            <FontList
                fonts={fonts}
                onSelect={setSelectedFont}
                onDelete={handleDelete}
            />


            <hr/>


            {
                selectedFont &&
                <FontPreview
                    font={selectedFont}
                />
            }


        </div>

    );

}