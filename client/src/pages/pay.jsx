import React, {useEffect, useState} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/CheckOutForm.jsx";
import {useSelector} from "react-redux";

const stripePromise = loadStripe("pk_test_51Mj9HDBiXFUnx1gbeN4dqFnZAFvxVOKlYdh74QHpSvnI82Hoh9KGjCRemeF7JF3XTLIcesSi2ZgJK7ojriXpBPUp00Aqv1VtTs");

function Pay(props) {
    const cart = useSelector(state => state.cart)
    const order = {
        userId : '640665fe5a8fc256dfa15b58',
        products : cart.products,
        amount : 100,
        address: "eeee",
    }
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        fetch("http://localhost:5001/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            )}
        </div>
    );
}

export default Pay;
