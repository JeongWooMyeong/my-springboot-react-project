import { Modal } from "antd";

export default function Pppo2000PdfPreview({
                                               open,
                                               pdfUrl,
                                               onClose
                                           }) {

    return (
        <Modal
            title="PDF 미리보기"
            open={open}
            onCancel={onClose}
            footer={null}
            width={1000}
            centered
        >

            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="PDF 미리보기"
                    style={{
                        width: "100%",
                        height: "700px",
                        border: "1px solid #ccc"
                    }}
                />
            )}

        </Modal>
    );
}
