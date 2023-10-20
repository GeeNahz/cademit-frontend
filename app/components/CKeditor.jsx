"use client";

import { useEffect, useRef } from "react";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build/build/ckeditor"
import { CustomUploadAdapter } from "@/utils/ckeditorPlugin";

// type CKeditorProps = {
//     onChange: (data: string) => void;
//     editorLoaded: boolean;
//     name: string;
//     value: string;
// };


export default function CKeditor({ onChange, editorLoaded, name, value }) {
    const editorRef = useRef();
    const { CKEditor, Editor } = editorRef.current || {};
    
    useEffect(() => {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
        Editor: require("ckeditor5-custom-build/build/ckeditor"),
      }
    
      return () => {}
    }, []);
    
    const editorConfig = {
        alignment: {
            options: ["left", "center", "justify", "right"],
        },
        toolbar: {
            items: [
                'undo',
                'redo',
                'heading',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                'link',
                'bulletedList',
                'numberedList',
                'todoList',
                'blockQuote',
                'superscript',
                'subscript',
                '|',
                'outdent',
                'indent',
                'alignment',
                'fontFamily',
                'fontSize',
                'highlight',
                '|',
                'imageUpload',
                'imageInsert',
                'insertTable',
                'mediaEmbed'
            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
    };

    return (
        <div className="prose md:prose-lg lg:prose-xl min-w-fit max-w-full h-screen text-neutral">
            {editorLoaded ? (
                <CKEditor
                    editor={Editor}
                    data={value}
                    onReady={(editor) => {
                        console.log("Editor is ready to use! ", editor);
                        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                            return new CustomUploadAdapter(loader);
                        }
                    }}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                    config={editorConfig}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}