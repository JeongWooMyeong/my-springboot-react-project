import React, { useEffect, useState } from "react";
import "../../../../css/pages/sy/sysm1000/menu-page.css";

import { Button, Form } from "antd";
import { useMenu } from "../../../../context/MenuContext";

import {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu
} from "../../../../services/sysm1000Api";

import { buildTree } from "./utils";
import MenuTree from "./MenuTree";
import MenuDetail from "./MenuDetail";
import MenuModal from "./MenuModal";


function Sysm1000Page() {

    const { fetchMenus } = useMenu();

    const [selectedMenuCd, setSelectedMenuCd] = useState(null);
    const [menuData, setMenuData] = useState([]);
    const [menuDetail, setMenuDetail] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [form] = Form.useForm();


    // 메뉴 목록 조회
    const loadMenus = async () => {
        const data = await getMenus();
        setMenuData(buildTree(data));
    };


    useEffect(() => {
        loadMenus();
    }, []);


    // 선택 메뉴 상세 조회
    useEffect(() => {

        if (selectedMenuCd) {

            getMenu(selectedMenuCd)
                .then(data => {
                    setMenuDetail(data);
                });

        }

    }, [selectedMenuCd]);


    // 트리 선택
    const onSelect = keys => {

        setSelectedMenuCd(
            keys[0] || null
        );

    };


    // 삭제
    const handleDelete = async () => {

        await deleteMenu(selectedMenuCd);

        alert("삭제 완료!");

        setMenuDetail(null);

        await loadMenus();

        fetchMenus();

    };


    // 수정
    const handleUpdate = async (values) => {

        const data = await updateMenu(
            selectedMenuCd,
            values
        );

        setMenuDetail(data);

        alert("수정 완료!");

        setIsModalVisible(false);

        await loadMenus();

        fetchMenus();

    };


    // 등록
    const handleCreate = async (values) => {

        await createMenu(values);

        alert("등록 완료!");

        setIsModalVisible(false);

        await loadMenus();

        fetchMenus();

    };


    const columns = [

        {
            title: "메뉴 코드",
            dataIndex: "menuCd",
            key: "menuCd"
        },

        {
            title: "메뉴 이름",
            dataIndex: "menuName",
            key: "menuName"
        },

        {
            title: "부모 코드",
            dataIndex: "menuPrntCd",
            key: "menuPrntCd"
        },

        {
            title: "파일 위치",
            dataIndex: "fileLct",
            key: "fileLct"
        },

        {
            title: "파일명",
            dataIndex: "fileName",
            key: "fileName"
        },

        {
            title: "실행 URL",
            dataIndex: "dedName",
            key: "dedName"
        },

        {
            title: "페이지명",
            dataIndex: "xpn",
            key: "xpn"
        },

        {
            title: "사용 여부",
            dataIndex: "useYn",
            key: "useYn"
        }

    ];


    return (

        <div className="menu-page">

            {/* 상단 */}
            <div className="tree-header">

                <h2 className="section-title">
                    메뉴관리
                </h2>

                <Button
                    type="primary"
                    onClick={() => {

                        form.resetFields();

                        setMenuDetail(null);

                        setIsEditMode(false);

                        setIsModalVisible(true);

                    }}
                >
                    등록
                </Button>

            </div>


            {/* 메뉴 트리 + 상세 */}
            <div className="menu-workspace">

                <MenuTree
                    menuData={menuData}
                    onSelect={onSelect}
                />

                <MenuDetail
                    menuDetail={menuDetail}
                    columns={columns}
                    handleDelete={handleDelete}
                    setIsEditMode={setIsEditMode}
                    setIsModalVisible={setIsModalVisible}
                />

            </div>


            {/* 등록/수정 Modal */}
            <MenuModal

                isModalVisible={isModalVisible}

                setIsModalVisible={setIsModalVisible}

                isEditMode={isEditMode}

                menuDetail={menuDetail}

                selectedMenuCd={selectedMenuCd}

                form={form}

                handleCreate={handleCreate}

                handleUpdate={handleUpdate}

            />

        </div>

    );

}


export default Sysm1000Page;