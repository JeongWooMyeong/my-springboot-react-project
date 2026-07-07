import React from "react";
import { Tree } from "antd";

const ClassificationTree = ({ data, activeKeys = [], onCheck }) => {
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
            checkable
            defaultExpandAll
            treeData={buildTree(data)}
            checkedKeys={activeKeys}
            onCheck={(checkedKeys) => {
                onCheck?.(checkedKeys);
            }}
        />
    );
};

export default ClassificationTree;