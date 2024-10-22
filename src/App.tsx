//way - 1
import StripeProvider1 from './stripe - 2/StripeProvider';
import StripePaymentForm1 from './stripe - 2/StripePaymentForm';
//way - 2
import StripeProvider2 from './stripe - 1/StripeProvider';
import StripePaymentForm2 from './stripe - 1/StripePaymentForm';


export default function App(): JSX.Element {
    return (
        <>
            <StripeProvider1>
                <StripePaymentForm1 />
            </StripeProvider1>

            <StripeProvider2>
                <StripePaymentForm2 />
            </StripeProvider2>
        </>
    )
}