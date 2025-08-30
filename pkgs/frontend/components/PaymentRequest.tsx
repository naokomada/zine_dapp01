'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useX402 } from '@/hooks/useX402';
import { formatEther } from 'viem';

interface PaymentRequestProps {
  contentName: string;
  priceEth: string;
  nftContractAddress: `0x${string}`;
  authorAddress: `0x${string}`;
}

export function PaymentRequest({
  contentName,
  priceEth,
  nftContractAddress,
  authorAddress,
}: PaymentRequestProps) {
  const { requestPayment, isPaying, error, transactionHash } = useX402();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    const result = await requestPayment(priceEth, nftContractAddress, authorAddress);
    if (result?.success) {
      setPaymentSuccess(true);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-lg mb-2">You have successfully purchased "{contentName}".</p>
        {transactionHash && (
          <p className="text-sm text-gray-500">
            Transaction Hash: <a href={`https://sepolia.basescan.org/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="underline">{transactionHash}</a>
          </p>
        )}
        <p className="text-sm text-gray-500 mt-4">
          (In a real app, you would now get a download link for the content.)
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <h2 className="text-3xl font-bold mb-4">Purchase "{contentName}"</h2>
      <p className="text-xl mb-6">Price: {priceEth} ETH</p>
      <Button onClick={handlePayment} disabled={isPaying}>
        {isPaying ? 'Processing Payment...' : 'Buy Now'}
      </Button>
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}
