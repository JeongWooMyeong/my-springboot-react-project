import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";

function MenuModal({
                       isModalVisible,
                       setIsModalVisible,
                       isEditMode,
                       menuDetail,
                       selectedMenuCd,
                       form,
                       handleCreate,
                       handleUpdate
                   }) {

    const [isRootMenu, setIsRootMenu] = useState(false);
    const [prevParentCd, setPrevParentCd] = useState("");



    // 수정 모드 값 세팅
    useEffect(() => {

        if (isEditMode && menuDetail) {

            form.setFieldsValue(menuDetail);

            const parentCd = menuDetail.menuPrntCd;

            setIsRootMenu(parentCd === "0");

            setPrevParentCd(parentCd);

        }

    }, [
        isEditMode,
        menuDetail,
        form
    ]);



    // 등록 모드 초기값
    useEffect(() => {

        if (!isEditMode && isModalVisible) {

            form.resetFields();

            const parentCd = selectedMenuCd || "0";

            setIsRootMenu(false);

            setPrevParentCd(parentCd);


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



    // 최상위 체크
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
                menuPrntCd: prevParentCd
            });

        }

    };



    return (

        <Modal
            title={isEditMode ? "메뉴 수정" : "메뉴 등록"}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
        >

            <Form
                form={form}
                onFinish={
                    isEditMode
                        ? handleUpdate
                        : handleCreate
                }
                layout="vertical"
            >


                <Form.Item
                    name="menuCd"
                    label="메뉴 코드"
                    rules={[
                        {
                            required: true,
                            message:
                                "메뉴 코드를 입력하세요"
                        }
                    ]}
                >
                    <Input disabled={isEditMode} />
                </Form.Item>



                <Form.Item
                    name="menuName"
                    label="메뉴 이름"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    label={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >

                            <span>
                                부모 코드
                            </span>


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
                        />

                    </Form.Item>


                </Form.Item>




                <Form.Item
                    name="fileLct"
                    label="파일 위치"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name="fileName"
                    label="파일명"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name="dedName"
                    label="실행 URL"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name="xpn"
                    label="페이지명"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name="useYn"
                    label="사용 여부"
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


export default MenuModal;