import {
  Button,
  Card,
  Divider,
  Image,
  Loader,
  NumberInput,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Shared/ProductCard/ProductCard';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51L4Q7qJllomnrkH1Ppf0NqobYe37SS9eGFYqhDn7GUHqNE7YusRAMs2r0DiGNkeHkEplVHuOVhI8kbgWmZmrIg1D00SVmMpyPx'
);

const Checkout = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(['paymentOrder', id], () =>
    fetch(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <Loader className="m-auto" color="orange" size="xl" variant="dots" />
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-10">
      <h1 className="text-center md:py-10 pt-5">Checkout</h1>
      <div className="flex flex-col md:flex-row items-center justify-between md:justify-center mx-10 md:mx-[64px] md:gap-10">
        <Card shadow="lg" className="w-[350px] md:w-[800px]">
          <Card.Section>
            <div style={{ minHeight: '200px', width: '200px', margin: 'auto' }}>
              <Image
                src={order?.image}
                alt="Norway"
                style={{
                  objectFit: 'contain',
                  margin: 'auto',
                }}
              />
            </div>
          </Card.Section>
          <Text weight={600} size="md" className="">
            {order?.productName}
          </Text>

          <h3 className="font-medium">
            Ordered Quantity:{' '}
            <span className="font-bold text-orange-500">{order?.quantity}</span>{' '}
          </h3>
          <h3 className="font-medium">
            Total Payable Price:{' '}
            <span className="font-bold text-orange-500">{order?.price}</span>
          </h3>
          <Divider my={10} />

          <Text style={{ lineHeight: 1.5, marginBottom: 3, fontWeight: 600 }}>
            User Information
          </Text>
          <Text style={{ lineHeight: 1.5 }}>Name: {order?.name}</Text>
          <Text style={{ lineHeight: 1.5 }}>Email: {order?.email}</Text>
          <Text style={{ lineHeight: 1.5 }}>Phone: {order?.phone}</Text>
          <Text mb="lg" style={{ lineHeight: 1.5 }}>
            Address: {order?.address}
          </Text>

          {order?.productId && (
            <Elements stripe={stripePromise}>
              <CheckoutForm {...order} />
            </Elements>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
