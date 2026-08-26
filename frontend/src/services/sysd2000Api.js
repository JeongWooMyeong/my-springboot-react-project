import axios from "../util/axios";

const BASE_URL = "/api/ext/kafka/dlt";

export const findAll = async () => {
    const response = await axios.get(BASE_URL);

    return response.data;
};

export const retry = async (productId) => {
    await axios.post(`${BASE_URL}/retry/${productId}`);
};