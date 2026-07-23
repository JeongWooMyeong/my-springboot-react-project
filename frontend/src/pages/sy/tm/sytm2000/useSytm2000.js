import {
    useEffect,
    useState
} from "react";

import {
    getCategoryTree,
    getTemplatesByCategory,
    deleteTemplate
} from "../../../../services/sytm2000Api";


export default function useSytm2000(){


    const [treeData,setTreeData] =
        useState([]);


    const [selectedKeys,setSelectedKeys] =
        useState([]);


    const [templates,setTemplates] =
        useState([]);


    const [selectedTemplates,setSelectedTemplates] =
        useState([]);


    const [isEditorOpen,setIsEditorOpen] =
        useState(false);


    const [editingTemplate,setEditingTemplate] =
        useState(null);


    const [currentPage,setCurrentPage] =
        useState(1);


    const pageSize = 6;



    /*
     * 분류 트리 조회
     */
    const fetchTreeData = async()=>{

        try{

            const data =
                await getCategoryTree();

            setTreeData(
                data || []
            );

        }catch(e){

            console.error(e);

        }

    };



    /*
     * 템플릿 조회
     */
    const fetchTemplates = async(keys)=>{


        if(!keys || keys.length===0){

            setTemplates([]);

            return;

        }


        try{

            const data =
                await getTemplatesByCategory(
                    keys[0]
                );


            setTemplates(
                data || []
            );


            setCurrentPage(1);


        }catch(e){

            console.error(e);

        }

    };



    useEffect(()=>{

        fetchTreeData();

    },[]);



    useEffect(()=>{

        fetchTemplates(
            selectedKeys
        );

    },[selectedKeys]);




    /*
     * 등록
     */
    const handleAdd = ()=>{


        setEditingTemplate(
            null
        );


        setIsEditorOpen(
            true
        );

    };



    /*
     * 수정
     */
    const handleEdit = (template)=>{


        console.log(
            "수정 버튼 클릭:",
            template
        );


        setEditingTemplate(
            template
        );


        setIsEditorOpen(
            true
        );

    };



    /*
     * 삭제
     */
    const handleDelete = async(id,clcd)=>{


        try{


            await deleteTemplate(
                id,
                clcd
            );


            setTemplates(prev=>
                prev.filter(
                    t=>t.id!==id
                )
            );


            alert(
                "삭제 완료"
            );


        }catch(e){


            console.error(e);


            alert(
                "삭제 실패"
            );

        }

    };



    /*
     * 에디터 저장 완료
     */
    const handleEditorSave = async()=>{


        setIsEditorOpen(false);


        setEditingTemplate(null);


        await fetchTemplates(
            selectedKeys
        );


    };



    /*
     * 모달 닫기
     */
    const handleEditorClose = ()=>{


        setIsEditorOpen(false);


        setEditingTemplate(null);

    };



    /*
     * 체크박스
     */
    const handleCheck=(id,checked)=>{


        setSelectedTemplates(prev=>


            checked

                ?

                [
                    ...prev,
                    id
                ]

                :

                prev.filter(
                    t=>t!==id
                )


        );

    };



    /*
     * 페이징
     */
    const startIndex =
        (currentPage-1)
        *
        pageSize;


    const currentTemplates =
        templates.slice(
            startIndex,
            startIndex+pageSize
        );



    return{


        treeData,


        selectedKeys,
        setSelectedKeys,


        templates,


        currentTemplates,


        selectedTemplates,


        handleCheck,


        handleDelete,


        handleAdd,


        handleEdit,


        currentPage,
        setCurrentPage,


        pageSize,


        isEditorOpen,
        setIsEditorOpen,


        editingTemplate,
        setEditingTemplate,


        handleEditorClose,


        handleEditorSave


    };


}