import axios from "axios";


export const getFontList = async()=>{


    const res =
        await axios.get(
            "/api/sytm3000/fonts"
        );


    return res.data;

};




export const uploadFont = async(formData)=>{

    const res =
        await axios.post(
            "/api/sytm3000/fonts/upload",
            formData
        );

    return res.data;

};




export const deleteFont = async(
    fontId
)=>{


    return axios.delete(
        `/api/sytm3000/fonts/${fontId}`
    );

};