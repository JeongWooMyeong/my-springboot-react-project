import "../../../css/component.css";

export default function PropertyPanel({
                                          selectedElement,
                                          updateText,
                                          updateFieldName
                                      }) {

    if (!selectedElement) {
        return null;
    }

    return (
        <div className="property-panel">
            <h4>속성</h4>

            {selectedElement.type === "text" && (
                <>
                    <input
                        value={selectedElement.text}
                        onChange={(e) => updateText(e.target.value)}
                        placeholder="텍스트"
                    />

                    <input
                        value={selectedElement.fieldName}
                        onChange={(e) => updateFieldName(e.target.value)}
                        placeholder="fieldName"
                    />
                </>
            )}

            {selectedElement.type === "image" && (
                <input
                    value={selectedElement.fieldName || ""}
                    onChange={(e) => updateFieldName(e.target.value)}
                    placeholder="image fieldName"
                />
            )}
        </div>
    );
}