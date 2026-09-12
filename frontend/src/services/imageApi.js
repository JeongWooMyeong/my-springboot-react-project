import axios from "../util/axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async(file)=>{

    const formData = new FormData();

    formData.append(
        "file",
        file
    );


    const response =
        await axios.post(
            "/api/template/image/upload",
            formData,
            {
                headers:{
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );


    return (
        //`${API_BASE_URL}`
        //+
        response.data.url
    );

};