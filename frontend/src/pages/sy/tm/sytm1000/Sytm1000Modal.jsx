import React from "react";

import {
    Modal,
    Input
} from "antd";


export default function Sytm1000Modal({

                                          isModalOpen,

                                          modalMode,

                                          selectedKey,

                                          clcd,
                                          setClcd,

                                          clname,
                                          setClname,

                                          qeesqo,
                                          setQeesqo,

                                          useean,
                                          setUseean,

                                          handleModalOk,
                                          handleModalCancel

                                      }) {

    return (

        <Modal
            title={
                modalMode === "add"
                    ? "새 분류 등록"
                    : "분류 수정"
            }
            open={isModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
        >

            {
                modalMode === "add"
                &&
                (
                    <>

                        <Input
                            placeholder="상위 분류 코드(prdnclcd)"
                            value={selectedKey || "0"}
                            disabled
                            style={{
                                marginBottom:"10px"
                            }}
                        />

                        <Input
                            placeholder="분류 코드(clcd)"
                            value={clcd}
                            onChange={e =>
                                setClcd(
                                    e.target.value
                                )
                            }
                            style={{
                                marginBottom:"10px"
                            }}
                        />

                    </>
                )
            }


            <Input
                placeholder="분류명(clname)"
                value={clname}
                onChange={e =>
                    setClname(
                        e.target.value
                    )
                }
                style={{
                    marginBottom:"10px"
                }}
            />


            <Input
                placeholder="정렬(qeesqo)"
                value={qeesqo}
                onChange={e =>
                    setQeesqo(
                        e.target.value
                    )
                }
                style={{
                    marginBottom:"10px"
                }}
            />


            <select

                value={useean}

                onChange={e =>
                    setUseean(
                        e.target.value
                    )
                }

                style={{
                    width:"100%",
                    padding:"6px"
                }}
            >

                <option value="Y">
                    사용
                </option>

                <option value="N">
                    미사용
                </option>

            </select>

        </Modal>

    );

}