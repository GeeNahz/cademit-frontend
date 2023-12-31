"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@/app/components/Form";

import { ErrorType, FormField, Gender, StatusType, User } from "@/app/types";
import { FETCH_STATUS } from "@/utils/status";
import { registerUser } from "@/services/AuthService";
import ModalPopup from "@/app/components/ModalPopup";
import MessageBox from "@/app/components/MessageBox";

const defaultData: User = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    gender: "" as Gender,
    email: "",
    image: "",
    is_admin: true,
};

export default function Signin() {
    const [data, setData] = useState<User>(defaultData);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState<StatusType>("idle");
    
    const signInFormFields: FormField[] = [
        {
            type: "text",
            fieldName: "first_name",
            label: "First name",
            value: data.first_name as string,
            fieldProps: {
                classes: "firstname",
                id: "firstname",
                placeholder: "John",
                required: true,
            },
        },
        {
            type: "text",
            fieldName: "last_name",
            label: "Last name",
            value: data.last_name as string,
            fieldProps: {
                classes: "lastname",
                id: "lastname",
                placeholder: "Doe",
                required: true,
            },
        },
        {
            type: "email",
            fieldName: "email",
            label: "Email",
            value: data.email,
            fieldProps: {
                classes: "email",
                id: "email",
                placeholder: "jdoe@example.com",
                required: true,
            },
        },
        {
            type: "select",
            fieldName: "gender",
            label: "Gender",
            value: data.gender,
            fieldProps: {
                classes: "gender",
                id: "gender",
                required: true,
            },
            selectOptions: [
                { id: 1, title: "Male", value: "Male", },
                { id: 2, title: "Female", value: "Female", },
            ],
        },
        {
            type: "text",
            fieldName: "username",
            label: "Username",
            value: data.username,
            fieldProps: {
                classes: "username",
                id: "username",
                placeholder: "johndoe",
                required: true,
            },
        },
        {
            type: "password",
            fieldName: "password",
            label: "Password",
            value: data.password as string,
            fieldProps: {
                classes: "pword",
                id: "password",
                placeholder: "●●●●●●●●●●",
                required: true,
            },
        },
    ];

    async function handleSignin(e: FormEvent) {
        e.preventDefault();
        setStatus(FETCH_STATUS.LOADING);

        try {
            await registerUser(data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            setStatus(FETCH_STATUS.ERROR);
            setErrorType("error");
            setError((error as ErrorType).errorMessage);
        } finally {
            setTimeout(() => {
                setError("");
                setErrorType("idle");
            }, 5000);
        }
    }

    function handleCloseModal() {
        setStatus(FETCH_STATUS.IDLE);
        setData(defaultData);
    }

    const router = useRouter();
    function handleSuccessModal() {
        router.push("/signin");
    }
    
    return (
        <div className="min-h-[calc(100vh-3.75rem)] w-full max-w-3xl flex flex-col justify-center items-center mx-auto">
            <Form
                fields={signInFormFields}
                data={data}
                setData={setData}
                handleSubmit={handleSignin}
                submitting={status === FETCH_STATUS.LOADING}
                type="Sign up"
                header="Admin Sign Up"
                desc="Sign up as an admin"
                message={error}
                messageType={errorType}
            />
            {
                status === FETCH_STATUS.SUCCESS && (
                    <ModalPopup>
                        <MessageBox
                            messageType="SUCCESS"
                            description="Registration was successful. Sign in to continue"
                            onClose={handleCloseModal}
                            onSuccess={handleSuccessModal}
                        />
                    </ModalPopup>
                )
            }
        </div>
    );
}