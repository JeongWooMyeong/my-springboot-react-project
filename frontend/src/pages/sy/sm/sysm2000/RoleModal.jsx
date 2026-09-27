import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Space,
    message
} from "antd";

import React, { useEffect, useState } from "react";
import { checkRoleNoDuplicate } from "../../../../services/sysm2000Api.js";


const RoleModal = ({
                       visible,
                       onOk,
                       onCancel,
                       initialValues,
                       mode
                   }) => {

    const [form] = Form.useForm();

    // Role No 중복확인 여부
    const [roleNoChecked, setRoleNoChecked] = useState(false);


    /**
     * 모달 열릴 때 초기값 세팅
     */
    useEffect(() => {

        if (!visible) {
            return;
        }

        console.log("mode =", mode);
        console.log("initialValues =", initialValues);


        // 기존 Form 값 초기화
        form.resetFields();


        // 수정 데이터 세팅
        if (mode === "edit" && initialValues) {

            const values = {
                ...initialValues,

                // 숫자로 넘어오더라도 Input에서 표시되도록 문자열 변환
                roleno:
                    initialValues.roleno !== null &&
                    initialValues.roleno !== undefined
                        ? String(initialValues.roleno)
                        : "",

                rolename:
                    initialValues.rolename ?? "",

                useyn:
                    initialValues.useyn ?? ""
            };


            console.log("Form에 넣을 values =", values);


            form.setFieldsValue(values);


            // 수정에서는 Role No 중복확인 불필요
            setRoleNoChecked(true);

        } else {

            // 등록
            form.resetFields();

            setRoleNoChecked(false);
        }

    }, [
        visible,
        initialValues,
        mode,
        form
    ]);


    /**
     * Role No 변경
     */
    const handleRoleNoChange = () => {

        // Role No가 변경되면 다시 중복확인해야 함
        setRoleNoChecked(false);
    };


    /**
     * Role No 중복확인
     */
    const handleRoleNoDuplicateCheck = async () => {

        const roleno = form.getFieldValue("roleno");


        // 입력 여부
        if (!roleno) {

            message.warning(
                "Role No를 입력하세요."
            );

            setRoleNoChecked(false);

            return;
        }


        // 숫자 10자리 이내
        if (!/^\d{1,10}$/.test(String(roleno))) {

            message.warning(
                "Role No는 숫자 10자리 이내로 입력하세요."
            );

            setRoleNoChecked(false);

            return;
        }


        try {

            const data =
                await checkRoleNoDuplicate(roleno);


            // 존재하면 중복
            if (data?.roleno) {

                message.error(
                    "이미 존재하는 Role No입니다."
                );

                setRoleNoChecked(false);

            } else {

                message.success(
                    "사용 가능한 Role No입니다."
                );

                setRoleNoChecked(true);
            }


        } catch (error) {

            // 404 = 존재하지 않음
            if (error.response?.status === 404) {

                message.success(
                    "사용 가능한 Role No입니다."
                );

                setRoleNoChecked(true);

            } else {

                console.error(
                    "Role No 중복확인 오류",
                    error
                );

                message.error(
                    "중복확인 중 오류가 발생했습니다."
                );

                setRoleNoChecked(false);
            }
        }
    };


    /**
     * 저장
     */
    const handleOk = async () => {

        try {

            // Form validation
            const values =
                await form.validateFields();


            // 등록일 경우 중복확인 필수
            if (
                mode !== "edit" &&
                !roleNoChecked
            ) {

                message.warning(
                    "Role No 중복확인을 해주세요."
                );

                return;
            }


            console.log("저장 values =", values);


            // 부모 저장 API
            await onOk(values);


            // 저장 성공 후 초기화
            form.resetFields();

            setRoleNoChecked(false);


        } catch (error) {

            console.error(
                "저장 실패:",
                error
            );

            message.error(
                mode === "edit"
                    ? "수정에 실패하였습니다."
                    : "등록에 실패하였습니다."
            );
        }
    };


    /**
     * 취소
     */
    const handleCancel = () => {

        onCancel();

        form.resetFields();

        setRoleNoChecked(false);
    };


    return (

        <Modal
            title={
                mode === "edit"
                    ? "역할 수정"
                    : "역할 등록"
            }

            open={visible}

            onOk={handleOk}

            onCancel={handleCancel}
        >

            <Form
                form={form}
                layout="vertical"
            >

                {/* =========================
                    Role No
                ========================= */}

                <Form.Item
                    label="Role No"
                    name="roleno"
                    rules={[
                        {
                            required: true,
                            message: "Role No를 입력하세요."
                        },
                        {
                            pattern: /^\d{1,10}$/,
                            message: "Role No는 숫자 10자리 이내로 입력하세요."
                        }
                    ]}
                >
                    <Input
                        disabled={mode === "edit"}
                        inputMode="numeric"
                        placeholder="숫자만 입력"
                        onChange={handleRoleNoChange}
                        addonAfter={
                            mode !== "edit" ? (
                                <Button
                                    type="link"
                                    onClick={handleRoleNoDuplicateCheck}
                                >
                                    중복확인
                                </Button>
                            ) : null
                        }
                    />
                </Form.Item>


                {/* =========================
                    Role Name
                ========================= */}

                <Form.Item
                    label="Role Name"
                    name="rolename"
                    rules={[
                        {
                            required: true,
                            message:
                                "Role Name을 입력하세요."
                        }
                    ]}
                >

                    <Input />

                </Form.Item>


                {/* =========================
                    사용 여부
                ========================= */}

                <Form.Item
                    label="사용 여부"
                    name="useyn"
                    rules={[
                        {
                            required: true,
                            message:
                                "사용 여부를 선택하세요."
                        }
                    ]}
                >

                    <Select
                        placeholder="사용 여부를 선택하세요."
                        options={[
                            {
                                value: "Y",
                                label: "사용"
                            },
                            {
                                value: "N",
                                label: "미사용"
                            }
                        ]}
                    />

                </Form.Item>

            </Form>

        </Modal>
    );
};


export default RoleModal;
