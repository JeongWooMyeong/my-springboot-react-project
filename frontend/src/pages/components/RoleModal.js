import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

const RoleModal = ({ visible, onOk, onCancel, initialValues, mode }) => {
    const [form] = Form.useForm();

    // 모달 열릴 때마다 초기값 세팅
    useEffect(() => {
        if (visible) {
            form.setFieldsValue(initialValues);
        }
    }, [visible, initialValues, form]);

    return (
        <Modal
            title={mode === "edit" ? "역할 수정" : "역할 등록"}
            open={visible}
            onOk={() => {
                form.validateFields().then(values => {
                    onOk(values);
                    form.resetFields();
                });
            }}
            onCancel={() => {
                onCancel();
                form.resetFields();
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Role No"
                    name="roleno"
                    rules={[{ required: true, message: "Role No를 입력하세요" }]}
                >
                    <Input disabled={mode === "edit"} />
                </Form.Item>

                <Form.Item
                    label="Role Name"
                    name="rolename"
                    rules={[{ required: true, message: "Role Name을 입력하세요" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="사용 여부"
                    name="useyn"
                    rules={[{ required: true, message: "사용 여부를 선택하세요" }]}
                >
                    <Select>
                        <Select.Option value="Y">Y</Select.Option>
                        <Select.Option value="N">N</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RoleModal;
