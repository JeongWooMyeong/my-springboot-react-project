export default function CategoryColumn({ title, list, selected, onClick }) {
    return (
        <div style={{ width: "350px", border: "1px solid #ddd", padding: 10, maxHeight: "300px", overflowY: "auto" }}>
            <h4>{title}</h4>
            {list.map(item => (
                <div
                    key={item.clcd}
                    onClick={() => onClick(item.clcd)}
                    style={{
                        padding: "10px",
                        marginBottom: "5px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: selected === item.clcd ? "#007bff" : "#f9f9f9",
                        color: selected === item.clcd ? "#fff" : "#000"
                    }}
                >
                    {item.clname}
                </div>
            ))}
        </div>
    );
}
