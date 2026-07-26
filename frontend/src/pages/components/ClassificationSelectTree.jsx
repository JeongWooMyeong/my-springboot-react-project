import React from "react";
import { Tree } from "antd";

/*
템플릿 관리에서 쓰이는 분류
 */

const ClassificationSelectTree = ({ data, selectedKeys = [], onSelect }) => {
    const buildTree = (data) => {
        const map = {};

        data.forEach((item) => {
            map[item.clcd] = {
                key: item.clcd,
                title: item.clname,
                children: [],
            };
        });

        const roots = [];

        data.forEach((item) => {
            if (item.prdnclcd && map[item.prdnclcd]) {
                map[item.prdnclcd].children.push(map[item.clcd]);
            } else {
                roots.push(map[item.clcd]);
            }
        });

        return roots;
    };

    return (
        <Tree
            defaultExpandAll
            treeData={buildTree(data)}
            selectedKeys={selectedKeys}
            onSelect={(selectedKeys) => {
                onSelect?.(selectedKeys);
            }}
        />
    );
};

export default ClassificationSelectTree;
