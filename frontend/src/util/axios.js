import axios from "axios";

const api = axios.create({
    baseURL: "",
});

// ==============================
// Request Interceptor
// ==============================
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


// ==============================
// Response Interceptor
// ==============================
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const status = error.response?.status;
        const originalRequest = error.config;

        // 로그인 실패
        if (status === 401 && originalRequest?.url?.includes("/api/login")) {
            return Promise.reject(error);
        }

        // Access Token 만료
        if (
            status === 401 &&
            !originalRequest?._retry &&
            !originalRequest?.url?.includes("/api/auth/refresh")
        ) {

            originalRequest._retry = true;

            try {

                const storedUser = localStorage.getItem("user");

                if (!storedUser) {
                    throw new Error("로그인 정보 없음");
                }

                const user = JSON.parse(storedUser);
                const refreshToken = user?.refreshToken;

                if (!refreshToken) {
                    throw new Error("Refresh Token 없음");
                }


                // ==============================
                // Refresh Token으로 Access Token 갱신
                // ==============================

                const response = await api.post(
                    "/api/auth/refresh",
                    {
                        refreshToken: refreshToken
                    }
                );


                // 새 Access Token
                const newAccessToken = response.data.token;


                // localStorage 업데이트
                user.token = newAccessToken;

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );


                // 실패했던 기존 요청에
                // 새로운 Access Token 넣기
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                // 기존 요청 다시 실행
                return api(originalRequest);


            } catch (refreshError) {

                // Refresh Token도 만료됨
                localStorage.removeItem("user");

                if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;