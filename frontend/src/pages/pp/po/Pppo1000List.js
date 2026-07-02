import {useEffect, useState} from "react";
import axios from "axios";

export default function Pppo1000List({ onSelect }) {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/api/sytm2000").then(res => {
            setList(res.data);
        });
    }, []);

    return (
        <div>
            <h2>POP 신청 리스트</h2>

            {list.map(item => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    style={{
                        border: "1px solid #ccc",
                        padding: 10,
                        marginBottom: 10,
                        cursor: "pointer"
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
    );
}