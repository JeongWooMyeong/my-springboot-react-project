// utils.js
export function mmToPx(mm) {
    // 1 inch = 25.4 mm
    // 1 inch = 96 px (브라우저 기준)
    return (mm / 25.4) * 96;
}

export function pxToMm(px) {
    return (px / 96) * 25.4;
}
