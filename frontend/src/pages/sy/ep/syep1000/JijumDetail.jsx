import React from "react";
import { Table, Button } from "antd";

export default function JijumDetail({
                                        detail,
                                        visibleColumns,
                                        onEdit,
                                        onDelete
                                    }) {
    if (!detail) {
        return null;
    }

    return (
        <div
            style={{
                width: 700,
                flexShrink: 0,
                height: 500,
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px"
            }}
        >
            <div
                className="detail-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px"
                }}
            >
                <div className="section-title">
                    지점 상세
                </div>

                <div className="action-buttons">
                    <Button
                        onClick={onEdit}
                    >
                        수정
                    </Button>

                    <Button
                        danger
                        onClick={onDelete}
                    >
                        삭제
                    </Button>
                </div>
            </div>

            <Table
                dataSource={[detail]}
                columns={visibleColumns}
                pagination={false}
                rowKey="jijumcd"
                scroll={{
                    y: 400
                }}
            />
        </div>
    );
}