import React from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Select
} from "antd";

export default function JijumModal({
                                       open,
                                       onCancel,
                                       isEditMode,
                                       detail,
                                       selectedJijumCd,
                                       selectedCoId,
                                       onFinish
                                   }) {
    const [form] = Form.useForm();

    React.useEffect(() => {
        if (open) {
            if (isEditMode && detail) {
                form.setFieldsValue(detail);
            } else {
                form.resetFields();

                form.setFieldsValue({
                    jijumcd: "",
                    jijumclcd: selectedJijumCd || "0",
                    coid: selectedCoId,
                    useyn: "Y",
                    delpssyn: "N"
                });
            }
        }
    }, [
        open,
        isEditMode,
        detail,
        selectedJijumCd,
        selectedCoId,
        form
    ]);


    return (
        <Modal
            title={
                isEditMode
                    ? "지점 수정"
                    : "지점 등록"
            }
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >

                <Form.Item
                    name="jijumcd"
                    label="지점 코드"
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input disabled={isEditMode} />
                </Form.Item>


                <Form.Item
                    name="jijumname"
                    label="지점 이름"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="jijumclcd"
                    label="지점 분류 코드"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="qee"
                    label="Qee"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="useyn"
                    label="사용 여부"
                    rules={[
                        {
                            required: true,
                            message: "사용 여부를 선택하세요"
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


                <Form.Item
                    name="delpssyn"
                    label="삭제 가능 여부"
                    rules={[
                        {
                            required: true,
                            message: "삭제 가능 여부를 선택하세요"
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="Y">
                            가능
                        </Select.Option>

                        <Select.Option value="N">
                            불가능
                        </Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    name="floor"
                    label="층"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="section"
                    label="섹션"
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="xpn"
                    label="페이지명"
                >
                    <Input />
                </Form.Item>


                <Button
                    type="primary"
                    htmlType="submit"
                >
                    저장
                </Button>

            </Form>
        </Modal>
    );
}
