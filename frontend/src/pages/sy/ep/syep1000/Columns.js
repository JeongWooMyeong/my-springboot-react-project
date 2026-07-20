export const columns = [
    {
        title: "지점 코드",
        dataIndex: "jijumcd",
        key: "jijumcd"
    },
    {
        title: "지점 이름",
        dataIndex: "jijumname",
        key: "jijumname"
    },
    {
        title: "지점 분류 코드",
        dataIndex: "jijumclcd",
        key: "jijumclcd",
        hidden: true
    },
    {
        title: "Qee",
        dataIndex: "qee",
        key: "qee"
    },
    {
        title: "사용 여부",
        dataIndex: "useyn",
        key: "useyn"
    },
    {
        title: "삭제 가능 여부",
        dataIndex: "delpssyn",
        key: "delpssyn",
        hidden: true
    },
    {
        title: "수정일자",
        dataIndex: "upddate",
        key: "upddate",
        hidden: true
    },
    {
        title: "수정자",
        dataIndex: "updpn",
        key: "updpn",
        hidden: true
    },
    {
        title: "국가 ID",
        dataIndex: "ntnid",
        key: "ntnid",
        hidden: true
    },
    {
        title: "회사 ID",
        dataIndex: "coid",
        key: "coid"
    },
    {
        title: "층",
        dataIndex: "floor",
        key: "floor",
        hidden: true
    },
    {
        title: "섹션",
        dataIndex: "section",
        key: "section",
        hidden: true
    },
    {
        title: "구 지점 코드",
        dataIndex: "old_jijumcd",
        key: "old_jijumcd",
        hidden: true
    },
    {
        title: "구 팀 코드",
        dataIndex: "old_teamcd",
        key: "old_teamcd",
        hidden: true
    },
    {
        title: "구 지점 구분",
        dataIndex: "old_jijumgubun",
        key: "old_jijumgubun",
        hidden: true
    },
    {
        title: "구 브랜드 코드",
        dataIndex: "old_brandcd",
        key: "old_brandcd",
        hidden: true
    },
    {
        title: "페이지명",
        dataIndex: "xpn",
        key: "xpn",
        hidden: true
    }
];

export const visibleColumns = columns.filter(
    col => !col.hidden
);