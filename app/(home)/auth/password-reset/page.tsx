"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormField } from "@/app/types";
import { resetPassword } from "@/services/AuthService";
import { FETCH_STATUS } from "@/utils/status";

import Form from "@/app/components/Form";
import ModalPopup from "@/app/components/ModalPopup";
import MessageBox from "@/app/components/MessageBox";


function ResetPasswordFooter() {
    return (
        <div className="flex flex-col items-end w-full font-medium">
            <p>Remember your password, <Link className="link text-blue-800 hover:text-blue-500 transition-colors" href="/signin">sign in</Link></p>
        </div>
    );
}

const defaultState = {
    email: "",
    password: "",
    confirmPassword: "",
}
export default function PasswordResetPage() {
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [data, setData] = useState(defaultState);

    const passwordResetFormFields: FormField[] = [
        {
            type: "email",
            fieldName: "email",
            label: "Email",
            value: data.email,
            fieldProps: {
                classes: "email",
                id: "email",
                placeholder: "johndoe@example.com",
                required: true,
            },
        },
        {
            type: "password",
            fieldName: "password",
            label: "New password",
            value: data.password,
            fieldProps: {
                classes: "pword",
                id: "new-password",
                placeholder: "●●●●●●●●●●●●●●●",
                required: true,
            },
        },
        {
            type: "password",
            fieldName: "confirmPassword",
            label: "Confirm password",
            value: data.confirmPassword,
            fieldProps: {
                classes: "pword",
                id: "confirm-password",
                placeholder: "●●●●●●●●●●●●●●●",
                required: true,
            },
        },
    ];

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus(FETCH_STATUS.LOADING);

        try {
            await resetPassword(data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            setError(error.errorMessage);
            setErrorType("error");
            setStatus(FETCH_STATUS.ERROR);
        } finally {
            setTimeout(() => {
                setError("");
                setErrorType("idle");
                setStatus(FETCH_STATUS.IDLE);
            }, 5000);
        }
    }

    const router = useRouter();

    function handleModalClose(action: "proceed" | "close") {
        if (action === "proceed") {
            router.push("/signin");
        } else if (action === "close") {
            setStatus(FETCH_STATUS.IDLE);
            setData(defaultState);
        } else {
            console.log("Invalid action!");
        }
    }

    return (
        <div className="signin-class">
            <Form
                fields={passwordResetFormFields}
                data={data}
                setData={setData}
                handleSubmit={handleSubmit}
                submitting={status === FETCH_STATUS.LOADING}
                type="Reset password"
                header="Reset password"
                desc="Reset your password using your email"
                message={error}
                messageType={errorType}
                footer={<ResetPasswordFooter />}
            />
            {
                status === FETCH_STATUS.SUCCESS
                && (<ModalPopup>
                    <MessageBox
                        messageType="SUCCESS"
                        description="Password reset was successful. Proceed to sign in."
                        onSuccess={() => handleModalClose("proceed")}
                        onClose={() => handleModalClose("close")}
                    />
                </ModalPopup>)
            }
        </div>
    );
}