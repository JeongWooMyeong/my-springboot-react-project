import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "../../../css/layout.css";
import { Tree, Table, Button, Modal, Form, Input } from "antd";

// 트리 구조 변환 함수
function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.menuCd] = {
            key: item.menuCd,
            title: item.menuName,
            children: []
        };
    });

    data.forEach(item => {
        if (item.menuPrntCd === "0") {
            roots.push(map[item.menuCd]);
        } else {
            if (map[item.menuPrntCd]) {
                map[item.menuPrntCd].children.push(map[item.menuCd]);
            }
        }
    });

    return roots;
}

function Sysm1000Page() {
    const [selectedMenuCd, setSelectedMenuCd] = useState(null);
    const [menuData, setMenuData] = useState([]);
    const [menuDetail, setMenuDetail] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();

    // 메뉴 데이터 가져오기
    useEffect(() => {
        fetch("/api/sysm1000/menus")
            .then(res => res.json())
            .then(data => {
                const treeData = buildTree(data);
                setMenuData(treeData);
            });
    }, []);

    // 특정 메뉴 클릭 시 상세 정보 가져오기
    useEffect(() => {
        if (selectedMenuCd) {
            fetch(`/api/sysm1000/menus/${selectedMenuCd}`)
                .then(res => res.json())
                .then(data => setMenuDetail(data));
        }
    }, [selectedMenuCd]);

    // 수정 모드일 때 form 값 세팅
    useEffect(() => {
        if (isEditMode && menuDetail) {
            form.setFieldsValue(menuDetail);
        }
    }, [isEditMode, menuDetail, form]);

    const onSelect = keys => {
        setSelectedMenuCd(keys[0] || null);
    };

    const handleDelete = () => {
        fetch(`/api/sysm1000/menus/${selectedMenuCd}`, { method: "DELETE" })
            .then(() => {
                alert("삭제 완료!");
                setMenuDetail(null);
                return fetch("/api/sysm1000/menus")
                    .then(res => res.json())
                    .then(data => setMenuData(buildTree(data)));
            });
    };

    const handleUpdate = values => {
        fetch(`/api/sysm1000/menus/${selectedMenuCd}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                setMenuDetail(data);
                alert("수정 완료!");
                setIsModalVisible(false);
                //수정 후 트리 갱신
                return fetch("/api/sysm1000/menus")
                    .then(res => res.json())
                    .then(data => setMenuData(buildTree(data)));
            });
    };

    const handleCreate = values => {
        fetch(`/api/sysm1000/menus`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(() => {
                alert("등록 완료!");
                setIsModalVisible(false);
                return fetch("/api/sysm1000/menus")
                    .then(res => res.json())
                    .then(data => setMenuData(buildTree(data)));
            });
    };

    const columns = [
        { title: "메뉴 코드", dataIndex: "menuCd", key: "menuCd" },
        { title: "메뉴 이름", dataIndex: "menuName", key: "menuName" },
        { title: "부모 코드", dataIndex: "menuPrntCd", key: "menuPrntCd" },
        { title: "파일 위치", dataIndex: "fileLct", key: "fileLct" },
        { title: "파일명", dataIndex: "fileName", key: "fileName" },
        { title: "사용 여부", dataIndex: "useYn", key: "useYn" }
    ];

    return (
        <div className="layout">
            <Sidebar selectedMenuCd={selectedMenuCd} />

            <div className="content">
                <h2>Sysm1000 Page</h2>
                <Tree treeData={menuData} onSelect={onSelect} defaultExpandAll />

                {menuDetail && (
                    <>
                        <Table
                            dataSource={[menuDetail]}
                            columns={columns}
                            pagination={false}
                            rowKey="menuCd"
                        />
                        <Button
                            onClick={() => {
                                setIsEditMode(true);
                                setIsModalVisible(true);
                            }}
                        >
                            수정
                        </Button>
                        <Button danger onClick={handleDelete}>
                            삭제
                        </Button>
                    </>
                )}

                <Button
                    type="primary"
                    onClick={() => {
                        form.resetFields();
                        setMenuDetail(null);
                        setIsEditMode(false);
                        setIsModalVisible(true);
                    }}
                >
                    등록
                </Button>

                <Modal
                    title={isEditMode ? "메뉴 수정" : "메뉴 등록"}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        initialValues={
                            isEditMode
                                ? menuDetail
                                : { menuCd: "", menuPrntCd: selectedMenuCd || "0" }
                        }
                        onFinish={isEditMode ? handleUpdate : handleCreate}
                        layout="vertical"
                    >
                        <Form.Item
                            name="menuCd"
                            label="메뉴 코드"
                            rules={[{ required: true, message: "메뉴 코드를 입력하세요" }]}
                        >
                            <Input disabled={isEditMode} />
                        </Form.Item>
                        <Form.Item name="menuName" label="메뉴 이름">
                            <Input />
                        </Form.Item>
                        <Form.Item name="menuPrntCd" label="부모 코드">
                            <Input />
                        </Form.Item>
                        <Form.Item name="fileLct" label="파일 위치">
                            <Input />
                        </Form.Item>
                        <Form.Item name="fileName" label="파일명">
                            <Input />
                        </Form.Item>
                        <Form.Item name="useYn" label="사용 여부">
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            저장
                        </Button>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default Sysm1000Page;
