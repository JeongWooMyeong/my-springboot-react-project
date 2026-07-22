import { useEffect } from "react";

export default function FontPreview({ font }) {

    useEffect(() => {

        if (!font) return;

        const style = document.createElement("style");

        style.innerHTML = `
            @font-face {
                font-family: '${font.fontfamily}';
                src: url('http://localhost:8081${font.fontfilepath}') format('truetype');
            }
        `;

        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };

    }, [font]);


    return (
        <div>

            <h3>미리보기</h3>

            <div
                style={{
                    fontFamily: font.fontfamily,
                    fontSize: 32,
                    padding: 20,
                    border: "1px solid #ddd"
                }}
            >
                가나다라마바사
                <br />
                ABCD 123456
                <br />
                {font.fontfamily}
            </div>

        </div>
    );
}