import React from "react";

import ClassificationSelectTree
    from "../../../components/ClassificationSelectTree.jsx";


export default function Sytm2000Tree({

                                         treeData,

                                         selectedKeys,

                                         onSelect

                                     }) {


    return (

        <ClassificationSelectTree

            data={
                treeData || []
            }


            selectedKeys={
                selectedKeys || []
            }


            onSelect={
                onSelect
            }


        />

    );

}