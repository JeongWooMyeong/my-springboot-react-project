import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
    { title: 'User ID', dataIndex: 'userid', key: 'userid' },
    { title: 'User Name', dataIndex: 'username', key: 'username' },
    { title: 'Sct No', dataIndex: 'sctno', key: 'sctno' },
    { title: 'Jijum Cd', dataIndex: 'jijumcd', key: 'jijumcd' },
    { title: 'Tel', dataIndex: 'tel', key: 'tel' },
    { title: 'Selphone', dataIndex: 'selphone', key: 'selphone' },
    { title: 'Ofcr Tel', dataIndex: 'ofcrtel', key: 'ofcrtel' },
    { title: 'Use Ean', dataIndex: 'useean', key: 'useean' },
    { title: 'Reg Date', dataIndex: 'rgdate', key: 'rgdate' },
    { title: 'Rgr', dataIndex: 'rgr', key: 'rgr' },
    { title: 'Upd Date', dataIndex: 'upddate', key: 'upddate' },
    { title: 'Updpn', dataIndex: 'updpn', key: 'updpn' },
    { title: 'Brand Cd', dataIndex: 'brandcd', key: 'brandcd' },
    { title: 'User Email', dataIndex: 'useremail', key: 'useremail' },
    { title: 'SMS Yn', dataIndex: 'smsyn', key: 'smsyn' },
    { title: 'Ntn Id', dataIndex: 'ntnid', key: 'ntnid' },
    { title: 'Co Id', dataIndex: 'coid', key: 'coid' },
    { title: 'User Gubun', dataIndex: 'usergubun', key: 'usergubun' },
    { title: 'Web/Mobile Use', dataIndex: 'webmobileuse', key: 'webmobileuse' },
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
            scroll={{ x: 'max-content', y: 600 }}
        />

    );
}
