import axios from "../util/axios";


// ==============================
// 프린터 목록 조회
// ==============================
export const getPrinters = async () => {

    const res =
        await axios.get(
            "/api/agent/printers"
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
        await axios.get(
            `/api/agent/printers/${encodeURIComponent(
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
        await axios.post(
            "/api/agent/printers/print",
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