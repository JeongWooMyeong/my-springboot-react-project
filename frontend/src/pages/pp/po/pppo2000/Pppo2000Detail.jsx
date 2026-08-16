import { useEffect, useState } from "react";
import TemplatePreview from "../../../components/TemplatePreview/TemplatePreview.jsx";


export default function Pppo2000Detail({ detail }) {

    const [selectedIndex, setSelectedIndex] = useState(0);


    /*
     * 신청건 변경 시 선택 위치 초기화
     */
    useEffect(() => {

        setSelectedIndex(0);

    }, [detail?.ordno]);


    /*
     * 상세 데이터가 없는 경우
     */
    if (!detail) {

        return (
            <div
                style={{
                    width: "100%",
                    minHeight: 600,

                    border: "1px solid #ddd",
                    padding: 10,

                    boxSizing: "border-box"
                }}
            >
                미리보기 상세 데이터가 없습니다.
            </div>
        );

    }


    /*
     * 신규 구조
     * data : []
     *
     * 기존 구조
     * data : {}
     */
    const dataList =
        Array.isArray(detail.data)
            ? detail.data
            : detail.data
                ? [detail.data]
                : [];


    const selectedData =
        dataList[selectedIndex] || {};


    const previewRequest = {
        ...detail,
        data: selectedData
    };


    return (

        <div
            style={{
                display: "flex",

                gap: 8,

                width: "100%",

                minWidth: 0,

                boxSizing: "border-box",

                /*
                 * 높이를 강제로 제한하지 않는다.
                 */
                alignItems: "flex-start"
            }}
        >


            {/* =================================================
                데이터 목록
            ================================================= */}

            <div
                style={{
                    width: 140,

                    flexShrink: 0,

                    border: "1px solid #ddd",

                    display: "flex",

                    flexDirection: "column",

                    boxSizing: "border-box"
                }}
            >

                <div
                    style={{
                        padding: 10,

                        fontWeight: "bold",

                        background: "#f5f5f5",

                        borderBottom: "1px solid #ddd"
                    }}
                >

                    출력 데이터

                    <span
                        style={{
                            marginLeft: 5,

                            color: "#1677ff"
                        }}
                    >
                        {dataList.length}건
                    </span>

                </div>


                <div
                    style={{
                        maxHeight: 600,

                        overflowY: "auto"
                    }}
                >

                    {
                        dataList.length === 0 && (

                            <div
                                style={{
                                    padding: 10
                                }}
                            >
                                데이터 없음
                            </div>

                        )
                    }


                    {
                        dataList.map((item, index) => (

                            <div
                                key={index}

                                onClick={() => {
                                    setSelectedIndex(index);
                                }}

                                style={{
                                    padding: "10px",

                                    cursor: "pointer",

                                    borderBottom:
                                        "1px solid #eee",

                                    background:
                                        selectedIndex === index
                                            ? "#e6f4ff"
                                            : "#fff"
                                }}
                            >
                                {index + 1}번째 데이터
                            </div>

                        ))
                    }

                </div>

            </div>



            {/* =================================================
                미리보기
            ================================================= */}

            <div
                style={{
                    flex: 1,

                    minWidth: 0,

                    border: "1px solid #ddd",

                    boxSizing: "border-box",

                    /*
                     * 중요
                     *
                     * 미리보기의 800px 영역이
                     * 화면보다 커질 수 있으므로
                     * 가로 스크롤을 허용한다.
                     */
                    overflowX: "auto",

                    overflowY: "auto",

                    padding: 10
                }}
            >

                <div
                    style={{
                        /*
                         * TemplatePreview가 800x600을
                         * 유지할 수 있도록 한다.
                         */
                        minWidth: 800,

                        minHeight: 600,

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "flex-start"
                    }}
                >

                    <TemplatePreview
                        key={`${detail.ordno}_${selectedIndex}`}
                        request={previewRequest}
                    />

                </div>

            </div>

        </div>
    );
}