import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';


const StripePaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [name, setName] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            return;
        }

        // Create a payment method using the card details automatically handled by Stripe
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,

            billing_details: {
                name: name
            }
        });

        if (error) {
            setError(error.message || 'An error occurred.');
            setSuccess(null);
        } else {
            setError(null);
            setSuccess('Payment successful! Payment Method ID: ' + paymentMethod?.id);
            console.log(paymentMethod);
            // You can send paymentMethod.id to your backend for processing
        }
    };

    const cardNumberStyle = {
        base: {
            color: '#000',
            '::placeholder': {
                color: '#ccc'
            },
        },
        invalid: {
            color: 'red',
            iconColor: 'red'
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                    </label>
                    <CardNumberElement
                        options={{ style: cardNumberStyle }}
                        className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date (MM/YY)
                        </label>
                        <CardExpiryElement
                            options={{ style: cardNumberStyle }}
                            className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                        </label>
                        <CardCvcElement
                            options={{ style: cardNumberStyle }}
                            className="w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                        Pay Now
                    </button>
                </div>

                {error && <div className="mt-4 text-red-600">{error}</div>}
                {success && <div className="mt-4 text-green-600">{success}</div>}
            </form>
        </div>
    )
}

export default StripePaymentForm;