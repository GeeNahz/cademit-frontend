"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import type { FormField, StatusType, ProspectsRecord, Gender } from "@/app/types";

import Form from "@/app/components/Form";
import ModalPopup from "@/app/components/ModalPopup";
import MessageBox from "@/app/components/MessageBox";
import { FETCH_STATUS } from "@/utils/status";

const defaultState: ProspectsRecord = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "" as Gender,
    course: "",
    employment_status: "",
    purpose: "",
    experience_level: 0,
    computer_access: false,
    internet_access: false,
    use_workspace: false,
};

export default function SignupPage() {
    const [data, setData] = useState<ProspectsRecord>(defaultState);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<StatusType>("idle");

    const formFields: FormField[] = [
        {
            type: "text",
            label: "First name",
            value: data.first_name,
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
            value: data.last_name,
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
            value: data.email,
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
            value: data.phone as string,
            fieldName: "phone",
            fieldProps: {
                placeholder: "+1234567890123",
                id: "phone_number",
                required: true,
            },
        },
        {
            type: "select",
            label: "Gender",
            value: data.gender,
            fieldName: "gender",
            fieldProps: {
                id: "gender",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "Male", value: "Male" },
                { id: 2, title: "Female", value: "Female" },
            ],
        },
        {
            type: "select",
            label: "Course",
            value: data.course,
            fieldName: "course",
            fieldProps: {
                id: "course",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "Data Science", value: "Data Science" },
                { id: 2, title: "Frontend Web Development", value: "Frontend Development" },
                { id: 3, title: "Backend Web Development", value: "Backend Development" },
                { id: 4, title: "UI / UX Design", value: "UI/UX Design" },
            ],
        },
        {
            type: "select",
            label: "Employment status",
            value: data.employment_status,
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
            value: data.experience_level,
            fieldName: "experience_level",
            fieldProps: {
                id: "experience",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "0 (I'm new to this field and have no idea)", value: 0 },
                { id: 2, title: "1 (I have a little idea but don't know what to do)", value: 1 },
                { id: 3, title: "2 (I have idea and want to build it)", value: 2 },
                { id: 4, title: "3 (I have good knowledge and want to advance)", value: 3 },
            ],
        },
        {
            type: "checkbox",
            label: "Access to computer",
            value: data.computer_access,
            fieldName: "computer_access",
            fieldProps: {
                id: "computer",
            },
        },
        {
            type: "checkbox",
            label: "Access to good internet",
            value: data.internet_access,
            fieldName: "internet_access",
            fieldProps: {
                id: "internet",
            },
        },
        {
            type: "checkbox",
            label: "Use our workspace",
            value: data.use_workspace,
            fieldName: "use_workspace",
            fieldProps: {
                id: "workspace",
            },
        },
        {
            type: "textarea",
            label: "Please provide us with a statement of purpose for this cohort",
            value: data.purpose,
            fieldName: "purpose",
            fieldProps: {
                placeholder: "Please state your purpose...",
                id: "purpose",
                required: true,
            },
        },
    ];

    function assingMessage(message: string, messageType: StatusType) {
        setMessage(message);
        setMessageType(messageType);

        setTimeout(() => {
            setMessage("");
            setMessageType("idle");
        }, 5000);
    }

    const router = useRouter();
    async function createProspectsRecord() {
        try {
            const response = await fetch("/api/v1/signup/cohort", {
                method: "POST",
                body: JSON.stringify({
                    ...data,
                })
            });

            if (response.ok) {
                assingMessage("Your record was successfully " + response.statusText, "success");
                setStatus(FETCH_STATUS.SUCCESS);
            } else {
                let message = "";
                if (response.status === 409) {
                    message = "Email already in use";
                } else {
                    message = "Internal server error. Please try again later";
                }

                throw new Error(message);
            }
        } catch (error: any) {
            let errMessage: string = error.toString().split(":")[1];

            assingMessage(errMessage, "error");
            setStatus(FETCH_STATUS.ERROR);
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setStatus(FETCH_STATUS.LOADING);

        await createProspectsRecord();
    }

    function handleModalProceed() {
        router.push("/");
    }
    function handleModalClose() {
        setData(defaultState);
        setMessageType("idle");
        setStatus(FETCH_STATUS.IDLE);
    }

    return (
        <div className="min-h-[calc(100vh-3.75rem)] w-full max-w-3xl flex flex-col justify-center items-center mx-auto">
            <Form
                type="Create"
                desc="Join the amazing train of learners at CADEMit and learn from the best."
                data={data}
                message={message}
                setData={setData}
                fields={formFields}
                submitting={status === FETCH_STATUS.LOADING}
                messageType={messageType}
                handleSubmit={handleSubmit}
            />
            {
                status === FETCH_STATUS.SUCCESS
                && (<ModalPopup>
                    <MessageBox
                        description="Your record has been submitted successfully."
                        messageType="SUCCESS"
                        onSuccess={handleModalProceed}
                        onClose={handleModalClose}
                    />
                </ModalPopup>)
            }
        </div>
    )
}
