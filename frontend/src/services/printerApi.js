import printerAxios from "../util/printerAxios";

// ==============================
// 프린터 목록 조회
// ==============================
export const getPrinters = async () => {

    const res =
        await printerAxios.get(
            "/api/printers"
        );

    return res.data;
};


// ==============================
// 프린터 설정 조회
// ==============================
export const getPrinterSettings = async (
    printerName
) => {

    const res =
        await printerAxios.get(
            `/api/printers/${encodeURIComponent(
                printerName
            )}/settings`
        );

    return res.data;
};


// ==============================
// PDF 출력
// ==============================
export const printPdf = async (
    printerName,
    filePath,
    settings
) => {

    const res =
        await printerAxios.post(
            "/api/printers/print",
            {
                printerName,
                filePath,

                // 인쇄 설정
                paperSize: settings?.paperSize,
                orientation: settings?.orientation,
                color: settings?.color,
                duplex: settings?.duplex,
                copies: settings?.copies
            }
        );

    return res.data;
};