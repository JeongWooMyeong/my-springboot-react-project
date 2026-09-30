import { useEffect, useState } from "react";

import {
    getTreeData,
    getActiveList,
    saveActivate,
    saveActivateChildren,
    addClassification,
    updateClassification,
    deleteClassification,
    subscribeTemplate
} from "../../../../services/sytm1000Api";
import useLoading from "../../../components/Loading/useLoading.js";

import {
    useNotification
} from "../../../../context/NotificationContext";


export default function useSytm1000(jijumcd) {

    // 전체 분류 트리
    const [treeData, setTreeData] = useState([]);

    // 체크된 분류
    const [activeKeys, setActiveKeys] = useState([]);

    // 선택된 분류
    const [selectedKey, setSelectedKey] = useState(null);

    // 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalMode, setModalMode] = useState("");

    const[prdnclcd, setPrdnclcd] = useState("");
    // 입력값
    const [clcd, setClcd] = useState("");

    const [clname, setClname] = useState("");

    const [qeesqo, setQeesqo] = useState("");

    const [useean, setUseean] = useState("Y");

    const {
        loading,
        startLoading,
        stopLoading
    } = useLoading();

    const {
        showMessage
    } = useNotification();

    /**
     * 전체 트리 조회
     */
    const fetchTreeData = async () => {

        try{

            const data =
                await getTreeData();

            setTreeData(data);

        }catch(e){

            console.error(e);

        }

    };


    useEffect(() => {

        fetchTreeData();

    }, []);



    /**
     * 지점 변경
     */
    useEffect(() => {

        if(!jijumcd)
            return;


        if(jijumcd === "ALL"){

            fetchTreeData();

            setActiveKeys([]);

            return;

        }


        getActiveList(jijumcd)
            .then(res => {

                setActiveKeys(
                    res.map(item =>
                        String(item.clcd)
                    )
                );

            })
            .catch(console.error);

    }, [jijumcd]);



    /**
     * 등록
     */
    const handleAdd = () => {

        setModalMode("add");

        setPrdnclcd(selectedKey || "0");

        setClcd("");

        setClname("");

        setQeesqo("");

        setUseean("Y");

        setIsModalOpen(true);

    };


    /**
     * 수정
     */
    const handleEdit = () => {

        if (!selectedKey) {
            alert("수정할 분류를 선택하세요.");
            return;
        }

        const target = treeData.find(
            item => String(item.clcd) === String(selectedKey)
        );

        if (!target) {
            alert("선택한 분류를 찾을 수 없습니다.");
            return;
        }

        setModalMode("edit");

        setClcd(target.clcd);
        setPrdnclcd(target.prdnclcd);
        setClname(target.clname);
        setQeesqo(target.qeesqo);
        setUseean(target.useean);

        setIsModalOpen(true);
    };


    /**
     * 삭제
     */
    const handleDelete = async () => {

        const targetKeys =
            selectedKey
                ? [selectedKey]
                : activeKeys;


        if(!targetKeys.length){

            alert("삭제할 분류를 선택하세요.");

            return;

        }


        try{

            await deleteClassification(
                targetKeys
            );

            alert("삭제 완료");

            setSelectedKey(null);

            setActiveKeys([]);

            fetchTreeData();

        }catch(e){

            alert("삭제 실패");

        }

    };



    /**
     * 선택 지점 저장
     */
    const handleSave = async () => {

        if(!jijumcd){

            alert("지점을 선택하세요.");

            return;

        }


        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        const saveList =
            activeKeys.map(clcd => ({

                coid:user.coid,

                jijumcd,

                clcd,

                ntnid:"NL01"

            }));


        try{

            await saveActivate(saveList);

            alert("선택 지점 저장 완료");


            const active =
                await getActiveList(jijumcd);


            setActiveKeys(
                active.map(item =>
                    String(item.clcd)
                )
            );

        }catch(e){

            alert("저장 실패");

        }

    };



    /**
     * 하위 포함 저장
     */
    /**
     * 하위 포함 저장
     */
    const handleSaveChildren = async () => {

        if(!jijumcd){

            alert("지점을 선택하세요.");

            return;

        }


        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        const saveList =
            activeKeys.map(clcd => ({

                coid:user.coid,

                jijumcd,

                clcd,

                ntnid:"NL01"

            }));


        try {


            const response =
                await saveActivateChildren(
                    saveList
                );


            const jobId =
                response.data.jobId;

            //alert(jobId);

            // 요청 알림
            showMessage(
                "템플릿 활성화 요청되었습니다."
            );


            // SSE 구독
            subscribeTemplate(
                jobId,
                showMessage,
                async (status)=>{

                    if(status === "SUCCESS"){


                        const active =
                            await getActiveList(
                                jijumcd
                            );


                        setActiveKeys(
                            active.map(item =>
                                String(item.clcd)
                            )
                        );

                    }

                }
            );


        } catch(e) {


            console.error(e);

            alert("요청 실패");


        }

    };

    /**
     * 모달 확인
     */
    const handleModalOk = async () => {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        const data = {

            prdnclcd,

            clcd,

            clname,

            coid:user.coid,

            jijumcd,

            qeesqo,

            useean,

            ntnid:"NL01"

        };


        try{

            if(modalMode === "add"){

                await addClassification(
                    data
                );

                alert("등록 완료");

            }
            else{

                await updateClassification(
                    data
                );

                alert("수정 완료");

            }


            fetchTreeData();

            setIsModalOpen(false);

            setClname("");

        }catch(e){

            alert(
                modalMode === "add"
                    ? "등록 실패"
                    : "수정 실패"
            );

        }

    };



    const handleModalCancel = () => {

        setIsModalOpen(false);

        setClname("");

    };



    return {
        loading,

        treeData,

        activeKeys,
        setActiveKeys,

        selectedKey,
        setSelectedKey,

        isModalOpen,
        modalMode,

        prdnclcd,
        setPrdnclcd,

        clcd,
        setClcd,

        clname,
        setClname,

        qeesqo,
        setQeesqo,

        useean,
        setUseean,

        handleAdd,
        handleEdit,
        handleDelete,

        handleSave,
        handleSaveChildren,

        handleModalOk,
        handleModalCancel

    };

}