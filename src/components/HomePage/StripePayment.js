import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

let stripePromise;

// call before redirect the user to checkout
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51LFvtLAftGq1GnERHaj2tSoee46DYq6CQDtO3SLtfIuYnQ2pcdbKqLci5rFC4uIjqcz5NBxtcZgO8YKevaPEpVcP00V24MI4tA'
    );
  }
  return stripePromise;
};

const StripePayment = ({ eventKey, eventValue }) => {
  // to be able to display stripe error message
  const [stripeError, setStripeError] = useState(null);
  // for loading message when being redirected to checkout page
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [checkoutOptions, setCheckoutOptions] = useState();

  const prices = {
    category_1: {
      price: '1000',
      key: 'price_1LFvxdAftGq1GnER9iBH7aIw',
    },
    category_2: {
      price: '2000',
      key: 'price_1LFvzdAftGq1GnERqyHhvhWX',
    },
    category_3: {
      price: '5000',
      key: 'price_1LFw0ZAftGq1GnERiEUuzkbm',
    },
    category_4: {
      price: '10000',
      key: 'price_1LFw12AftGq1GnERimOehAb4',
    },
    category_5: {
      price: '20000',
      key: 'price_1LFw1bAftGq1GnERms4lDMpq',
    },
  };

  useEffect(() => {
    const categories = Object.entries(prices);
    categories.map((item) => {
      const key = item[1].key;
      const price = item[1].price;

      if (Number(eventValue?.ticketPrice) === Number(price)) {
        return setProduct({
          price: key,
          quantity: 1,
        });
      }
    });
  }, []);

  useEffect(() => {
    setCheckoutOptions({
      lineItems: [product],
      mode: 'payment',
      successUrl: `${window.location.origin}/paid-success?success=true&key=${eventKey}`,
      cancelUrl: `${window.location.origin}/paid-success?success=false&key=${eventKey}`,
    });
  }, [product, eventKey]);

  const redirectToCheckout = async () => {
    // when the function is being called by checkoutbutton
    setIsLoading(true);

    console.log('Redirect to Checkout');

    const stripe = await getStripe();

    // stripe promise return an error if there is any
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log('Stripe Checkout Error', error);
    if (error) {
      setStripeError(error.message);
    }

    setIsLoading(true);
  };

  if (stripeError) alert(stripeError);

  return (
    <button
      className='event-info-button'
      onClick={redirectToCheckout}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Pay now'}
    </button>
  );
};

export default StripePayment;
