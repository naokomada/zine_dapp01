'use client';

import { useState } from 'react';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { zineNFTABI } from '@/lib/contracts';

export function useZineNFT(contractAddress: `0x${string}`) {
  const { address: userAddress } = useAccount();
  const [error, setError] = useState<Error | null>(null);

  // Read contract functions
  const { data: name } = useReadContract({
    address: contractAddress,
    abi: zineNFTABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: contractAddress,
    abi: zineNFTABI,
    functionName: 'symbol',
  });

  const { data: minter } = useReadContract({
    address: contractAddress,
    abi: zineNFTABI,
    functionName: 'minter',
  });

  const { data: ownerBalance } = useReadContract({
    address: contractAddress,
    abi: zineNFTABI,
    functionName: 'balanceOf',
    args: [userAddress || '0x0000000000000000000000000000000000000000'], // Default to zero address if not connected
    query: {
      enabled: !!userAddress, // Only query if user is connected
    },
  });

  // Write contract functions (for owner/minter)
  const { writeContract: setMinterWrite, isPending: isSettingMinter } = useWriteContract();
  const { writeContract: mintWrite, isPending: isMinting } = useWriteContract();

  const setMinter = async (newMinterAddress: `0x${string}`) => {
    setError(null);
    try {
      await setMinterWrite({
        address: contractAddress,
        abi: zineNFTABI,
        functionName: 'setMinter',
        args: [newMinterAddress],
      });
    } catch (err) {
      setError(err as Error);
    }
  };

  // This mint function would typically be called by the x402 payment process (server-side)
  // For client-side testing/dummy purposes, we can expose it.
  const mintNFT = async (toAddress: `0x${string}`) => {
    setError(null);
    try {
      await mintWrite({
        address: contractAddress,
        abi: zineNFTABI,
        functionName: 'mint',
        args: [toAddress],
      });
    } catch (err) {
      setError(err as Error);
    }
  };

  // Function to get owned NFTs (simplified)
  // In a real app, you'd use a subgraph or iterate tokenOfOwnerByIndex
  const getOwnedNFTs = async () => {
    if (!userAddress || !ownerBalance) return [];

    // For simplicity, we'll just return a placeholder for now.
    // Actual implementation would involve fetching token URIs and metadata.
    console.log(`User ${userAddress} owns ${ownerBalance} NFTs from contract ${contractAddress}`);
    return Array.from({ length: Number(ownerBalance) }).map((_, i) => ({
      tokenId: i, // Placeholder
      tokenURI: `https://example.com/token/${i}`, // Placeholder
      name: `Zine #${i}`, // Placeholder
    }));
  };

  return {
    name,
    symbol,
    minter,
    ownerBalance,
    setMinter,
    isSettingMinter,
    mintNFT,
    isMinting,
    getOwnedNFTs,
    error,
  };
}
