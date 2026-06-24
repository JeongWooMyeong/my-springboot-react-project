import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";

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

const roleColumns = [
    {
        title: 'Role ID',
        dataIndex: 'roleno',
        key: 'roleno'
    },
    {
        title: 'Role Name',
        dataIndex: 'rolename',
        key: 'rolename'
    }
];

export default function Syep4000Grid() {
    const [selectedMenuCd, setSelectedMenuCd] = useState(null);
    const [rows, setRows] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]); // 체크된 role ids
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('/api/users')
            .then(res => {
                const dataWithKey = res.data.map((row, index) => ({ key: index, ...row }));
                setRows(dataWithKey);
            })
            .catch(err => console.error(err));
    }, []);

    const handleUserClick = (record) => {
        setSelectedUser(record);

        // 1. 전체 역할 가져오기
        axios.get("/api/users/roles")
            .then(res => setRoles(res.data));

        // 2. 해당 user 역할 가져오기
        axios.get(`/api/users/${record.userid}/roles`)
            .then(res => {
                const roleIds = res.data.map(r => r.roleno);
                setUserRoles(roleIds);
            });
    };

    return (
        <>
            <Sidebar selectedMenuCd={selectedMenuCd} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card title="User List" style={{ marginBottom: 16 }}>
                    <Table
                        dataSource={rows}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1200, y: 400 }}
                        onRow={(record) => ({
                            onClick: () => handleUserClick(record)
                        })}
                    />
                </Card>


                <Card title="Role List (Selected User Roles)">
                    <Table
                        rowKey="roleno"
                        dataSource={roles}
                        columns={[
                            { title: "Role ID", dataIndex: "roleno" },
                            { title: "Role Name", dataIndex: "rolename" }
                        ]}
                        rowSelection={{
                            type: "checkbox",
                            selectedRowKeys: userRoles,
                            onChange: (selectedKeys) => setUserRoles(selectedKeys)
                        }}
                    />
                </Card>
            </div>
        </>
    );
}
