import React from "react";

import ClassificationTree
    from "../../../components/ClassificationTree.jsx";


export default function Sytm1000Tree({

                                         treeData,

                                         activeKeys,

                                         setActiveKeys,

                                         setSelectedKey

                                     }) {

    return (

        <ClassificationTree

            data={treeData}

            activeKeys={activeKeys}

            onCheck={setActiveKeys}

            onSelect={(keys) =>

                setSelectedKey(
                    keys[0]
                )

            }

        />

    );

}