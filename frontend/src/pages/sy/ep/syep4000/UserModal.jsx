import React from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Select
} from "antd";

import JijumSelect from "../../../components/JijumSelect.jsx";

import {
    checkUserId
} from "../../../../services/syep4000Api";


export default function UserModal({

                                      open,

                                      isEdit,

                                      form,

                                      editingUser,

                                      onOk,

                                      onCancel,

                                      checkMessage,

                                      checkStatus,

                                      setCheckMessage,

                                      setCheckStatus

                                  }) {


    const handleCheckId = async () => {

        const userid =
            form.getFieldValue("userid");


        if (!userid) {

            setCheckMessage(
                "먼저 User ID를 입력하세요."
            );

            setCheckStatus(
                "error"
            );

            return;
        }


        try {

            const result =
                await checkUserId(userid);


            if(result){

                setCheckMessage(
                    "이미 사용 중인 ID입니다."
                );

                setCheckStatus(
                    "error"
                );

            }else{

                setCheckMessage(
                    "사용 가능한 ID입니다."
                );

                setCheckStatus(
                    "success"
                );

            }


        } catch(e){

            setCheckMessage(
                "중복 확인 중 오류가 발생했습니다."
            );

            setCheckStatus(
                "error"
            );

        }

    };



    return (

        <Modal

            title={
                isEdit
                    ? "사용자 수정"
                    : "사용자 등록"
            }

            open={open}

            onOk={onOk}

            onCancel={onCancel}

            okText={
                isEdit
                    ? "수정"
                    : "등록"
            }

            cancelText="취소"

        >


            <Form

                form={form}

                layout="vertical"

            >


                <Form.Item
                    label="User ID"
                    required
                >

                    <Input.Group compact>


                        <Form.Item

                            name="userid"

                            noStyle

                            rules={[
                                {
                                    required:true,
                                    message:
                                        "User ID를 입력하세요"
                                }
                            ]}

                        >

                            <Input

                                disabled={isEdit}

                                style={{
                                    width:
                                        "calc(100% - 100px)",
                                    marginRight:8
                                }}

                            />


                        </Form.Item>


                        {!isEdit && (

                            <Button

                                style={{
                                    width:92
                                }}

                                onClick={
                                    handleCheckId
                                }

                            >

                                중복확인

                            </Button>

                        )}


                    </Input.Group>


                    {
                        checkMessage && (

                            <div

                                style={{
                                    marginTop:6,
                                    color:
                                        checkStatus==="success"
                                            ? "green"
                                            : "blue"
                                }}

                            >

                                {checkMessage}

                            </div>

                        )
                    }


                </Form.Item>




                <Form.Item

                    name="username"

                    label="User Name"

                    rules={[
                        {
                            required:true,
                            message:
                                "User Name을 입력하세요"
                        }
                    ]}

                >

                    <Input />

                </Form.Item>




                <Form.Item

                    name="sctno"

                    label="Password"

                    rules={[
                        {
                            required:!isEdit,
                            message:
                                "Password를 입력하세요"
                        }
                    ]}

                >

                    <Input.Password />

                </Form.Item>




                <JijumSelect

                    form={form}

                    initialJijumCd={
                        editingUser?.jijumcd
                    }

                />





                <Form.Item

                    name="tel"

                    label="전화번호"

                    rules={[
                        {
                            required:true,
                            message:
                                "전화번호를 입력하세요"
                        },
                        {
                            pattern:
                                /^01[0-9]-\d{3,4}-\d{4}$/,

                            message:
                                "010-1234-5678 형식입니다"
                        }
                    ]}

                >

                    <Input
                        placeholder="010-1234-5678"
                    />

                </Form.Item>




                <Form.Item

                    name="useremail"

                    label="이메일"

                    rules={[
                        {
                            required:true,
                            type:"email",
                            message:
                                "올바른 이메일을 입력하세요"
                        }
                    ]}

                >

                    <Input />

                </Form.Item>




                <Form.Item

                    name="useean"

                    label="사용 여부"

                    initialValue="Y"

                    rules={[
                        {
                            required:true,
                            message:
                                "사용 여부를 선택하세요"
                        }
                    ]}

                >

                    <Select>

                        <Select.Option value="Y">
                            사용
                        </Select.Option>

                        <Select.Option value="N">
                            미사용
                        </Select.Option>


                    </Select>


                </Form.Item>


            </Form>


        </Modal>

    );
}