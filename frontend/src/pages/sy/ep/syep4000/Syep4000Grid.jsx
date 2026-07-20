import React, { useEffect, useState } from "react";
import { Form } from "antd";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUsers,
    getRoles,
    getUserRoles,
    saveUserRoles
} from "../../../../services/syep4000Api";


import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import RoleTable from "./RoleTable";


export default function Syep4000Grid() {


    const [rows, setRows] = useState([]);

    const [roles, setRoles] = useState([]);

    const [userRoles, setUserRoles] = useState([]);

    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const [clickedUserId, setClickedUserId] = useState(null);

    const [selectedUser, setSelectedUser] = useState(null);


    const [searchParams, setSearchParams] = useState({});


    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [editingUser, setEditingUser] = useState(null);


    const [checkMessage, setCheckMessage] = useState("");

    const [checkStatus, setCheckStatus] = useState("");



    const [searchForm] = Form.useForm();

    const [registerForm] = Form.useForm();



    useEffect(() => {

        fetchUsers();

    }, []);



    const fetchUsers = async(filters={})=>{

        const data =
            await getUsers(filters);


        setRows(
            data.map(
                (row,index)=>({
                    key:index,
                    ...row
                })
            )
        );

    };



    const buildFilters=(values)=>{

        const filters={};


        if(
            values.searchField &&
            values.searchValue
        ){

            filters[
                values.searchField
                ] =
                values.searchValue;

        }


        if(values.useean){

            filters.useean =
                values.useean;

        }


        return filters;

    };



    const handleSearch=()=>{

        const values =
            searchForm.getFieldsValue();


        const filters =
            buildFilters(values);


        setSearchParams(filters);


        fetchUsers(filters);

    };



    const handleUserClick=async(record)=>{

        setSelectedUser(record);

        setClickedUserId(
            record.userid
        );


        const roleList =
            await getRoles();


        setRoles(roleList);



        const userRoleList =
            await getUserRoles(
                record.userid
            );


        setUserRoles(
            userRoleList.map(
                r=>r.roleno
            )
        );

    };



    const handleRegister=async()=>{

        const values =
            await registerForm.validateFields();


        await createUser(values);


        alert("등록 완료");


        closeModal();


        fetchUsers(searchParams);

    };



    const handleUpdate=async()=>{

        const values =
            await registerForm.validateFields();


        await updateUser(
            values.userid,
            values
        );


        alert("수정 완료");


        closeModal();


        fetchUsers(searchParams);

    };



    const handleDelete=async()=>{


        await deleteUsers(
            selectedUserIds
        );


        alert("삭제 완료");


        setSelectedUserIds([]);


        fetchUsers(searchParams);

    };



    const handleSaveRole=async()=>{


        await saveUserRoles(
            clickedUserId,
            userRoles
        );


        alert("저장되었습니다.");

    };



    const closeModal=()=>{

        setIsModalOpen(false);

        registerForm.resetFields();

        setIsEdit(false);

        setCheckMessage("");

        setCheckStatus("");

    };



    return (

        <>


            <UserSearch

                form={searchForm}

                selectedUserIds={
                    selectedUserIds
                }

                onSearch={
                    handleSearch
                }

                onRegister={()=>{

                    setIsEdit(false);

                    registerForm.resetFields();

                    setIsModalOpen(true);

                }}

                onEdit={()=>{

                    const user =
                        rows.find(
                            u =>
                                u.userid ===
                                selectedUserIds[0]
                        );


                    if(user){

                        registerForm.setFieldsValue(
                            user
                        );


                        setEditingUser(
                            user
                        );


                        setIsEdit(true);

                        setIsModalOpen(true);

                    }

                }}

                onDelete={
                    handleDelete
                }

            />



            <UserTable

                rows={rows}

                selectedUserIds={
                    selectedUserIds
                }

                clickedUserId={
                    clickedUserId
                }

                onSelectChange={
                    setSelectedUserIds
                }

                onRowClick={
                    handleUserClick
                }

            />



            <UserModal

                open={isModalOpen}

                form={registerForm}

                isEdit={isEdit}

                editingUser={editingUser}

                onOk={
                    isEdit
                        ? handleUpdate
                        : handleRegister
                }

                onCancel={
                    closeModal
                }

                checkMessage={
                    checkMessage
                }

                checkStatus={
                    checkStatus
                }

                setCheckMessage={
                    setCheckMessage
                }

                setCheckStatus={
                    setCheckStatus
                }

            />



            <RoleTable

                roles={roles}

                userRoles={userRoles}

                onRoleChange={
                    setUserRoles
                }

                onSave={
                    handleSaveRole
                }

            />


        </>

    );

}