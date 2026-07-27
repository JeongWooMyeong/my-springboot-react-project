import React from "react";
import { Tree } from "antd";

function MenuTree({ menuData, onSelect }) {
    return (
        <div
            className="tree-container"
            style={{ flex: 1, maxWidth: 300 }}
        >
            <Tree
                treeData={menuData}
                onSelect={onSelect}
                defaultExpandAll
            />
        </div>
    );
}

export default MenuTree;