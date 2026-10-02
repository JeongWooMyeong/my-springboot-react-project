// 선택한 템플릿 폰트 로드
export async function loadCustomFonts(fontList) {

    const results = await Promise.all(
        fontList.map(async (font) => {

            const fontName =
                font.fontfamily;

            const fontUrl =
                font.fontfilepath;

            try {

                console.log(
                    "FONT LOAD START:",
                    fontName,
                    fontUrl
                );

                const fontFace =
                    new FontFace(
                        fontName,
                        `url("${fontUrl}")`,
                        {
                            weight: "400",
                            style: "normal"
                        }
                    );

                await fontFace.load();

                document.fonts.add(fontFace);

                console.log(
                    "FONT LOADED:",
                    fontName,
                    document.fonts.check(
                        `50px "${fontName}"`
                    )
                );

                return font;

            } catch (error) {

                console.error(
                    "FONT LOAD ERROR:",
                    fontName,
                    fontUrl,
                    error
                );

                return null;
            }

        })
    );

    return results.filter(Boolean);
}


// 전체 에디터 폰트 로드
export async function loadAllFonts(fontList) {

    const results = await Promise.all(
        fontList.map(async (font) => {

            const fontName =
                font.fontfamily;

            const fontUrl =
                font.fontfilepath;


            console.log(
                "========== FONT START =========="
            );

            console.log(
                "FONT NAME:",
                fontName
            );

            console.log(
                "FONT URL:",
                fontUrl
            );


            try {

                /*
                 * 이미 같은 폰트가 등록되어 있으면
                 * 다시 등록하지 않음
                 */
                const alreadyLoaded =
                    [...document.fonts].some(
                        loadedFont =>
                            loadedFont.family ===
                            `"${fontName}"`
                    );


                if (alreadyLoaded) {

                    console.log(
                        "FONT ALREADY REGISTERED:",
                        fontName
                    );

                    return font;
                }


                /*
                 * FontFace 생성
                 */
                const fontFace =
                    new FontFace(
                        fontName,
                        `url("${fontUrl}")`,
                        {
                            weight: "400",
                            style: "normal"
                        }
                    );


                /*
                 * 실제 TTF 다운로드
                 */
                const loadedFont =
                    await fontFace.load();


                /*
                 * document.fonts 등록
                 */
                document.fonts.add(
                    loadedFont
                );


                /*
                 * 브라우저 등록 확인
                 */
                const checked =
                    document.fonts.check(
                        `50px "${fontName}"`
                    );


                console.log(
                    "FONT LOADED:",
                    fontName,
                    checked
                );


                return font;


            } catch (error) {

                console.error(
                    "FONT LOAD ERROR:",
                    fontName,
                    fontUrl,
                    error
                );

                return null;
            }

        })
    );


    await document.fonts.ready;


    console.log(
        "========== ALL FONTS =========="
    );


    console.table(
        [...document.fonts].map(font => ({
            family: font.family,
            status: font.status,
            weight: font.weight,
            style: font.style
        }))
    );


    return results.filter(Boolean);
}
