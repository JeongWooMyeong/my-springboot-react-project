import React, { useEffect, useState } from 'react';
import { Table, Card, Input, Button, Form, Select, Modal } from 'antd';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import JijumSelect from "../../components/JijumSelect";

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
    const [searchForm] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registerForm] = Form.useForm();

    const [checkMessage, setCheckMessage] = useState("");
    const [checkStatus, setCheckStatus] = useState(""); // "success" or "error"

    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const [isEdit, setIsEdit] = useState(false);   // ✅ 등록/수정 모드 구분


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

    const fetchUsers = (filters = {}) => {
        axios.get('/api/users', { params: filters })
            .then(res => {
                const dataWithKey = res.data.map((row, index) => ({ key: index, ...row }));
                setRows(dataWithKey);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = () => {
        const { searchField, searchValue } = searchForm.getFieldsValue();
        if (searchField && searchValue) {
            fetchUsers({ [searchField]: searchValue });
        } else {
            fetchUsers();
        }
    };

    const handleRegister = () => {
        registerForm.validateFields().then(values => {
            axios.post('/api/users', values)
                .then(() => {
                    alert("등록 완료");
                    setIsModalOpen(false);
                    registerForm.resetFields();
                    setIsEdit(false);
                    setCheckMessage("");   // ✅ 메시지 초기화
                    setCheckStatus("");    // ✅ 상태 초기화
                    fetchUsers();          // 리스트 새로 조회
                })
                .catch(err => {
                    console.error("등록 실패:", err);
                    alert("사용자 등록 중 오류가 발생했습니다.");
                });
        });
    };

    const handleUpdate = () => {
        registerForm.validateFields().then(values => {
            axios.put(`/api/users/${values.userid}`, values)
                .then(() => {
                    alert("수정 완료");
                    setIsModalOpen(false);
                    registerForm.resetFields();
                    setIsEdit(false);
                    fetchUsers(); // 리스트 다시 조회
                })
                .catch(err => {
                    console.error("수정 실패:", err);
                    alert("사용자 수정 중 오류가 발생했습니다.");
                });
        });
    };

    return (
        <>
            <Sidebar selectedMenuCd={selectedMenuCd} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card title="User List" style={{ marginBottom: 16 }}>
                    {/* 검색 필터 영역 */}
                    <Form form={searchForm} layout="inline" style={{ marginBottom: 16 }}>
                        <Form.Item name="searchField" initialValue="userid">
                            <Select style={{ width: 150 }}>
                                <Select.Option value="userid">User ID</Select.Option>
                                <Select.Option value="username">User Name</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="searchValue">
                            <Input placeholder="검색어 입력" style={{ width: 200 }}
                                   onPressEnter={handleSearch}   // 엔터 입력 시 조회 실행
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleSearch}>
                                조회
                            </Button>
                        </Form.Item>
                        {/* 버튼들 간격 주기 */}
                        <Form.Item style={{ marginLeft: 8 }}>
                            <Button type="default" onClick={() => {
                                setIsEdit(false); // 등록 모드
                                registerForm.resetFields();
                                setIsModalOpen(true);
                            }}>
                                사용자 등록
                            </Button>
                        </Form.Item>

                        <Form.Item style={{ marginLeft: 8 }}>
                            <Button
                                type="default"
                                disabled={selectedUserIds.length !== 1} // 수정은 단일 선택만 허용
                                onClick={() => {
                                    const userId = selectedUserIds[0];
                                    const user = rows.find(u => u.userid === userId);
                                    if (user) {
                                        registerForm.setFieldsValue(user); // 선택된 사용자 값 채워넣기
                                        setIsEdit(true); // 수정 모드
                                        setIsModalOpen(true);
                                    }
                                }}
                            >
                                사용자 수정
                            </Button>
                        </Form.Item>

                        <Form.Item style={{ marginLeft: 8 }}>
                            <Button
                                danger
                                disabled={selectedUserIds.length === 0} // 삭제는 다중 선택 가능
                                onClick={() => {
                                    axios.delete('/api/users', { data: selectedUserIds })
                                        .then(() => {
                                            alert("삭제 완료");
                                            fetchUsers();
                                            setSelectedUserIds([]);
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            alert("삭제 중 오류 발생");
                                        });
                                }}
                            >
                                사용자 삭제
                            </Button>
                        </Form.Item>
                    </Form>

                    <Table
                        rowKey="userid"   // ✅ 각 행의 고유 key를 userid로 설정
                        dataSource={rows}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1200, y: 400 }}
                        rowSelection={{
                            type: "checkbox",
                            selectedRowKeys: selectedUserIds,
                            onChange: (selectedRowKeys) => {
                                setSelectedUserIds(selectedRowKeys);   // ✅ 선택된 userid 배열 저장
                            }
                        }}
                        onRow={(record) => ({
                            onClick: () => handleUserClick(record)
                        })}
                    />

                    <Modal
                        title={isEdit ? "사용자 수정" : "사용자 등록"}
                        open={isModalOpen}
                        onOk={isEdit ? handleUpdate : handleRegister}
                        onCancel={() => {
                            setIsModalOpen(false);
                            registerForm.resetFields();
                            setIsEdit(false);   // 닫을 때 등록 모드로 초기화
                        }}
                        okText={isEdit ? "수정" : "등록"}
                        cancelText="취소"
                    >
                        <Form form={registerForm} layout="vertical">
                            {/* User ID */}
                            <Form.Item label="User ID" required>
                                <Input.Group compact>
                                    <Form.Item
                                        name="userid"
                                        noStyle
                                        rules={[{ required: true, message: 'User ID를 입력하세요' }]}
                                    >
                                        <Input
                                            style={{ width: 'calc(100% - 100px)', marginRight: 8 }}
                                            disabled={isEdit}   // ✅ 수정 모드에서는 ID 변경 불가
                                        />
                                    </Form.Item>
                                    {!isEdit && (   // ✅ 등록 모드에서만 중복확인 버튼 표시
                                        <Button
                                            type="default"
                                            style={{ width: 92 }}
                                            onClick={() => {
                                                const userid = registerForm.getFieldValue("userid");
                                                if (userid) {
                                                    axios.get(`/api/users/check/${userid}`)
                                                        .then(res => {
                                                            if (res.data) {
                                                                setCheckMessage("이미 사용 중인 ID입니다.");
                                                                setCheckStatus("error");
                                                            } else {
                                                                setCheckMessage("사용 가능한 ID입니다.");
                                                                setCheckStatus("success");
                                                            }
                                                        })
                                                        .catch(() => {
                                                            setCheckMessage("중복 확인 중 오류가 발생했습니다.");
                                                            setCheckStatus("error");
                                                        });
                                                } else {
                                                    setCheckMessage("먼저 User ID를 입력하세요.");
                                                    setCheckStatus("error");
                                                }
                                            }}
                                        >
                                            중복확인
                                        </Button>
                                    )}
                                </Input.Group>
                                {checkMessage && (
                                    <div style={{ marginTop: 6, color: checkStatus === "success" ? "green" : "blue" }}>
                                        {checkMessage}
                                    </div>
                                )}
                            </Form.Item>

                            {/* ✅ User Name 추가 */}
                            <Form.Item
                                name="username"
                                label="User Name"
                                rules={[{ required: true, message: 'User Name을 입력하세요' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* Password */}
                            <Form.Item
                                name="sctno"
                                label="Password"
                                rules={[{ required: !isEdit, message: 'Password를 입력하세요' }]} // ✅ 등록 시 필수, 수정 시 선택
                            >
                                <Input.Password />
                            </Form.Item>

                            {/* 지점 선택 */}
                            <JijumSelect form={registerForm} />

                            {/* 전화번호 */}
                            <Form.Item
                                name="tel"
                                label="전화번호"
                                rules={[
                                    { required: true, message: '전화번호를 입력하세요' },
                                    { pattern: /^01[0-9]-\d{3,4}-\d{4}$/, message: '전화번호 형식은 010-1234-5678 입니다' }
                                ]}
                            >
                                <Input placeholder="010-1234-5678" />
                            </Form.Item>

                            {/* 이메일 */}
                            <Form.Item
                                name="useremail"
                                label="이메일"
                                rules={[{ required: true, type: 'email', message: '올바른 이메일을 입력하세요' }]}
                            >
                                <Input />
                            </Form.Item>

                            {/* 사용 여부 */}
                            <Form.Item
                                name="useean"
                                label="사용 여부"
                                initialValue="Y"
                                rules={[{ required: true, message: '사용 여부를 선택하세요' }]}
                            >
                                <Select>
                                    <Select.Option value="Y">사용</Select.Option>
                                    <Select.Option value="N">미사용</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
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
