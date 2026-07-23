import { Spin } from "antd";

export default function LoadingOverlay({ open, text = "처리중..." }) {

    if (!open) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "30px 40px",
                    borderRadius: 8,
                    textAlign: "center"
                }}
            >
                <Spin size="large" />
                <div style={{ marginTop: 15 }}>
                    {text}
                </div>
            </div>
        </div>
    );
}