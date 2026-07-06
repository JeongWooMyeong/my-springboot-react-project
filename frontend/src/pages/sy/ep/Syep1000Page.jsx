import React, { useState, useEffect } from "react";
import { Tree, Table, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";
import "../../../css/layout.css";

function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.jijumcd] = {
            key: item.jijumcd,
            title: item.jijumname,
            children: []
        };
    });

    data.forEach(item => {
        if (item.jijumclcd === "0") {
            roots.push(map[item.jijumcd]);
        } else {
            if (map[item.jijumclcd]) {
                map[item.jijumclcd].children.push(map[item.jijumcd]);
            }
        }
    });

    return roots;
}

function Syep1000Page() {
    const [companies, setCompanies] = useState([]);
    const [selectedCoId, setSelectedCoId] = useState(null);
    const [treeData, setTreeData] = useState([]);
    const [selectedJijumCd, setSelectedJijumCd] = useState(null);
    const [detail, setDetail] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();

    // 고객사 목록 불러오기
    useEffect(() => {
        axios.get("/api/company")
            .then(res => setCompanies(res.data))
            .catch(err => console.error(err));
    }, []);

    // 고객사 선택 시 지점 트리 불러오기
    useEffect(() => {
        if (selectedCoId) {
            axios.get(`/api/jijum?coid=${selectedCoId}`)
                .then(res => setTreeData(buildTree(res.data)))
                .catch(err => console.error(err));
        }
    }, [selectedCoId]);

    // 지점 선택 시 상세 불러오기
    useEffect(() => {
        if (selectedJijumCd) {
            axios.get(`/api/jijum/${selectedJijumCd}`)
                .then(res => setDetail(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedJijumCd]);

    useEffect(() => {
        if (isEditMode && detail) {
            form.setFieldsValue(detail);
        }
    }, [isEditMode, detail, form]);

    const onSelect = keys => {
        setSelectedJijumCd(keys[0] || null);
    };

    const handleDelete = () => {
        axios.delete(`/api/jijum/${selectedJijumCd}`,{
            params: { coid: selectedCoId }   // ✅ coid도 같이 전달
            })
            .then(() => {
                alert("삭제 완료!");
                setDetail(null);
                return axios.get(`/api/jijum?coid=${selectedCoId}`)
                    .then(res => setTreeData(buildTree(res.data)));
            });
    };

    const handleUpdate = values => {
        axios.put(`/api/jijum/${selectedJijumCd}`, values)
            .then(() => {
                alert("수정 완료!");
                setIsModalVisible(false);
                return axios.get(`/api/jijum?coid=${selectedCoId}`)
                    .then(res => setTreeData(buildTree(res.data)));
            });
    };

    const handleCreate = values => {
        axios.post(`/api/jijum`, { ...values, coid: selectedCoId })
            .then(() => {
                alert("등록 완료!");
                setIsModalVisible(false);
                return axios.get(`/api/jijum?coid=${selectedCoId}`)
                    .then(res => setTreeData(buildTree(res.data)));
            });
    };

    const columns = [
        { title: "지점 코드", dataIndex: "jijumcd", key: "jijumcd" },
        { title: "지점 이름", dataIndex: "jijumname", key: "jijumname" },
        { title: "지점 분류 코드", dataIndex: "jijumclcd", key: "jijumclcd", hidden: true },
        { title: "Qee", dataIndex: "qee", key: "qee" },
        { title: "사용 여부", dataIndex: "useyn", key: "useyn" },
        { title: "삭제 가능 여부", dataIndex: "delpssyn", key: "delpssyn", hidden: true },
        { title: "수정일자", dataIndex: "upddate", key: "upddate", hidden: true },
        { title: "수정자", dataIndex: "updpn", key: "updpn", hidden: true },
        { title: "국가 ID", dataIndex: "ntnid", key: "ntnid", hidden: true },
        { title: "회사 ID", dataIndex: "coid", key: "coid" },
        { title: "층", dataIndex: "floor", key: "floor", hidden: true},
        { title: "섹션", dataIndex: "section", key: "section", hidden: true },
        { title: "구 지점 코드", dataIndex: "old_jijumcd", key: "old_jijumcd", hidden: true },
        { title: "구 팀 코드", dataIndex: "old_teamcd", key: "old_teamcd", hidden: true },
        { title: "구 지점 구분", dataIndex: "old_jijumgubun", key: "old_jijumgubun", hidden: true },
        { title: "구 브랜드 코드", dataIndex: "old_brandcd", key: "old_brandcd", hidden: true },
        { title: "페이지명", dataIndex: "xpn", key: "xpn", hidden: true },
    ];

    const visibleColumns = columns.filter(col => !col.hidden);

    return (
        <div className="layout">
            <div className="content">
                <div className="tree-headers" style={{ width: 350, border: "1px solid #ddd", padding: "15px", borderRadius: "6px", marginBottom: "20px" }}>
                    <div className="header-title">지점 관리</div>

                    <div className="company-select" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                        <span className="label">고객사 선택 :</span>
                        <Select
                            placeholder="고객사 선택"
                            style={{ width: 180 }}
                            onChange={value => {
                                setSelectedCoId(value);
                                setSelectedJijumCd(null);
                                setDetail(null);
                            }}
                        >
                            {companies.map(c => (
                                <Select.Option key={c.coid} value={c.coid}>
                                    {c.coname}
                                </Select.Option>
                            ))}
                        </Select>
                        <Button
                            type="primary"
                            onClick={() => {
                                form.resetFields();
                                setDetail(null);
                                setIsEditMode(false);
                                setIsModalVisible(true);
                            }}
                            disabled={!selectedCoId}
                        >
                            등록
                        </Button>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                    <div style={{ width: 350, flexShrink: 0, height: 500, overflowY: "auto", border: "1px solid #ddd", borderRadius: "6px", padding: "10px" }}>
                        <Tree treeData={treeData} onSelect={onSelect} defaultExpandAll />
                    </div>
                    {detail && (
                        <div style={{ width: 700, flexShrink: 0, height: 500, overflowY: "auto", border: "1px solid #ddd", borderRadius: "6px", padding: "15px" }}>
                            <div className="detail-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <div className="section-title">지점 상세</div>
                                <div className="action-buttons">
                                    <Button onClick={() => { setIsEditMode(true); setIsModalVisible(true); }}>수정</Button>
                                    <Button danger onClick={handleDelete}>삭제</Button>
                                </div>
                            </div>
                            <Table
                                dataSource={[detail]}
                                columns={visibleColumns}
                                pagination={false}
                                rowKey="jijumcd"
                                scroll={{ y: 400 }}   // ✅ 테이블 자체도 스크롤 가능
                            />
                        </div>
                    )}
                </div>

                <Modal
                    title={isEditMode ? "지점 수정" : "지점 등록"}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        initialValues={isEditMode ? detail : { jijumcd: "", jijumclcd: selectedJijumCd || "0", coid: selectedCoId }}
                        onFinish={isEditMode ? handleUpdate : handleCreate}
                        layout="vertical"
                    >
                        <Form.Item name="jijumcd" label="지점 코드" rules={[{ required: true }]}><Input disabled={isEditMode} /></Form.Item>
                        <Form.Item name="jijumname" label="지점 이름"><Input /></Form.Item>
                        <Form.Item name="jijumclcd" label="지점 분류 코드"><Input /></Form.Item>
                        <Form.Item name="qee" label="Qee"><Input /></Form.Item>
                        <Form.Item name="useyn" label="사용 여부"><Input /></Form.Item>
                        <Form.Item name="delpssyn" label="삭제 가능 여부"><Input /></Form.Item>
                        <Form.Item name="floor" label="층"><Input /></Form.Item>
                        <Form.Item name="section" label="섹션"><Input /></Form.Item>
                        <Form.Item name="xpn" label="페이지명"><Input /></Form.Item>
                        <Button type="primary" htmlType="submit">저장</Button>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default Syep1000Page;