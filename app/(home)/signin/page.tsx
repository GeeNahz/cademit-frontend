"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@/app/components/Form";

import { FormField, FETCH_STATUS } from "@/app/types";
import { usePathname } from "next/navigation";

export default function Signin() {
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
    function handleSignin(e: FormEvent) {
        e.preventDefault();

        signIn("credentials", {
            password: data.password,
            username: data.username,
            callbackUrl: pathname === "/signin" ? "/dashboard" : undefined,
        });
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
            />
        </div>
    );
}