import React from "react";
import { Table, Button } from "antd";

function MenuDetail({
                        menuDetail,
                        columns,
                        handleDelete,
                        setIsEditMode,
                        setIsModalVisible
                    }) {

    if (!menuDetail) return null;

    return (
        <div
            className="table-container"
            style={{ flex: 2 }}
        >
            <div className="detail-header">
                <h2 className="section-title">
                    메뉴상세
                </h2>

                <div className="action-buttons">
                    <Button
                        onClick={() => {
                            setIsEditMode(true);
                            setIsModalVisible(true);
                        }}
                    >
                        수정
                    </Button>

                    <Button
                        danger
                        onClick={handleDelete}
                    >
                        삭제
                    </Button>
                </div>
            </div>

            <Table
                dataSource={[menuDetail]}
                columns={columns}
                pagination={false}
                rowKey="menuCd"
                style={{
                    width: "100%",
                    overflow: "auto"
                }}
            />
        </div>
    );
}

export default MenuDetail;