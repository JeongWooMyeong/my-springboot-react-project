export function buildTree(data) {
    const map = {};
    const roots = [];

    data.forEach(item => {
        map[item.jijumcd] = {
            key: item.jijumcd,
            title: item.jijumname,
            children: []
        };
    });

    data.forEach(item => {
        if (item.jijumclcd === "0") {
            roots.push(map[item.jijumcd]);
        } else {
            if (map[item.jijumclcd]) {
                map[item.jijumclcd].children.push(map[item.jijumcd]);
            }
        }
    });

    return roots;
}