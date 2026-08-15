import React from "react";
import Retry from "./Retry.jsx";

function Table({
                   list,
                   loading,
                   onRefresh
               }) {

    return (
        <div className="content">

            <div className="content-header">

                <h3>실패 이벤트 목록</h3>

                <span>
                    전체 {list.length}건
                </span>

            </div>

            <div className="table-wrapper">

                <table className="table">

                    <thead>
                    <tr>
                        <th className="col-id">ID</th>
                        <th className="col-event-type">이벤트 유형</th>
                        <th className="col-product-id">상품 ID</th>
                        <th className="col-status">상태</th>
                        <th className="col-error">실패 사유</th>
                        <th className="col-date">발생 일시</th>
                        <th className="col-date">처리 일시</th>
                        <th className="col-action">재처리</th>
                    </tr>
                    </thead>

                    <tbody>

                    {loading ? (

                        <tr>
                            <td
                                colSpan="8"
                                className="loading"
                            >
                                조회 중입니다.
                            </td>
                        </tr>

                    ) : list.length === 0 ? (

                        <tr>
                            <td
                                colSpan="8"
                                className="empty"
                            >
                                실패 이벤트가 없습니다.
                            </td>
                        </tr>

                    ) : (

                        list.map((item) => (

                            <tr key={item.id}>

                                <td>
                                    {item.id}
                                </td>

                                <td>
                                    {item.eventType || "-"}
                                </td>

                                <td>
                                    {item.productId || "-"}
                                </td>

                                <td>
                                    <span
                                        className={`status ${
                                            item.status === "FAILED"
                                                ? "status-failed"
                                                : "status-resolved"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td
                                    className="error-message"
                                    title={item.errorMessage || ""}
                                >
                                    {item.errorMessage || "-"}
                                </td>

                                <td>
                                    {item.createdAt || "-"}
                                </td>

                                <td>
                                    {item.resolvedAt || "-"}
                                </td>

                                <td>
                                    {item.status === "FAILED" && (
                                        <Retry
                                            id={item.id}
                                            onSuccess={onRefresh}
                                        />
                                    )}
                                </td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Table;