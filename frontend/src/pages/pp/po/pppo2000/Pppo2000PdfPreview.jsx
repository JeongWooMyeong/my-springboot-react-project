import {
    Button,
    Modal,
    Select,
    Space,
    message,
    InputNumber
} from "antd";

import { useEffect, useState } from "react";

import {
    getPrinters,
    getPrinterSettings,
    printPdf
} from "../../../../services/printerApi";


export default function Pppo2000PdfPreview({
                                               open,
                                               pdfUrl,
                                               filePath,

                                               // 전체 PDF 목록
                                               pdfFiles,

                                               // 현재 PDF 위치
                                               currentPdfIndex,

                                               // 이전 / 다음
                                               onPrevious,
                                               onNext,

                                               onClose
                                           }) {

    const [printers, setPrinters] =
        useState([]);

    const [selectedPrinter, setSelectedPrinter] =
        useState(null);

    const [printing, setPrinting] =
        useState(false);


    // 선택된 프린터 설정
    const [printerSettings, setPrinterSettings] =
        useState(null);


    // 인쇄 옵션
    const [paperSize, setPaperSize] =
        useState("A4");

    const [orientation, setOrientation] =
        useState("PORTRAIT");

    const [color, setColor] =
        useState(true);

    const [duplex, setDuplex] =
        useState(false);

    const [copies, setCopies] =
        useState(1);


    /*
     * 현재 PDF가 몇 번째인지
     */
    const fileCount =
        pdfFiles?.length || 0;


    /*
     * 현재 PDF 정보
     */
    const currentFile =
        pdfFiles?.[currentPdfIndex];

    const showPrinterAgent = false;

    /*
     * Printer Agent에서 설치된 프린터 목록 조회
     */
    useEffect(() => {

        if (!open) {
            return;
        }


        const fetchPrinters = async () => {

            try {

                const data =
                    await getPrinters();

                setPrinters(data);

            } catch (error) {

                console.error(
                    "프린터 목록 조회 실패",
                    error
                );

                message.error(
                    "Printer Agent에 연결할 수 없습니다."
                );
            }
        };


        fetchPrinters();

    }, [open]);


    /*
     * 프린터 선택
     */
    const handlePrinterChange = async (
        printerName
    ) => {

        setSelectedPrinter(
            printerName
        );

        setPrinterSettings(
            null
        );


        try {

            const settings =
                await getPrinterSettings(
                    printerName
                );


            console.log(
                "프린터 설정:",
                settings
            );


            setPrinterSettings(
                settings
            );


            // 프린터 기본 용지 적용
            if (
                settings?.paperSizes?.length > 0 &&
                !settings.paperSizes.includes(
                    paperSize
                )
            ) {

                setPaperSize(
                    settings.paperSizes[0]
                );
            }


        } catch (error) {

            console.error(
                "프린터 설정 조회 실패",
                error
            );

            message.error(
                "프린터 설정을 불러오지 못했습니다."
            );
        }
    };


    /*
     * PDF 인쇄
     *
     * 현재 Viewer에 표시된 PDF만 출력
     */
    const handlePrint = async () => {

        if (!selectedPrinter) {

            message.warning(
                "프린터를 선택해주세요."
            );

            return;
        }


        if (!filePath) {

            message.warning(
                "출력할 PDF 파일이 없습니다."
            );

            return;
        }


        try {

            setPrinting(true);


            const result =
                await printPdf(
                    selectedPrinter,
                    filePath,
                    {
                        paperSize,
                        orientation,
                        color,
                        duplex,
                        copies
                    }
                );


            message.success(
                result ||
                "출력이 완료되었습니다."
            );


            onClose();


        } catch (error) {

            console.error(
                "PDF 출력 실패",
                error
            );


            message.error(
                error?.response?.data ||
                "PDF 출력에 실패했습니다."
            );


        } finally {

            setPrinting(false);
        }
    };


    return (

        <Modal
            title="PDF 미리보기"
            open={open}
            onCancel={onClose}
            footer={null}
            width={1000}
            centered
        >

            {/* =========================
                PDF 제목 / 페이지 이동
            ========================= */}

            {fileCount > 0 && (

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        marginBottom: 12
                    }}
                >

                    <Button
                        onClick={onPrevious}
                        disabled={
                            currentPdfIndex <= 0
                        }
                    >
                        이전
                    </Button>


                    <span
                        style={{
                            minWidth: 180,
                            textAlign: "center"
                        }}
                    >
                        {currentFile?.ordno}

                        {"  "}

                        ({currentPdfIndex + 1} / {fileCount})
                    </span>


                    <Button
                        onClick={onNext}
                        disabled={
                            currentPdfIndex >=
                            fileCount - 1
                        }
                    >
                        다음
                    </Button>

                </div>
            )}


            {/* =========================
                PDF 미리보기
            ========================= */}

            {pdfUrl && (

                <iframe
                    src={pdfUrl}
                    title={
                        currentFile?.ordno ||
                        "PDF 미리보기"
                    }
                    style={{
                        width: "100%",
                        height: "700px",
                        border: "1px solid #ccc"
                    }}
                />

            )}


            {/* =========================
                인쇄 영역
            ========================= */}

            <div
                style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid #eee"
                }}
            >

                {/* 프린터 선택 */}

                {showPrinterAgent && (
                    <Space>
                        <span>
                            프린터
                        </span>

                        <Select
                            style={{
                                width: 300
                            }}
                            placeholder="프린터 선택"
                            value={selectedPrinter}
                            onChange={handlePrinterChange}
                            options={
                                printers.map(
                                    printer => ({
                                        value: printer,
                                        label: printer
                                    })
                                )
                            }
                        />
                    </Space>
                )}


                {/* 프린터 설정 */}

                {selectedPrinter && (

                    <div
                        style={{
                            marginTop: 16,
                            padding: 12,
                            background: "#fafafa",
                            border: "1px solid #eee",
                            borderRadius: 4
                        }}
                    >

                        <Space
                            wrap
                            size="large"
                        >

                            {/* 용지 */}

                            <Space>

                                <span>
                                    용지
                                </span>

                                <Select
                                    style={{
                                        width: 100
                                    }}
                                    value={paperSize}
                                    onChange={
                                        setPaperSize
                                    }
                                    loading={
                                        !printerSettings
                                    }
                                    options={
                                        printerSettings
                                            ?.paperSizes
                                            ?.map(
                                                size => ({
                                                    value: size,
                                                    label: size
                                                })
                                            ) || []
                                    }
                                />

                            </Space>


                            {/* 방향 */}

                            <Space>

                                <span>
                                    방향
                                </span>

                                <Select
                                    style={{
                                        width: 100
                                    }}
                                    value={orientation}
                                    onChange={
                                        setOrientation
                                    }
                                    options={[
                                        {
                                            value:
                                                "PORTRAIT",
                                            label:
                                                "세로"
                                        },
                                        {
                                            value:
                                                "LANDSCAPE",
                                            label:
                                                "가로"
                                        }
                                    ]}
                                />

                            </Space>


                            {/* 컬러 */}

                            <Space>

                                <span>
                                    컬러
                                </span>

                                <Select
                                    style={{
                                        width: 100
                                    }}
                                    value={color}
                                    onChange={
                                        setColor
                                    }
                                    disabled={
                                        printerSettings &&
                                        !printerSettings
                                            .colorSupported
                                    }
                                    options={[
                                        {
                                            value: true,
                                            label: "컬러"
                                        },
                                        {
                                            value: false,
                                            label: "흑백"
                                        }
                                    ]}
                                />

                            </Space>


                            {/* 양면 */}

                            <Space>

                                <span>
                                    양면
                                </span>

                                <Select
                                    style={{
                                        width: 100
                                    }}
                                    value={duplex}
                                    onChange={
                                        setDuplex
                                    }
                                    disabled={
                                        printerSettings &&
                                        !printerSettings
                                            .duplexSupported
                                    }
                                    options={[
                                        {
                                            value: false,
                                            label: "단면"
                                        },
                                        {
                                            value: true,
                                            label: "양면"
                                        }
                                    ]}
                                />

                            </Space>


                            {/* 매수 */}

                            <Space>

                                <span>
                                    매수
                                </span>

                                <InputNumber
                                    min={1}
                                    max={999}
                                    value={copies}
                                    onChange={
                                        value =>
                                            setCopies(
                                                value || 1
                                            )
                                    }
                                />

                            </Space>

                        </Space>

                    </div>
                )}


                {/* 버튼 */}

                <div
                    style={{
                        marginTop: 16,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >

                    <Space>

                        <Button
                            onClick={onClose}
                        >
                            닫기
                        </Button>


                        <Button
                            type="primary"
                            loading={printing}
                            disabled={
                                !selectedPrinter ||
                                !filePath ||
                                !printerSettings
                            }
                            onClick={handlePrint}
                        >
                            인쇄
                        </Button>

                    </Space>

                </div>

            </div>

        </Modal>
    );
}
