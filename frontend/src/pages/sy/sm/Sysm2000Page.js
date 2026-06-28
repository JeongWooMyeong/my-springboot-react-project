import React from "react";
import { Table, Card } from "antd";

const Sysm2000Page = () => {
    // 더미 데이터
    const dataSource = [
        {
            key: "1",
            roleno: "R001",
            rolename: "관리자",
        },
        {
            key: "2",
            roleno: "R002",
            rolename: "사용자",
        },
        {
            key: "3",
            roleno: "R003",
            rolename: "게스트",
        },
    ];

    // 컬럼 정의
    const columns = [
        {
            title: "Role ID",
            dataIndex: "roleno",
            key: "roleno",
        },
        {
            title: "Role Name",
            dataIndex: "rolename",
            key: "rolename",
        },
    ];

    return (
        <Card title="Sysm2000 Role List">
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
};

export default Sysm2000Page;
