'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold">Zine DApp</h1>
      <ConnectButton />
    </header>
  );
}
