import axios from "axios";

const api = axios.create({
    baseURL: "",
});

api.interceptors.request.use(
    (config) => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            const token = user?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 401 공통 처리
api.interceptors.response.use(
    (response) => response,

    (error) => {

        const status = error.response?.status;
        const url = error.config?.url;

        // 로그인 API의 401은 "로그인 실패"이므로
        // 여기서 /로 이동시키면 안 됨
        if (
            status === 401 &&
            !url?.includes("/api/login")
        ) {
            localStorage.removeItem("user");

            if (window.location.pathname !== "/") {
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default api;