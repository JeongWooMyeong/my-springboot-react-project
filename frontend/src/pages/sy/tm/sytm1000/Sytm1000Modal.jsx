import React, {useEffect, useState} from "react";

import {
    Modal,
    Input, Checkbox
} from "antd";


export default function Sytm1000Modal({

                                          isModalOpen,

                                          modalMode,

                                          selectedKey,

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

                                          handleModalOk,
                                          handleModalCancel

                                      }) {
    const [isLevel0, setIsLevel0] = useState(
        false
    );

    useEffect(() => {
        if (isModalOpen && modalMode === "add") {

            setIsLevel0(false);

            setPrdnclcd(selectedKey || "");

        }
    }, [
        isModalOpen,
        modalMode,
        selectedKey
    ]);

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
                        <Checkbox
                            checked={isLevel0}
                            onChange={e => {
                                const checked = e.target.checked;

                                setIsLevel0(checked);

                                if (checked) {
                                    setPrdnclcd("0");
                                }
                            }}
                            style={{
                                marginBottom: "10px"
                            }}
                        >
                            최상위 분류(level 0)
                        </Checkbox>

                        <Input
                            placeholder="상위 분류 코드(prdnclcd)"
                            value={prdnclcd}
                            onChange={e =>
                                setPrdnclcd(e.target.value)
                            }
                            disabled
                            style={{
                                marginBottom: "10px"
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