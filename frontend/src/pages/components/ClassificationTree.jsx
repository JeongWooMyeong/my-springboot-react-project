import React from "react";
import { Tree } from "antd";

/*
*
* 템플릿 분류 페이지에서 쓰이는 분류 트리
* */

const ClassificationTree = ({ data, activeKeys = [], onCheck, onSelect }) => {
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
            onSelect={(selectedKeys, info) => {
                onSelect?.(selectedKeys, info);
            }}
        />
    );
};

export default ClassificationTree;