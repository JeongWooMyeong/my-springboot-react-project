//선택한 템플릿 걸러서 보여주기 폰트
export async function loadCustomFonts(fontList) {

    const promises = [];

    fontList.forEach(font => {

        const fontName = font.fontfamily;

        const style = document.createElement("style");

        style.innerHTML = `
            @font-face {
                font-family: "${fontName}";
                src: url("http://localhost:8081${font.fontfilepath}") format("truetype");
                font-weight: normal;
                font-style: normal;
            }
        `;

        document.head.appendChild(style);


        promises.push(
            document.fonts.load(
                `50px "${fontName}"`
            )
        );

    });


    // 변경
    await Promise.allSettled(promises);


    await document.fonts.ready;


    console.log(
        "font loaded",
        fontList.map(f => ({
            name:f.fontfamily,
            check:document.fonts.check(
                `50px "${f.fontfamily}"`
            )
        }))
    );


    return fontList;
}

//전체 에디터 폰트 로드
/**
 * 전체 에디터 폰트 로드
 */
export async function loadAllFonts(fontList) {


    const promises = [];


    fontList.forEach(font => {


        const fontName =
            font.fontfamily;


        // 이미 등록된 폰트면 제외
        if(
            document.fonts.check(
                `50px "${fontName}"`
            )
        ){
            return;
        }



        const style =
            document.createElement("style");


        style.innerHTML = `
            @font-face {

                font-family: "${fontName}";

                src: url("http://localhost:8081${font.fontfilepath}")
                format("truetype");

                font-weight: normal;

                font-style: normal;

                font-display: block;

            }
        `;


        document.head.appendChild(style);



        promises.push(

            document.fonts.load(
                `50px "${fontName}"`
            )

        );


    });



    await Promise.all(promises);


    await document.fonts.ready;



    console.log(
        "font loaded",
        fontList.map(font => ({

            name:
            font.fontfamily,


            loaded:
                document.fonts.check(
                    `50px "${font.fontfamily}"`
                )

        }))
    );


    return fontList;

}