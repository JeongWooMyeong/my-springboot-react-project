import {
    Button,
    Modal
} from "antd";

export default function Pppo2000AllPdfPrintModal({
                                                     open,
                                                     allDownloadUrl,
                                                     onClose
                                                 }) {

    return (
        <Modal
            title="전체 인쇄"
            open={open}
            onCancel={onClose}
            footer={null}
            width={1000}
            centered
        >

            {allDownloadUrl && (
                <iframe
                    src={allDownloadUrl}
                    title="전체 인쇄 PDF"
                    style={{
                        width: "100%",
                        height: "750px",
                        border: "1px solid #ccc"
                    }}
                />
            )}

            <div
                style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <Button
                    onClick={onClose}
                >
                    닫기
                </Button>
            </div>

        </Modal>
    );
}
