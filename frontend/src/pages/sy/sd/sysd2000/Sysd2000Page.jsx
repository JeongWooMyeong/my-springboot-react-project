import React, { useEffect, useState } from "react";
import Search from "./Search.jsx";
import Table from "./Table.jsx";
import { findAll } from "../../../../services/sysd2000Api";
import "../../../../css/pages/sy/sysd2000/sysd2000-page.css";

function Sysd2000Page() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadList = async () => {

        try {
            setLoading(true);

            const data = await findAll();

            setList(data);

        } catch (error) {
            console.error(error);
            alert("실패 이벤트 조회에 실패했습니다.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadList();
    }, []);

    return (
        <div className="sysd2000-page">

            <div className="page-header">
                <h2>상품 실패 이벤트 관리</h2>
            </div>

            <Search onSearch={loadList} />

            <Table
                list={list}
                loading={loading}
                onRefresh={loadList}
            />

        </div>
    );
}

export default Sysd2000Page;