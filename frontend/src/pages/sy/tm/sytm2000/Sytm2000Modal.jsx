import React from "react";

import {
    Modal
} from "antd";


import TemplateEditor
    from "../../../components/TemplateEditor/TemplateEditor.jsx";



export default function Sytm2000Modal({

                                          open,

                                          onCancel,

                                          editingTemplate,

                                          clcd,

                                          onSave


                                      }) {


    return (


        <Modal


            open={
                open
            }


            onCancel={
                onCancel
            }


            footer={null}


            width="80%"


            destroyOnHidden



        >


            <TemplateEditor


                template={
                    editingTemplate
                }


                clcd={
                    clcd
                }


                onSave={
                    onSave
                }


                isOpen={
                    open
                }



            />


        </Modal>


    );

}