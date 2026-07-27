
// 트리 구조 변환 함수
export function buildTree(data) {

    const map = {};
    const roots = [];


    data.forEach(item => {

        map[item.menuCd] = {

            key: String(item.menuCd),

            title: item.menuName,

            children: []

        };

    });



    data.forEach(item => {


        if (
            item.menuPrntCd === "0" ||
            !item.menuPrntCd
        ) {


            roots.push(
                map[item.menuCd]
            );


        } else {


            if (map[item.menuPrntCd]) {

                map[item.menuPrntCd]
                    .children
                    .push(
                        map[item.menuCd]
                    );

            }

        }


    });



    return roots;

}





// Tree 하위 메뉴 전체 key 수집
export function collectKeys(node) {


    let result = [
        node.key
    ];



    if (node.children) {


        node.children.forEach(child => {


            result =
                result.concat(
                    collectKeys(child)
                );


        });


    }



    return result;

}