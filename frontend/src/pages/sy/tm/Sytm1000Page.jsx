import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Input } from "antd";
import axios from "axios";
import JijumSelect from "../../components/JijumSelect";
import ClassificationTree from "../../components/ClassificationTree";

const Sytm1000Page = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const [form] = Form.useForm();

    // 선택된 지점
    const jijumcd = Form.useWatch("jijumcd", form);

    // 전체 분류 트리
    const [treeData, setTreeData] = useState([]);

    // 체크된 분류
    const [activeKeys, setActiveKeys] = useState([]);

    // 선택된 분류 노드
    const [selectedKey, setSelectedKey] = useState(null);

    // 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(""); // "add" or "edit"
    const [clname, setClname] = useState("");

    const [clcd, setClcd] = useState(""); // 새 분류 코드 입력값
    const [qeesqo, setQeesqo] = useState("");
    const [useean, setUseean] = useState("Y"); // 기본값 Y

    /**
     * 전체 분류 조회
     */
    const fetchTreeData = () => {
        axios.get("/api/sytm1000")
            .then(res => setTreeData(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTreeData();
    }, []);


    /**
     * 지점 변경 시 활성화된 분류 조회
     */
    useEffect(() => {
        if (!jijumcd) return;


        if (jijumcd === "ALL") {

            // 전체 선택
            axios.get("/api/sytm1000")
                .then(res => {
                    setTreeData(res.data);
                    setActiveKeys([]);
                })
                .catch(err => console.error(err));

        } else {

            // 해당 지점 활성화 분류 조회
            axios.get(`/api/sytm1000/active?jijumcd=${jijumcd}`)
                .then(res => {

                    setActiveKeys(
                        res.data.map(item => String(item.clcd))
                    );

                })
                .catch(err => console.error(err));
        }

    }, [jijumcd]);



    /**
     * 선택 지점만 저장
     */
    const handleSave = () => {

        if (!jijumcd) {
            alert("지점을 선택하세요.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const coid = user?.coid;


        const saveList = activeKeys.map(clcd => ({
            coid: coid,
            jijumcd: jijumcd,
            clcd: clcd,
            ntnid: 'NL01'
        }));


        axios.post("/api/sytm1000/activate", saveList)
            .then(() => {

                alert("선택 지점 저장 완료");

                return axios.get(
                    `/api/sytm1000/active?jijumcd=${jijumcd}`
                );

            })
            .then(res => {

                setActiveKeys(
                    res.data.map(item => String(item.clcd))
                );

            })
            .catch(err => {

                console.error(err);
                alert("저장 실패");

            });
    };



    /**
     * 선택 지점 + 하위 지점 저장
     */
    const handleSaveChildren = async () => {

        if (!jijumcd) {
            alert("지점을 선택하세요.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const coid = user?.coid;


        const saveList = activeKeys.map(clcd => ({
            coid: coid,
            jijumcd: jijumcd,
            clcd: clcd,
            ntnid: 'NL01'
        }));


        axios.post("/api/sytm1000/activate/children", saveList)
            .then(() => {

                alert("하위 지점 저장 완료");

                return axios.get(
                    `/api/sytm1000/active?jijumcd=${jijumcd}`
                );

            })
            .then(res => {

                setActiveKeys(
                    res.data.map(item => String(item.clcd))
                );

            })
            .catch(err => {

                console.error(err);
                alert("저장 실패");

            });
    };

    /** 등록 버튼 */
    const handleAdd = () => {
        // 선택된 분류가 없으면 루트에 등록 (prdnclcd = '0')
        const parentClcd = selectedKey || "0";

        setModalMode("add");
        setIsModalOpen(true);
    };

    /** 수정 버튼 */
    const handleEdit = () => {
        // 선택된 분류가 없으면 루트에 등록 (prdnclcd = '0')
        const parentClcd = selectedKey || "0";
        setModalMode("edit");
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        const targetKeys = selectedKey ? [selectedKey] : activeKeys;
        if (!targetKeys.length) {
            alert("삭제할 분류를 선택하세요.");
            return;
        }
        axios.delete("/api/sytm1000/delete", { data: { clcds: targetKeys } })
            .then(() => {
                alert("삭제 완료");
                setSelectedKey(null);
                setActiveKeys([]);      // 체크 초기화
                fetchTreeData();
            })
            .catch(() => alert("삭제 실패"));
    };

    /** 모달 확인 */
    const handleModalOk = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const coid = user?.coid;

        if (modalMode === "add") {
            const newItem = {
                prdnclcd: selectedKey || "0", // 선택 없으면 루트
                clcd,                         // 새로 입력받은 분류 코드
                clname,                       // 새로 입력받은 분류명
                coid,
                jijumcd,
                qeesqo,                       // 정렬
                useean,                       // 사용유무
                ntnid: "NL01"
            };
            axios.post("/api/sytm1000/add", newItem)
                .then(() => {
                    alert("등록 완료");
                    fetchTreeData(); // 트리 다시 불러오기
                })
                .catch(() => alert("등록 실패"));
        } else if (modalMode === "edit") {

            const updateItem = {
                prdnclcd: selectedKey || "0", // 선택 없으면 루트
                clcd,                         // 새로 입력받은 분류 코드
                clname,                       // 새로 입력받은 분류명
                coid,
                jijumcd,
                qeesqo,                       // 정렬
                useean,                       // 사용유무
                ntnid: "NL01"
            };
            axios.put("/api/sytm1000/update", updateItem)
                .then(() => {
                    alert("수정 완료");
                    fetchTreeData(); // 트리 다시 불러오기
                })
                .catch(() => alert("수정 실패"));
        }

        setIsModalOpen(false);
        setClname("");
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setClname("");
    };



    return (

        <div
            style={{
                display: "flex",
                gap: "20px"
            }}
        >

            <div style={{ flex: 1 }}>

                <Form
                    form={form}
                    initialValues={{
                        jijumcd: ""
                    }}
                >

                    <JijumSelect form={form} />

                </Form>

            </div>



            <div style={{ flex: 2 }}>


                <h2>
                    템플릿 분류 트리
                </h2>

                <div style={{ marginBottom: "10px" }}>
                    <Button type="primary" onClick={handleAdd}>
                        등록
                    </Button>

                    <Button style={{ marginLeft: "10px" }} onClick={handleEdit}>
                        수정
                    </Button>

                    <Button danger style={{ marginLeft: "10px" }} onClick={handleDelete}>
                        삭제
                    </Button>
                </div>


                <ClassificationTree

                    data={treeData}

                    activeKeys={activeKeys}

                    onCheck={setActiveKeys}

                    onSelect={(keys) => setSelectedKey(keys[0])} // 선택 이벤트 추가

                />

                <Modal
                    title={modalMode === "add" ? "새 분류 등록" : "분류 수정"}
                    open={isModalOpen}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    {modalMode === "add" && (
                        <>
                            <Input
                                placeholder="상위 분류 코드(prdnclcd)"
                                value={selectedKey || "0"} // 선택 없으면 '0'
                                disabled
                                style={{ marginBottom: "10px" }}
                            />
                            <Input
                                placeholder="분류 코드(clcd)"
                                value={clcd}
                                onChange={e => setClcd(e.target.value)}
                                style={{ marginBottom: "10px" }}
                            />
                        </>
                    )}

                    <Input
                        placeholder="분류명(clname)"
                        value={clname}
                        onChange={e => setClname(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />

                    <Input
                        placeholder="정렬(qeesqo)"
                        value={qeesqo}
                        onChange={e => setQeesqo(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />

                    <select
                        value={useean}
                        onChange={e => setUseean(e.target.value)}
                        style={{ width: "100%", padding: "6px" }}
                    >
                        <option value="Y">사용</option>
                        <option value="N">미사용</option>
                    </select>
                </Modal>


                <div style={{ marginTop: "15px" }}>


                    <Button
                        type="primary"
                        onClick={handleSave}
                    >
                        선택 지점 저장
                    </Button>



                    <Button
                        style={{
                            marginLeft: "10px"
                        }}
                        onClick={handleSaveChildren}
                    >
                        하위 포함 저장
                    </Button>


                </div>


            </div>


        </div>

    );
};


export default Sytm1000Page;