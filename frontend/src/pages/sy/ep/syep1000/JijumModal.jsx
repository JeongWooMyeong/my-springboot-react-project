import React from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Select, Checkbox
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

    const [isLevel0, setIsLevel0] = React.useState(false);

    React.useEffect(() => {
        if (open) {
            if (isEditMode && detail) {
                form.setFieldsValue(detail);
                setIsLevel0(detail.jijumclcd === "0");
            } else {
                form.resetFields();

                const parentCode = selectedJijumCd || "0";

                form.setFieldsValue({
                    jijumcd: "",
                    jijumclcd: selectedJijumCd || "0",
                    coid: selectedCoId,
                    useyn: "Y",
                    delpssyn: "N"
                });

                setIsLevel0(parentCode === "0");
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
                    label="지점 상위 코드"
                >
                    <Input.Group compact>
                        <Form.Item
                            name="jijumclcd"
                            noStyle
                        >
                            <Input
                                disabled
                                style={{
                                    width: "calc(100% - 100px)"
                                }}
                            />
                        </Form.Item>

                        <Checkbox
                            style={{
                                marginLeft: 12
                            }}
                            checked={isLevel0}
                            onChange={(e) => {
                                const checked = e.target.checked;

                                setIsLevel0(checked);

                                form.setFieldValue(
                                    "jijumclcd",
                                    checked
                                        ? "0"
                                        : selectedJijumCd || ""
                                );
                            }}
                        >
                            Level0
                        </Checkbox>
                    </Input.Group>
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
