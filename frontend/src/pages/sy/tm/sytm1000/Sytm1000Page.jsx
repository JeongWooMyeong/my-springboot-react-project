import React from "react";
import { Form } from "antd";

import JijumSelect from "../../../components/JijumSelect.jsx";

import Sytm1000Toolbar from "./Sytm1000Toolbar.jsx";
import Sytm1000Tree from "./Sytm1000Tree.jsx";
import Sytm1000Modal from "./Sytm1000Modal.jsx";

import useSytm1000 from "./useSytm1000.js";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay.jsx";

import "../../../../css/pages/sy/sytm1000/sytm1000-page.css";


export default function Sytm1000Page() {

    const [form] = Form.useForm();

    /*
     * 선택된 지점
     */
    const jijumcd =
        Form.useWatch(
            "jijumcd",
            form
        );


    /*
     * Hook
     */
    const {
        loading,

        treeData,

        activeKeys,
        setActiveKeys,

        selectedKey,
        setSelectedKey,

        isModalOpen,
        modalMode,

        clcd,
        setClcd,

        clname,
        setClname,

        qeesqo,
        setQeesqo,

        useean,
        setUseean,

        handleAdd,
        handleEdit,
        handleDelete,

        handleSave,
        handleSaveChildren,

        handleModalOk,
        handleModalCancel

    } = useSytm1000(
        jijumcd
    );


    return (
        <div className="sytm1000-page">

            <LoadingOverlay
                open={loading}
                text="하위 지점 저장중..."
            />


            <div className="sytm1000-workspace">

                {/* =========================
                    왼쪽 - 지점 선택
                   ========================= */}

                <section className="sytm1000-select-section">

                    <Form
                        form={form}
                        initialValues={{
                            jijumcd: ""
                        }}
                    >

                        <JijumSelect
                            form={form}
                        />

                    </Form>

                </section>


                {/* =========================
                    오른쪽 - 템플릿 분류
                   ========================= */}

                <section className="sytm1000-tree-section">

                    <h2>
                        템플릿 분류 트리
                    </h2>


                    <Sytm1000Toolbar

                        handleAdd={handleAdd}

                        handleEdit={handleEdit}

                        handleDelete={handleDelete}

                        handleSave={handleSave}

                        handleSaveChildren={
                            handleSaveChildren
                        }

                    />


                    <Sytm1000Tree

                        treeData={treeData}

                        activeKeys={activeKeys}

                        setActiveKeys={setActiveKeys}

                        setSelectedKey={
                            setSelectedKey
                        }

                    />


                    <Sytm1000Modal

                        isModalOpen={
                            isModalOpen
                        }

                        modalMode={
                            modalMode
                        }

                        selectedKey={
                            selectedKey
                        }

                        clcd={clcd}
                        setClcd={setClcd}

                        clname={clname}
                        setClname={setClname}

                        qeesqo={qeesqo}
                        setQeesqo={setQeesqo}

                        useean={useean}
                        setUseean={setUseean}

                        handleModalOk={
                            handleModalOk
                        }

                        handleModalCancel={
                            handleModalCancel
                        }

                    />

                </section>

            </div>

        </div>
    );
}