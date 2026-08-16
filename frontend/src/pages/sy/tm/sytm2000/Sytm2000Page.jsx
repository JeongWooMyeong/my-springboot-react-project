import React from "react";

import Sytm2000Tree from "./Sytm2000Tree.jsx";
import Sytm2000List from "./Sytm2000List.jsx";
import Sytm2000Modal from "./Sytm2000Modal.jsx";

import useSytm2000 from "./useSytm2000.js";

import "../../../../css/pages/sy/sytm2000/sytm2000-page.css";


export default function Sytm2000Page() {

    const {

        treeData,

        selectedKeys,
        setSelectedKeys,

        templates,

        currentTemplates,

        selectedTemplates,

        handleCheck,

        handleDelete,

        handleAdd,

        handleEdit,

        currentPage,
        setCurrentPage,

        pageSize,

        isEditorOpen,

        editingTemplate,

        handleEditorClose,

        handleEditorSave

    } = useSytm2000();


    return (

        <div className="sytm2000-page">

            <div className="sytm2000-workspace">


                {/* =========================
                    분류 트리
                   ========================= */}

                <section className="sytm2000-tree-section">

                    <h3>
                        템플릿 분류
                    </h3>

                    <Sytm2000Tree

                        treeData={treeData}

                        selectedKeys={selectedKeys}

                        onSelect={setSelectedKeys}

                    />

                </section>



                {/* =========================
                    템플릿 리스트
                   ========================= */}

                <section className="sytm2000-list-section">

                    <Sytm2000List

                        templates={templates}

                        currentTemplates={currentTemplates}

                        selectedTemplates={selectedTemplates}

                        handleCheck={handleCheck}

                        handleDelete={handleDelete}

                        handleEdit={handleEdit}

                        handleAdd={handleAdd}

                        currentPage={currentPage}

                        setCurrentPage={setCurrentPage}

                        pageSize={pageSize}

                    />

                </section>


            </div>



            {/* =========================
                템플릿 에디터
               ========================= */}

            <Sytm2000Modal

                open={isEditorOpen}

                onCancel={handleEditorClose}

                editingTemplate={editingTemplate}

                clcd={selectedKeys[0]}

                onSave={handleEditorSave}

            />

        </div>

    );
}