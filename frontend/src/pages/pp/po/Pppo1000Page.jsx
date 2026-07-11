import { useState, useEffect } from "react";
import Pppo1000List from "./Pppo1000List.jsx";
import Pppo1100Page from "./Pppo1100Page.jsx";

export default function Pppo1000Page() {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedLevel1, setSelectedLevel1] = useState(null);
    const [selectedLevel2, setSelectedLevel2] = useState(null);
    const [selectedLevel3, setSelectedLevel3] = useState(null);

    const [level1List, setLevel1List] = useState([]);
    const [level2List, setLevel2List] = useState([]);
    const [level3List, setLevel3List] = useState([]);

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    // 분류1 불러오기
    useEffect(() => {
        if (!token) return;
        fetch("/api/sytm2000/categories?parent=0", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setLevel1List(data));
    }, []);

    const handleLevel1Click = (clcd) => {
        setSelectedLevel1(clcd);
        setSelectedLevel2(null);
        setSelectedLevel3(null);
        setLevel2List([]);
        setLevel3List([]);

        fetch(`/api/sytm2000/categories?parent=${clcd}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setLevel2List(data));
    };

    const handleLevel2Click = (clcd) => {
        setSelectedLevel2(clcd);
        setSelectedLevel3(null);
        setLevel3List([]);

        fetch(`/api/sytm2000/categories?parent=${clcd}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setLevel3List(data));
    };

    const handleLevel3Click = (clcd) => {
        setSelectedLevel3(clcd);
    };

    const selectedClcd = selectedLevel3 || selectedLevel2 || selectedLevel1;

    return (
        <div>
            {/* 상단 분류 영역 */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20, width: "100%" }}>
                {/* 분류1 */}
                <div style={{ width: "350px", border: "1px solid #ddd", padding: 10, maxHeight: "300px", overflowY: "auto" }}>
                    <h4>분류1</h4>
                    {level1List.map(cat => (
                        <div
                            key={cat.clcd}
                            onClick={() => handleLevel1Click(cat.clcd)}
                            style={{
                                padding: "10px",
                                marginBottom: "5px",
                                border: "1px solid #ccc",
                                borderRadius: 6,
                                cursor: "pointer",
                                background: selectedLevel1 === cat.clcd ? "#007bff" : "#f9f9f9",
                                color: selectedLevel1 === cat.clcd ? "#fff" : "#000"
                            }}
                        >
                            {cat.clname}
                        </div>
                    ))}
                </div>

                {/* 분류2 */}
                <div style={{ width: "350px", border: "1px solid #ddd", padding: 10, maxHeight: "300px", overflowY: "auto" }}>
                    <h4>분류2</h4>
                    {level2List.map(child => (
                        <div
                            key={child.clcd}
                            onClick={() => handleLevel2Click(child.clcd)}
                            style={{
                                padding: "10px",
                                marginBottom: "5px",
                                border: "1px solid #ccc",
                                borderRadius: 6,
                                cursor: "pointer",
                                background: selectedLevel2 === child.clcd ? "#007bff" : "#f9f9f9",
                                color: selectedLevel2 === child.clcd ? "#fff" : "#000"
                            }}
                        >
                            {child.clname}
                        </div>
                    ))}
                </div>

                {/* 분류3 */}
                <div style={{ width: "350px", border: "1px solid #ddd", padding: 10, maxHeight: "300px", overflowY: "auto" }}>
                    <h4>분류3</h4>
                    {level3List.map(child => (
                        <div
                            key={child.clcd}
                            onClick={() => handleLevel3Click(child.clcd)}
                            style={{
                                padding: "10px",
                                marginBottom: "5px",
                                border: "1px solid #ccc",
                                borderRadius: 6,
                                cursor: "pointer",
                                background: selectedLevel3 === child.clcd ? "#007bff" : "#f9f9f9",
                                color: selectedLevel3 === child.clcd ? "#fff" : "#000"
                            }}
                        >
                            {child.clname}
                        </div>
                    ))}
                </div>
            </div>

            {/* 템플릿 리스트 영역 */}
            <div style={{ border: "1px solid #ddd", padding: 20 }}>
                {selectedId === null ? (
                    <Pppo1000List onSelect={setSelectedId} clcd={selectedClcd} />
                ) : (
                    <Pppo1100Page templateid={selectedId} onBack={() => setSelectedId(null)} />
                )}
            </div>
        </div>
    );
}
