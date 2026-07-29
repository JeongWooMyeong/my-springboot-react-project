import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import "../../../../css/layout.css";

import { buildTree } from "./TreeUtils";
import {
    getCompanies,
    getJijums,
    getJijumDetail,
    createJijum,
    updateJijum,
    deleteJijum
} from "../../../../services/syep1000Api";

import { visibleColumns } from "./Columns";

import JijumTree from "./JijumTree";
import JijumDetail from "./JijumDetail";
import JijumModal from "./JijumModal";


function Syep1000Page() {

    const [companies, setCompanies] = useState([]);

    const [selectedCoId, setSelectedCoId] = useState(null);

    const [treeData, setTreeData] = useState([]);

    const [selectedJijumCd, setSelectedJijumCd] = useState(null);

    const [detail, setDetail] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);



    // 고객사 목록 조회
    useEffect(() => {

        getCompanies()
            .then(setCompanies)
            .catch(console.error);

    }, []);



    // 고객사 선택 -> 지점 조회
    useEffect(() => {

        if (!selectedCoId) return;


        getJijums(selectedCoId)
            .then(data => {
                setTreeData(buildTree(data));
            })
            .catch(console.error);


    }, [selectedCoId]);



    // 지점 선택 -> 상세 조회
    useEffect(() => {

        if (!selectedJijumCd) return;


        getJijumDetail(selectedJijumCd)
            .then(setDetail)
            .catch(console.error);


    }, [selectedJijumCd]);




    const reloadTree = async () => {

        const data = await getJijums(selectedCoId);

        setTreeData(buildTree(data));

    };



    const onSelect = keys => {

        setSelectedJijumCd(keys[0] || null);

    };



    const handleDelete = async () => {

        await deleteJijum(
            selectedJijumCd,
            selectedCoId
        );


        alert("삭제 완료!");


        setDetail(null);

        setSelectedJijumCd(null);


        await reloadTree();

    };



    const handleUpdate = async values => {


        await updateJijum(
            selectedJijumCd,
            values
        );


        alert("수정 완료!");


        setIsModalVisible(false);


        await reloadTree();


        const data =
            await getJijumDetail(selectedJijumCd);

        setDetail(data);

    };



    const handleCreate = async values => {


        await createJijum({

            ...values,

            coid: selectedCoId

        });


        alert("등록 완료!");


        setIsModalVisible(false);


        await reloadTree();

    };



    return (

        <div className="layout">

            <div className="content">


                <div
                    className="tree-headers"
                    style={{
                        width:350,
                        border:"1px solid #ddd",
                        padding:"15px",
                        borderRadius:"6px",
                        marginBottom:"20px"
                    }}
                >

                    <div className="header-title">
                        지점 관리
                    </div>



                    <div
                        className="company-select"
                        style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"10px",
                            marginTop:"10px"
                        }}
                    >

                        <span>
                            고객사 선택 :
                        </span>



                        <Select

                            placeholder="고객사 선택"

                            style={{
                                width:180
                            }}

                            onChange={value => {

                                setSelectedCoId(value);

                                setSelectedJijumCd(null);

                                setDetail(null);

                            }}

                        >

                            {
                                companies.map(c => (

                                    <Select.Option
                                        key={c.coid}
                                        value={c.coid}
                                    >
                                        {c.coname}
                                    </Select.Option>

                                ))
                            }

                        </Select>



                        <Button

                            type="primary"

                            disabled={!selectedCoId}

                            onClick={() => {

                                setDetail(null);

                                setIsEditMode(false);

                                setIsModalVisible(true);

                            }}

                        >
                            등록
                        </Button>


                    </div>


                </div>



                <div
                    style={{
                        display:"flex",
                        gap:"20px",
                        alignItems:"flex-start"
                    }}
                >


                    <JijumTree

                        treeData={treeData}

                        onSelect={onSelect}

                    />



                    <JijumDetail

                        detail={detail}

                        visibleColumns={visibleColumns}

                        onEdit={() => {

                            setIsEditMode(true);

                            setIsModalVisible(true);

                        }}

                        onDelete={handleDelete}

                    />


                </div>



                <JijumModal


                    open={isModalVisible}


                    onCancel={() => {

                        setIsModalVisible(false);

                    }}


                    isEditMode={isEditMode}


                    detail={detail}


                    selectedJijumCd={selectedJijumCd}


                    selectedCoId={selectedCoId}


                    onFinish={
                        isEditMode
                            ? handleUpdate
                            : handleCreate
                    }

                />


            </div>


        </div>

    );

}


export default Syep1000Page;