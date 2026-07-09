import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Checkbox, Pagination } from "antd";
import ClassificationSelectTree from "../../components/ClassificationSelectTree";
import TemplateEditor from "../../components/TemplateEditor";

const Sytm2000Page = () => {
    const [treeData, setTreeData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const pageSize = 6; // 페이지당 6개


    // 분류 트리 데이터 로드
    useEffect(() => {
        axios.get("/api/sytm1000")
            .then(res => setTreeData(res.data))
            .catch(err => console.error(err));
    }, []);

    // 분류 선택 시 템플릿 리스트 로드
    useEffect(() => {
        if (selectedKeys.length > 0) {
            const categoryId = selectedKeys[0];
            axios.get(`/api/sytm2010/category/${categoryId}`)
                .then(res => {
                    setTemplates(res.data);
                    setCurrentPage(1); // 분류 바뀌면 첫 페이지로
                })
                .catch(err => console.error(err));
        } else {
            setTemplates([]);
        }
    }, [selectedKeys]);

    // 템플릿 삭제
    const handleDelete = (id) => {
        axios.delete(`/api/sytm2000/${id}`)
            .then(() => setTemplates(prev => prev.filter(t => t.id !== id)))
            .catch(err => console.error(err));
    };

    // 템플릿 저장 후 리스트 갱신
    const handleEditorSave = () => {
        setIsEditorOpen(false);
        setEditingTemplate(null);
        if (selectedKeys.length > 0) {
            const categoryId = selectedKeys[0];
            axios.get(`/api/sytm2010/category/${categoryId}`)
                .then(res => setTemplates(res.data));
        }
    };

    // 체크박스 선택/해제
    const handleCheck = (id, checked) => {
        setSelectedTemplates(prev =>
            checked ? [...prev, id] : prev.filter(t => t !== id)
        );
    };

    // 현재 페이지에 보여줄 템플릿 slice
    const startIndex = (currentPage - 1) * pageSize;
    const currentTemplates = templates.slice(startIndex, startIndex + pageSize);

    return (
        <div style={{ display: "flex" }}>
            {/* 분류 트리 */}
            <div style={{ width: "300px", borderRight: "1px solid #ddd", padding: "10px" }}>
                <h3>템플릿 분류</h3>
                <ClassificationSelectTree
                    data={treeData}
                    selectedKeys={selectedKeys}
                    onSelect={(keys) => setSelectedKeys(keys)}
                />
            </div>

            {/* 템플릿 리스트 */}
            {templates.length > 0 && (
                <div style={{ flex: 1, padding: "20px" }}>
                    <h3>템플릿 리스트</h3>
                    <button onClick={() => {
                        setEditingTemplate(null);
                        setIsEditorOpen(true);
                    }}>새 템플릿 등록</button>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
                        {currentTemplates.map(t => (
                            <div key={t.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}${t.thumbnailpath}`}
                                    alt={t.title}
                                    style={{ width: "100%" }}
                                />
                                <p>{t.title}</p>
                                <p style={{ color: t.active ? "green" : "gray" }}>
                                    {t.active ? "활성화됨" : "비활성화"}
                                </p>
                                <Checkbox
                                    checked={selectedTemplates.includes(t.id)}
                                    onChange={(e) => handleCheck(t.id, e.target.checked)}
                                >
                                    선택
                                </Checkbox>
                                <button onClick={() => handleDelete(t.id)}>삭제</button>
                                <button onClick={() => {
                                    setEditingTemplate(t);
                                    setIsEditorOpen(true);
                                }}>수정</button>
                            </div>
                        ))}
                    </div>

                    {/* 페이징 */}
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={templates.length}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ marginTop: "20px", textAlign: "center" }}
                    />

                </div>
            )}

            {/* 모달 에디터 */}
            <Modal
                open={isEditorOpen}
                onCancel={() => {
                    setIsEditorOpen(false);
                    setEditingTemplate(null);
                }}
                footer={null}
                width="80%"
                destroyOnHidden
            >
                <TemplateEditor
                    template={editingTemplate}
                    clcd={selectedKeys[0]}   // 현재 선택된 분류 코드 전달
                    onSave={handleEditorSave}   // 저장 후 모달 닫기 + 리스트 갱신
                    isOpen={isEditorOpen}   // ✅ 모달 열림 여부 내려줌
                />
            </Modal>
        </div>
    );
};

export default Sytm2000Page;
