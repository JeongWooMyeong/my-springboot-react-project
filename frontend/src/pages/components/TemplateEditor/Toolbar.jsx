import PropertyPanel from "./PropertyPanel";

export default function Toolbar({
                                    title,
                                    setTitle,

                                    papersize,
                                    setPapersize,

                                    addText,
                                    addImage,

                                    deleteElement,

                                    handleSave,

                                    template,

                                    selectedElement,
                                    updateText,
                                    updateFieldName,

                                    elements
                                }) {

    return (
        <div
            style={{
                width:250,
                height:"100%",
                overflowY:"auto",
                flexShrink:0
            }}
        >

            <h3>템플릿</h3>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="템플릿 이름"
                style={{
                    width: "100%",
                    padding: 6
                }}
            />


            <h3>용지 크기</h3>

            <select
                value={papersize}
                onChange={(e) =>
                    setPapersize(e.target.value)
                }
            >
                <option value="A4">
                    A4
                </option>

                <option value="A3">
                    A3
                </option>

                <option value="Letter">
                    Letter
                </option>

                <option value="Legal">
                    Legal
                </option>

            </select>


            <h3>툴</h3>


            <button onClick={addText}>
                + 텍스트
            </button>


            <button onClick={addImage}>
                + 이미지
            </button>


            <br />
            <br />


            <button
                onClick={deleteElement}
                style={{
                    color:"red"
                }}
            >
                삭제
            </button>


            <button onClick={handleSave}>
                {template?.id ? "수정" : "저장"}
            </button>


            <hr />


            <PropertyPanel
                selectedElement={selectedElement}
                updateText={updateText}
                updateFieldName={updateFieldName}
            />


            <hr />


            <pre
                style={{
                    fontSize:11
                }}
            >
                {JSON.stringify(
                    elements,
                    null,
                    2
                )}
            </pre>


        </div>
    );
}