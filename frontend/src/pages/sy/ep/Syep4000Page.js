import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
    { title: 'User ID', dataIndex: 'userid', key: 'userid', width: 100 },
    { title: 'User Name', dataIndex: 'username', key: 'username', width: 150 },
    { title: 'Sct No', dataIndex: 'sctno', key: 'sctno', width: 120 },
    { title: 'Jijum Cd', dataIndex: 'jijumcd', key: 'jijumcd', width: 120 },
    /*{ title: 'Tel', dataIndex: 'tel', key: 'tel', width: 150 },
    { title: 'Selphone', dataIndex: 'selphone', key: 'selphone', width: 150 },
    { title: 'Ofcr Tel', dataIndex: 'ofcrtel', key: 'ofcrtel', width: 150 },
    { title: 'Use Ean', dataIndex: 'useean', key: 'useean', width: 100 },
    { title: 'Reg Date', dataIndex: 'rgdate', key: 'rgdate', width: 180 },
    { title: 'Rgr', dataIndex: 'rgr', key: 'rgr', width: 100 },
    { title: 'Upd Date', dataIndex: 'upddate', key: 'upddate', width: 180 },
    { title: 'Updpn', dataIndex: 'updpn', key: 'updpn', width: 120 },
    { title: 'Brand Cd', dataIndex: 'brandcd', key: 'brandcd', width: 120 },
    { title: 'User Email', dataIndex: 'useremail', key: 'useremail', width: 220, ellipsis: true },
    { title: 'SMS Yn', dataIndex: 'smsyn', key: 'smsyn', width: 100 },
    { title: 'Ntn Id', dataIndex: 'ntnid', key: 'ntnid', width: 120 },
    { title: 'Co Id', dataIndex: 'coid', key: 'coid', width: 120 },
    { title: 'User Gubun', dataIndex: 'usergubun', key: 'usergubun', width: 150 },
    { title: 'Web/Mobile Use', dataIndex: 'webmobileuse', key: 'webmobileuse', width: 150 },*/
];

export default function Syep4000Grid() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then(res => {
                const dataWithKey = res.data.map((row, index) => ({ key: index, ...row }));
                setRows(dataWithKey);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Table
            dataSource={rows}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowSelection={{ type: 'checkbox' }}
            scroll={{ x: 1200, y: 600 }} // 테이블 전체 가로폭을 1800px로 제한
        />
    );
}
