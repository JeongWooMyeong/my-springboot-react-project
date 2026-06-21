import { lazy } from "react";

// Lazy Loading으로 필요할 때만 import
const MainPage = lazy(() => import("../../pages/MainPage"));
const Sysm1000Page = lazy(() => import("../../pages/sy/sm/Sysm1000Page"));
const Syep4000Page = lazy(() => import("../../pages/sy/ep/Syep4000Page"));

export const componentMap = {
    MainPage,
    Sysm1000Page,
    Syep4000Page,
};