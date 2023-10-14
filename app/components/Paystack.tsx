"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";

type TPaystackProps = {
    reference?: string;
    email: string;
    amount: number;
};

export default function Paystack({ amount, email, reference }: TPaystackProps) {
    const config: PaystackProps = {
        reference: reference ? reference : (new Date()).getTime().toString(),
        amount: amount * 100,
        email,
        publicKey: process.env.PAYSTACK_PUBLIC_KEY as string,
        firstname: "",
        lastname: "",
        phone: ""
    };

    const onSuccess = (ref?: any) => {
        console.log("Reference: ", ref);
    }

    const onClose = () => {
        console.log("Closed!");
    }

    const initalizePayment = usePaystackPayment(config);

    function handlePayment() {
        initalizePayment(onSuccess, onClose);
    }

    return (
        <div>
            <button className="btn btn-info btn-outline" onClick={handlePayment}>Continue to Payment</button>
        </div>
    )
}
