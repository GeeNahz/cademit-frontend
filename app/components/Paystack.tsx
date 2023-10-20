"use client";

import clsx from "clsx";
import { FormEvent } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";

type TPaystackProps = {
    reference?: string;
    isDisable?: boolean;
    email: string;
    amount: number;
    handleSubmit: (ref: any) => any;
};

export default function Paystack({ amount, email, reference, isDisable, handleSubmit }: TPaystackProps) {    
    const config: PaystackProps = {
        reference: reference ? reference : (new Date()).getTime().toString(),
        amount: amount * 100,
        email,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
        firstname: "",
        lastname: "",
        phone: ""
    };    

    const onSuccess = (ref?: any) => {
        handleSubmit(ref)
    }

    const onClose = () => {
        console.log("Closed!");
    }

    const initalizePayment = usePaystackPayment(config);

    function handlePayment(e: FormEvent) {
        e.preventDefault();

        initalizePayment(onSuccess, onClose);
    }

    const btnTextColor = clsx(
        "btn btn-block",
        {
            "text-neutral btn-outline opacity-50 pointer-events-none": isDisable,
            "text-inherit btn-success": !isDisable,
        },
    );

    return (
        <div>
            <button className={btnTextColor} onClick={handlePayment}>Continue to Payment</button>
        </div>
    )
}
