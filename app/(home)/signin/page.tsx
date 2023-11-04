"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Form from "@/app/components/Form";

import { FormField, FETCH_STATUS } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInFooter() {
    return (
        <div className="flex flex-col items-end w-full font-medium">
            <p>Forgot your password, <Link className="link text-blue-800 hover:text-blue-500 transition-colors" href="/auth/password-reset">reset password</Link></p>
        </div>
    );
}

export default function Signin() {
    const router = useRouter();
    const { status: signInStatus } = useSession();

    if (signInStatus === "authenticated") {
        router.push("/dashboard");
    }

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
    async function handleSignin(e: FormEvent) {
        e.preventDefault();
        setStatus(FETCH_STATUS.LOADING);
        const signInOptions = {
            password: data.password,
            username: data.username,
            // redirect: false,
            callbackUrl: pathname === "/signin" ? "/dashboard" : undefined,
        };
        await signIn("credentials", signInOptions)
    }

    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.has("error")) {
            setError("Username or password is incorrect");
            setErrorType("error");
            setStatus(FETCH_STATUS.ERROR);

            setTimeout(() => {
                setStatus(FETCH_STATUS.IDLE);
            }, 2000);

            setTimeout(() => {
                setError("");
                setErrorType("");
            }, 5000);
        }
    }, []);

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
                footer={<SignInFooter />}
            />
        </div>
    );
}