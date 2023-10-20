"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PaymentApproach, FormDataType, FETCH_STATUS, StatusType } from "@/app/types"
import { useGenerateReferenceKey } from "@/app/hooks/keygen";
import { usePaystack } from "@/app/hooks/paystack";

import RegisterForm from "@/app/components/RegisterForm";
import Link from "next/link";


export default function PgSignup() {
    const [data, setData] = useState<FormDataType>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        course: "",
        employment_status: "",
        payment_approach: "" as PaymentApproach,
        experience_level: 0,
        computer_access: false,
        internet_access: false,
        use_workspace: false,
        module: "Full payment",
        paid: false,
    } as FormDataType);
    const [amount, setAmount] = useState(0);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [error, setError] = useState<any>(null);
    const [formMessage, setFormMessage] = useState<string | any>("");
    const [formMessageType, setFormMessageType] = useState<StatusType>("idle");

    function formMessageDefaultStates() {
        setFormMessage("");
        setFormMessageType("idle");
    };
    function setFormMessageStates(message: string, type: StatusType) {
        setFormMessage(message);
        setFormMessageType(type);
    };

    useEffect(() => {
        if (status === FETCH_STATUS.IDLE) {
            formMessageDefaultStates();
        } else if (status === FETCH_STATUS.SUCCESS) {
            setFormMessageStates("The operation was successful", "success");
        } else if (status === FETCH_STATUS.LOADING) {
            setFormMessageStates("Loading, please wait...", "info");
        } else if (status === FETCH_STATUS.ERROR) {
            setFormMessageStates(error, "error");
        }

        setTimeout(() => {
            formMessageDefaultStates();
        }, 5000);

        return () => { }
    }, [status]);

    const router = useRouter();
    const submitUrl = "/api/pg-cohort/signup";

    async function verifyEmail(): Promise<boolean> {
        try {
            let emailResponse = await fetch("/api/pg-cohort/verify-email", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (emailResponse.ok) {
                const data = await emailResponse.json();
                return data.exists;
            }
        } catch (error) {
            console.log("Verify email err: ", error);
            setError(error);
            setStatus(FETCH_STATUS.ERROR);
            return false;
        }
        return false;
    }

    async function createProfile(paid?: boolean, ref?: any,) {
        setData((prev: FormDataType) => ({
            ...prev,
            reference: ref,
            paid: paid || false,
        }));

        const payload = {
            computer_access: data.computer_access,
            course: data.course,
            email: data.email,
            employment_status: data.employment_status,
            experience_level: data.experience_level,
            first_name: data.first_name,
            internet_access: data.internet_access,
            last_name: data.last_name,
            module: data.module,
            payment_approach: data.payment_approach,
            use_workspace: data.use_workspace,
            phone: data.phone,
            reference: data.reference || ref,
            paid,
        };
        try {
            let response = await fetch(submitUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) router.push("/signup/pg-cohort");
        } catch (error) {
            setError(error);
            setStatus(FETCH_STATUS.ERROR);
        }
    }

    let trxn_reference = useGenerateReferenceKey(data);
    const paystackConfig = {
        reference: trxn_reference,
        email: data.email,
        firstname: data.first_name,
        lastname: data.last_name,
        phone: data.phone,
        amount: amount * 100,
        onSuccessfulPay: createProfile
    };
    const { initializePayment } = usePaystack(paystackConfig);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setStatus(FETCH_STATUS.LOADING);

        const emailExists = await verifyEmail();

        if (emailExists) {
            setStatus(FETCH_STATUS.ERROR);
            setError("Email already in use!");
        } else {
            initializePayment();
        }
    }

    return (
        <>
            <RegisterForm
                formData={data}
                setFormData={setData}
                price={amount}
                setPrice={setAmount}
                handleSubmit={(ref) => handleSubmit(ref)}
                formTitle="PG Cohort"
                formFooter={<span>Sign up for the Data science PG Cohort program. <Link href="/signup/pg-cohort/about/" className='link link-info'>Learn more.</Link></span>}
                message={formMessage}
                messageType={formMessageType}
                isLoading={status === FETCH_STATUS.LOADING}
            />
        </>
    )
}
