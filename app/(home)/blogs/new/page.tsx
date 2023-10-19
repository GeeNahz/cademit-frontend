"use client";

import { useEffect, useState } from "react";
import CKeditor from "@/app/components/CKeditor";

export default function NewBlog() {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");

    useEffect(() => {
        setEditorLoaded(true);

        return () => { }
    }, []);

    return (
        <div className="px-10">
            <div className="h-fit">
                <CKeditor
                    value={data}
                    name="description"
                    onChange={(data: any) => {
                        setData(data);
                    }}
                    editorLoaded={editorLoaded}
                />
            </div>
        </div>
    )
}
