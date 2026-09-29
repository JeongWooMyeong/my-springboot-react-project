import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../css/editor/TiptapEditor.css";

function TiptapEditor({ value, onChange }) {

    const editor = useEditor({
        extensions: [
            StarterKit
        ],

        content: value || "",

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    useEffect(() => {

        if (!editor) {
            return;
        }

        const currentContent = editor.getHTML();

        if (value !== currentContent) {

            editor.commands.setContent(
                value || "",
                false
            );

        }

    }, [value, editor]);


    if (!editor) {
        return null;
    }

    return (
        <div className="tiptap-editor">

            <div className="tiptap-toolbar">

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                >
                    굵게
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                >
                    기울임
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    목록
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    번호 목록
                </button>

            </div>

            <EditorContent editor={editor} />

        </div>
    );
}

export default TiptapEditor;