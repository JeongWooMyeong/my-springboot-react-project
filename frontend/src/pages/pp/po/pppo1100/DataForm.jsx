import React from "react";

export default function DataForm({
                                     templateData,
                                     productData,
                                     handleChange,
                                     handleImageUpload,
                                     handleExcelUpload,
                                     saveData,
                                     setFocusField,
                                     onBack
                                 }) {

    return (

        <div
            style={{
                width: 320,
                padding: 10,
                borderRight: "1px solid #ddd"
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20
                }}
            >

                <button onClick={onBack}>
                    ← 뒤로
                </button>

                <label
                    style={{
                        background: "#1677ff",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 14
                    }}
                >

                    엑셀 업로드

                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleExcelUpload}
                        style={{
                            display: "none"
                        }}
                    />

                </label>

            </div>

            <h3>
                데이터 입력
            </h3>

            {

                templateData.canvasData.map(field => {

                    const isImage =
                        field.type === "image";

                    return (

                        <div
                            key={field.id}
                            style={{
                                marginBottom: 12
                            }}
                        >

                            <label>
                                {field.fieldName}
                            </label>

                            {

                                !isImage &&

                                <input

                                    value={
                                        productData[field.fieldName] || ""
                                    }

                                    onChange={e =>
                                        handleChange(
                                            field.fieldName,
                                            e.target.value
                                        )
                                    }

                                    onFocus={() =>
                                        setFocusField(
                                            field.fieldName
                                        )
                                    }

                                    style={{
                                        width: "100%"
                                    }}

                                />

                            }

                            {

                                isImage &&

                                <input

                                    type="file"

                                    accept="image/*"

                                    onChange={e => {

                                        const file =
                                            e.target.files[0];

                                        if (file) {

                                            handleImageUpload(
                                                field.fieldName,
                                                file
                                            );

                                        }

                                    }}

                                />

                            }

                        </div>

                    );

                })

            }

            <button

                onClick={saveData}

                style={{
                    width: "100%",
                    marginTop: 20,
                    padding: 10
                }}

            >

                저장

            </button>

        </div>

    );

}