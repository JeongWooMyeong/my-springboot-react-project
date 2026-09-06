import axios from "axios";

const printerAxios = axios.create({
    baseURL: "http://localhost:18080",
});

export default printerAxios;