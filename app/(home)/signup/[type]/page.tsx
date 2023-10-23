"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import Form from "@/app/components/Form";

import type { FormField, StatusType, StudentRecord } from "@/app/types";
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
        purpose: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<StatusType>("idle");

    const formFields: FormField[] = [
        {
            type: "text",
            label: "First name",
            value: record.first_name,
            fieldName: "first_name",
            fieldProps: {
                placeholder: "John",
                id: "first_name",
                required: true,
            },
        },
        {
            type: "text",
            label: "Last name",
            value: record.last_name,
            fieldName: "last_name",
            fieldProps: {
                placeholder: "Doe",
                id: "last_name",
                required: true,
            },
        },
        {
            type: "email",
            label: "Email address",
            value: record.email,
            fieldName: "email",
            fieldProps: {
                placeholder: "example@email.com",
                id: "email",
                required: true,
            },
        },
        {
            type: "tel",
            label: "Phone",
            value: record.phone as string,
            fieldName: "phone",
            fieldProps: {
                placeholder: "+1234567890123",
                id: "phone_number",
                required: true,
            },
        },
        {
            type: "select",
            label: "Course",
            value: record.course,
            fieldName: "course",
            fieldProps: {
                id: "course",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "Data Science", value: "Data Science" },
                { id: 2, title: "Frontend Development", value: "Frontend Development" },
                { id: 3, title: "Backend Development", value: "Backend Development" },
                { id: 4, title: "UI/UX Design", value: "UI/UX Design" },
            ],
        },
        {
            type: "select",
            label: "Employment status",
            value: record.employment_status,
            fieldName: "employment_status",
            fieldProps: {
                id: "employment_status",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "Employed", value: "Employed" },
                { id: 2, title: "Self-employed", value: "Self-employed" },
                { id: 3, title: "Student", value: "Student" },
            ],
        },
        {
            type: "radio",
            label: "Experience level",
            value: record.experience_level,
            fieldName: "experience_level",
            fieldProps: {
                id: "experience",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "(I'm new to this field and have no idea)", value: 0 },
                { id: 2, title: "(I have a little idea but don't know what to do)", value: 1 },
                { id: 3, title: "(I have idea and want to build it)", value: 2 },
                { id: 4, title: "(I have good knowledge and want to advance)", value: 3 },
            ],
        },
        {
            type: "checkbox",
            label: "Access to computer",
            value: record.computer_access,
            fieldName: "computer_access",
            fieldProps: {
                id: "computer",
            },
        },
        {
            type: "checkbox",
            label: "Access to good internet",
            value: record.internet_access,
            fieldName: "internet_access",
            fieldProps: {
                id: "internet",
            },
        },
        {
            type: "checkbox",
            label: "Use our workspace",
            value: record.use_workspace,
            fieldName: "use_workspace",
            fieldProps: {
                id: "workspace",
            },
        },
    ];

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
                }, 5000);
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
                desc="Join the amazing train of learners at CADEMit and learn from the best."
                data={record}
                message={message}
                setData={setRecord}
                fields={formFields}
                submitting={submitting}
                messageType={messageType}
                handleSubmit={createStudentRecord}
            />
        </div>
    )
}
