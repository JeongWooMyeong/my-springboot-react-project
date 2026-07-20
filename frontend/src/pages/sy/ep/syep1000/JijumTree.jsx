import React from "react";
import { Tree } from "antd";

export default function JijumTree({
                                      treeData,
                                      onSelect
                                  }) {
    return (
        <div
            style={{
                width: 350,
                flexShrink: 0,
                height: 500,
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px"
            }}
        >
            <Tree
                treeData={treeData}
                onSelect={onSelect}
                defaultExpandAll
            />
        </div>
    );
}