export function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.menuCd] = {
            key: item.menuCd,
            title: item.menuName,
            children: []
        };
    });

    data.forEach(item => {
        if (item.menuPrntCd === "0") {
            roots.push(map[item.menuCd]);
        } else {
            if (map[item.menuPrntCd]) {
                map[item.menuPrntCd].children.push(map[item.menuCd]);
            }
        }
    });

    return roots;
}