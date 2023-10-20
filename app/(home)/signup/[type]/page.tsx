"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import Form from "../components/Form";

import type { StatusType, StudentRecord } from "@/app/types";
// type SignUpType = "school-parent" | "educator" | "individual";

export default function SignupPage() {
    const [signupUrl, setSignupUrl] = useState("");
    const [record, setRecord] = useState<StudentRecord>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        course: "",
        employment_status: "",
        experience_level: 0,
        computer_access: false,
        internet_access: false,
        use_workspace: false,
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<StatusType>("idle");

    const params = useParams();
    function assignSignupUrl() {
        switch (params.type) {
            case "school-parent":
                setSignupUrl("/api/signup/school-parent");
                break;
            case "educator":
                setSignupUrl("/api/signup/educator");
                break;
            case "individual":
                setSignupUrl("/api/signup/individual");
                break;
            default:
                console.log(`Invalid signup param: ${params.type}`);
                break;
        }
    }

    useEffect(() => {
        assignSignupUrl();
    }, []);

    function assingMessage(message: string, messageType: StatusType) {
        setMessage(message);
        setMessageType(messageType);

        setTimeout(() => {
            setMessage("");
            setMessageType("idle");
        }, 5000);
    }

    const router = useRouter();
    async function createStudentRecord(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(signupUrl, {
                method: "POST",
                body: JSON.stringify({
                    ...record,
                    signupType: params.type,
                })
            });

            if (response.ok) {
                assingMessage(response.statusText, "success");

                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                throw new Error(`${response.statusText}`);
            }            
        } catch (error) {
            assingMessage(`${error}. Please try again later.`, "error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-3.75rem)] w-full max-w-3xl flex flex-col justify-center items-center mx-auto">
            <Form
                type="Create"
                record={record}
                setRecord={setRecord}
                submitting={submitting}
                handleSubmit={createStudentRecord}
                message={message}
                messageType={messageType}
            />
        </div>
    )
}
