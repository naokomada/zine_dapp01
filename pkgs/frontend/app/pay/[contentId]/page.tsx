import { PaymentRequest } from '@/components/PaymentRequest';

interface PayPageProps {
  params: {
    contentId: string;
  };
}

export default function PayPage({ params }: PayPageProps) {
  // In a real application, you would fetch content details based on params.contentId
  // For now, we'll use hardcoded values.
  const contentDetails = {
    name: "My Awesome Zine",
    price: "0.01", // ETH
    nftContractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Placeholder ZineNFT contract address
    authorAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Placeholder author address
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <PaymentRequest
        contentName={contentDetails.name}
        priceEth={contentDetails.price}
        nftContractAddress={contentDetails.nftContractAddress as `0x${string}`}
        authorAddress={contentDetails.authorAddress as `0x${string}`}
      />
    </div>
  );
}
