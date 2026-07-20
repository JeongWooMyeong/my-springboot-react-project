export const userColumns = [
    {
        title: "User ID",
        dataIndex: "userid",
        key: "userid",
        width: 100
    },
    {
        title: "User Name",
        dataIndex: "username",
        key: "username",
        width: 150
    },
    {
        title: "Sct No",
        dataIndex: "sctno",
        key: "sctno",
        width: 120
    },
    {
        title: "Jijum Cd",
        dataIndex: "jijumcd",
        key: "jijumcd",
        width: 120
    },
    {
        title: "사용 여부",
        dataIndex: "useean",
        key: "useean",
        width: 100,
        render: (value) =>
            value === "Y"
                ? "사용"
                : "미사용"
    }
];


export const roleColumns = [
    {
        title: "Role ID",
        dataIndex: "roleno",
        key: "roleno"
    },
    {
        title: "Role Name",
        dataIndex: "rolename",
        key: "rolename"
    }
];