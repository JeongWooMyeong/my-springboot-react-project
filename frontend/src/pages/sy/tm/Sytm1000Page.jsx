import React, { useState, useEffect } from "react";
import { Form, Button } from "antd";
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

    /**
     * 전체 분류 조회
     */
    useEffect(() => {
        axios.get("/api/sytm1000")
            .then(res => {
                setTreeData(res.data);
            })
            .catch(err => console.error(err));
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
    const handleSaveChildren = () => {

        if (!jijumcd) {
            alert("지점을 선택하세요.");
            return;
        }


        axios.post("/api/sytm1000/activate/children", {

            // 기준 지점
            jijumcd: jijumcd,

            // 체크된 분류
            clcds: activeKeys

        })
            .then(() => {
                alert("하위 포함 저장 완료");
            })
            .catch(err => {
                console.error(err);
                alert("저장 실패");
            });

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


                <ClassificationTree

                    data={treeData}

                    activeKeys={activeKeys}

                    onCheck={setActiveKeys}

                />



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