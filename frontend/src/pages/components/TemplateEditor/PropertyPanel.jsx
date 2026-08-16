import "../../../css/template/editor/template-editor.css";

export default function PropertyPanel({
                                          selectedElement,
                                          updateText,
                                          updateFieldName,
                                          updateElement,
                                          fonts
                                      }) {

    if (!selectedElement) {
        return null;
    }

    return (
        <div className="property-panel">

            <h4>속성</h4>

            {selectedElement.type === "text" && (
                <>

                    <div className="property-group">

                        <label>
                            텍스트
                        </label>

                        <input
                            value={selectedElement.text || ""}
                            onChange={(e) =>
                                updateText(e.target.value)
                            }
                            placeholder="텍스트"
                        />

                    </div>


                    <div className="property-group">

                        <label>
                            필드명
                        </label>

                        <input
                            value={selectedElement.fieldName || ""}
                            onChange={(e) =>
                                updateFieldName(e.target.value)
                            }
                            placeholder="fieldName"
                        />

                    </div>


                    <div className="property-row">

                        <div className="property-group">

                            <label>
                                폰트
                            </label>

                            <select
                                value={
                                    selectedElement.fontFamily || ""
                                }
                                onChange={(e) =>
                                    updateElement(
                                        selectedElement.id,
                                        {
                                            fontFamily:
                                            e.target.value
                                        }
                                    )
                                }
                            >

                                <option value="">
                                    기본
                                </option>

                                {fonts.map(font => (

                                    <option
                                        key={font.fontid}
                                        value={font.fontfamily}
                                    >
                                        {font.fontfamily}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="property-group">

                            <label>
                                크기
                            </label>

                            <input
                                type="number"
                                min={8}
                                max={200}
                                value={
                                    selectedElement.fontSize ?? 16
                                }
                                onChange={(e) =>
                                    updateElement(
                                        selectedElement.id,
                                        {
                                            fontSize:
                                                Number(e.target.value)
                                        }
                                    )
                                }
                            />

                        </div>

                    </div>

                </>
            )}


            {selectedElement.type === "image" && (

                <div className="property-group">

                    <label>
                        이미지 필드
                    </label>

                    <input
                        value={
                            selectedElement.fieldName || ""
                        }
                        onChange={(e) =>
                            updateFieldName(e.target.value)
                        }
                        placeholder="image fieldName"
                    />

                </div>

            )}

        </div>
    );
}