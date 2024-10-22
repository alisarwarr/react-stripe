import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe('pk_test_514AqCsP9MQAmDwQE161RjmZFORfzfJdIRDjUa2cQwsGhf7WVbA8Qi88WsskJguXDUrW0YJmufSBAcep4CWd0HpHt00ryNhJ7Rb');

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export default StripeProvider;