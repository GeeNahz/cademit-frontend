import { usePaystackPayment } from "react-paystack";
// import PaystackPop from '@paystack/inline-js';


type TPaystackProps = {
  reference?: string;
  email: string;
  amount: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  onSuccessUrl?: string;
  onFailUrl?: string;
  onSuccessfulPay?: (paid?: boolean, ref?: any) => Promise<any>;
};

function usePaystack({ reference, email, amount, firstname, lastname, phone, onSuccessfulPay }: TPaystackProps) {
  // const config = {
  //   reference: reference ? reference : (new Date()).getTime().toString(),
  //   key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  //   email,
  //   amount,
  //   firstname,
  //   lastname,
  //   phone,
  // };
  const config = {
    reference: reference ? reference : (new Date()).getTime().toString(),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    email,
    amount,
    firstname,
    lastname,
    phone,
  };

  function onSuccess(ref?: any) {
    if (onSuccessfulPay) onSuccessfulPay(true, ref);
  }
  function onClose() {
    console.log("Payment terminated.");
  }

  const payment = usePaystackPayment(config);
  
  function initializePayment() {
    payment(onSuccess, onClose);
    // try {
    //   const paystack = new PaystackPop();
    //   paystack.newTransaction({
    //     ...config,
    //     onSuccess: (transaction: any) => {
    //       if (onSuccessfulPay) onSuccessfulPay(true, transaction.reference);
    //     },
    //     onClose: () => {
    //       console.log("Payment was terminated.");
    //     },
    //   });
    // } catch (error) {
    //   console.log("Payment error: ", error);
    // }
  }
  return { initializePayment };
}


export { usePaystack };
