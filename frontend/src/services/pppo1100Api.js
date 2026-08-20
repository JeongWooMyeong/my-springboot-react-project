import axios from "../util/axios";

export async function getTemplate(templateid) {

    const res = await axios.get(
        `/api/sytm2000/${templateid}`
    );

    const data = res.data;

    return {
        ...data,
        canvasData: JSON.parse(data.canvasData)
    };
}


export async function uploadImage(file) {

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(
        "/api/pppo1000/upload/image",
        formData
    );

    return res.data;
}


export async function saveProduct(payload) {

    const res = await axios.post(
        "/api/pppo1000",
        payload
    );

    return res.data;
}