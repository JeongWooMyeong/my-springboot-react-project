import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    Checkbox,
    Select,
    message,
    Space
} from "antd";
import axios from "axios";
import {checkMenuCdDuplicate} from "../../../../services/sysm1000Api.js";

function MenuModal({
                       isModalVisible,
                       setIsModalVisible,
                       isEditMode,
                       menuDetail,
                       selectedMenuCd,
                       parentMenus = [],
                       form,
                       handleCreate,
                       handleUpdate
                   }) {

    const [isRootMenu, setIsRootMenu] = useState(false);
    const [prevParentCd, setPrevParentCd] = useState("");

    // 메뉴 코드 중복확인 여부
    const [menuCdChecked, setMenuCdChecked] = useState(false);

    // --------------------------------------------------
    // 부모 메뉴 Select 옵션
    // --------------------------------------------------

    const parentMenuOptions = parentMenus.map((menu, index) => ({
        value: menu.menuCd,
        label: `${String(index + 1).padStart(2, "0")} ${menu.menuName} (${menu.menuCd})`
    }));


    // --------------------------------------------------
    // 수정 모드 값 세팅
    // --------------------------------------------------

    useEffect(() => {

        if (isEditMode && menuDetail) {

            form.setFieldsValue(menuDetail);

            const parentCd = menuDetail.menuPrntCd;

            setIsRootMenu(parentCd === "0");
            setPrevParentCd(parentCd);

            // 수정 모드에서는 이미 존재하는 코드이므로
            // 중복확인을 요구하지 않음
            setMenuCdChecked(true);
        }

    }, [
        isEditMode,
        menuDetail,
        form
    ]);


    // --------------------------------------------------
    // 등록 모드 초기값
    // --------------------------------------------------

    useEffect(() => {

        if (!isEditMode && isModalVisible) {

            form.resetFields();

            const parentCd = selectedMenuCd || "0";

            setIsRootMenu(false);
            setPrevParentCd(parentCd);

            setMenuCdChecked(false);

            form.setFieldsValue({
                menuCd: "",
                menuPrntCd: parentCd
            });
        }

    }, [
        isEditMode,
        isModalVisible,
        selectedMenuCd,
        form
    ]);


    // --------------------------------------------------
    // 모달 닫을 때 상태 초기화
    // --------------------------------------------------

    const handleCancel = () => {

        form.resetFields();

        setIsRootMenu(false);
        setPrevParentCd("");
        setMenuCdChecked(false);

        setIsModalVisible(false);
    };


    // --------------------------------------------------
    // 메뉴 코드 변경
    // --------------------------------------------------

    const handleMenuCdChange = () => {

        // 코드를 변경하면 기존 중복확인은 무효
        setMenuCdChecked(false);
    };


    // --------------------------------------------------
    // 메뉴 코드 중복확인
    // --------------------------------------------------

    const handleMenuCdDuplicateCheck = async () => {

        const menuCd = form.getFieldValue("menuCd");

        if (!menuCd) {
            message.warning("메뉴 코드를 입력하세요.");
            return;
        }

        // 2자리 영문 + 숫자
        const menuCdPattern = /^[A-Za-z]{2}\d+$/;

        if (!menuCdPattern.test(menuCd)) {

            message.warning(
                "메뉴 코드는 영문 2자리 + 숫자 형식으로 입력하세요."
            );

            return;
        }

        try {

            const data = await checkMenuCdDuplicate(menuCd);

            const duplicate = data?.menuCd;

            console.log(duplicate);

            if (duplicate) {

                message.error(
                    "이미 사용 중인 메뉴 코드입니다."
                );

                setMenuCdChecked(false);

            } else {

                message.success(
                    "사용 가능한 메뉴 코드입니다."
                );

                setMenuCdChecked(true);
            }

        } catch (error) {

            console.error(
                "메뉴 코드 중복확인 오류",
                error
            );

            message.error(
                "메뉴 코드 중복확인 중 오류가 발생했습니다."
            );

            setMenuCdChecked(false);
        }
    };


    // --------------------------------------------------
    // 최상위 메뉴 체크
    // --------------------------------------------------

    const handleRootCheck = (e) => {

        const checked = e.target.checked;

        setIsRootMenu(checked);

        if (checked) {

            const currentParentCd =
                form.getFieldValue("menuPrntCd");

            setPrevParentCd(currentParentCd);

            form.setFieldsValue({
                menuPrntCd: "0"
            });

        } else {

            form.setFieldsValue({
                menuPrntCd: prevParentCd || selectedMenuCd
            });
        }
    };


    // --------------------------------------------------
    // 저장
    // --------------------------------------------------

    const handleFinish = async (values) => {

        // 등록일 경우 중복확인 필수
        if (!isEditMode && !menuCdChecked) {

            message.warning(
                "메뉴 코드 중복확인을 해주세요."
            );

            return;
        }

        // 최상위 메뉴인 경우 parent = 0
        if (isRootMenu) {
            values.menuPrntCd = "0";
        }

        try {

            if (isEditMode) {

                await handleUpdate(values);

            } else {

                await handleCreate(values);
            }

        } catch (error) {

            console.error(
                "메뉴 저장 오류",
                error
            );
        }
    };


    return (

        <Modal
            title={
                isEditMode
                    ? "메뉴 수정"
                    : "메뉴 등록"
            }
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnHidden
        >

            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
            >

                {/* ------------------------------------ */}
                {/* 메뉴 코드 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="menuCd"
                    label="메뉴 코드"
                    rules={[
                        {
                            required: true,
                            message: "메뉴 코드를 입력하세요."
                        },
                        {
                            pattern: /^[A-Za-z]{2}\d+$/,
                            message:
                                "영문 2자리 + 숫자 형식으로 입력하세요."
                        }
                    ]}
                >

                    <Space.Compact style={{ width: "100%" }}>

                        <Input
                            disabled={isEditMode}
                            placeholder="예: KM10000001"
                            onChange={handleMenuCdChange}
                        />

                        {!isEditMode && (

                            <Button
                                type="primary"
                                onClick={
                                    handleMenuCdDuplicateCheck
                                }
                            >
                                중복확인
                            </Button>

                        )}

                    </Space.Compact>

                </Form.Item>


                {/* ------------------------------------ */}
                {/* 메뉴 이름 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="menuName"
                    label="메뉴 이름"
                >
                    <Input />
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 부모 메뉴 */}
                {/* ------------------------------------ */}

                <Form.Item
                    label={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <span>부모 코드</span>

                            <Checkbox
                                checked={isRootMenu}
                                onChange={handleRootCheck}
                            >
                                level 0 최상위 분류
                            </Checkbox>
                        </div>
                    }
                >
                    <Form.Item
                        name="menuPrntCd"
                        noStyle
                    >
                        <Input
                            disabled={isRootMenu}
                            placeholder="부모 메뉴 코드를 입력하세요."
                        />
                    </Form.Item>
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 파일 위치 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="fileLct"
                    label="파일 위치"
                >
                    <Input />
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 파일명 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="fileName"
                    label="파일명"
                >
                    <Input />
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 실행 URL */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="dedName"
                    label="실행 URL"
                >
                    <Input />
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 페이지명 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="xpn"
                    label="페이지명"
                >
                    <Input />
                </Form.Item>


                {/* ------------------------------------ */}
                {/* 사용 여부 */}
                {/* ------------------------------------ */}

                <Form.Item
                    name="useYn"
                    label="사용 여부"
                    rules={[
                        {
                            required: true,
                            message: "사용 여부를 선택하세요."
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


                {/* ------------------------------------ */}
                {/* 저장 */}
                {/* ------------------------------------ */}

                <Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        저장
                    </Button>

                </Form.Item>

            </Form>

        </Modal>
    );
}

export default MenuModal;
