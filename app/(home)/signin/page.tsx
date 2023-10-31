"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@/app/components/Form";

import { FormField, FETCH_STATUS } from "@/app/types";
import { usePathname, useRouter } from "next/navigation";

export default function Signin() {
    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);

    const signInFormFields: FormField[] = [
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
            value: data.password,
            fieldProps: {
                classes: "pword",
                id: "password",
                placeholder: "●●●●●●●●●●●●●●●",
                required: true,
            },
        },
    ];

    const pathname = usePathname();
    const router = useRouter();
    async function handleSignin(e: FormEvent) {
        e.preventDefault();
        setStatus(FETCH_STATUS.LOADING);
        try {
            let res = await signIn("credentials", {
                password: data.password,
                username: data.username,
                redirect: false,
                callbackUrl: pathname === "/signin" ? "/dashboard" : undefined,
            });
            if (!res?.ok) throw res;

            router.push(res.url as string);
        } catch (error) {
            setError("Username or password is incorrect");
            setErrorType("error");
            setStatus(FETCH_STATUS.ERROR);
        } finally {
            setTimeout(() => {
                setStatus(FETCH_STATUS.IDLE);
            }, 2000);

            setTimeout(() => {
                setError("");
            setErrorType("");
            }, 5000);
        }
    }

    return (
        <div className="signin-class">
            <Form
                fields={signInFormFields}
                data={data}
                setData={setData}
                handleSubmit={handleSignin}
                submitting={status === FETCH_STATUS.LOADING}
                type="Sign in"
                header="Sign in"
                desc="Sign in to your account"
                message={error}
                messageType={errorType}
            />
        </div>
    );
}