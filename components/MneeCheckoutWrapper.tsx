"use client";

import React, { FC } from 'react';
import type { MneeCheckoutProps } from '@mnee-pay/checkout';

import dynamic from 'next/dynamic';

const MneeCheckout = dynamic(
  () => import('@mnee-pay/checkout').then((mod) => mod.MneeCheckout),
  { 
    ssr: false,
    loading: () => <div>Loading payment...</div>
  }
);

const MneeCheckoutWrapper: FC<Omit<MneeCheckoutProps, 'apiBaseUrl'>> = (props) => {
  return (
    <MneeCheckout
      {...props}
      apiBaseUrl={process.env.NEXT_PUBLIC_API_BASE_URL || ''}
    />
  )
}

export default MneeCheckoutWrapper
