"use client";
import React from "react";
import {
  MetaMask,
  WagmiWeb3ConfigProvider,
  Sepolia,
  Polygon,
  Hardhat,
  WalletConnect,
} from "@ant-design/web3-wagmi";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet, sepolia, polygon, hardhat } from "wagmi/chains";
import { ConnectButton, Connector } from "@ant-design/web3";
import { SendEth } from "../../components/SendEth";
const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http("http://127.0.0.1:8545/"),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});
const TransactionDemo: React.FC = () => {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      wallets={[MetaMask()]}
    >
      <Connector>
        <ConnectButton />
      </Connector>
      <SendEth />
    </WagmiWeb3ConfigProvider>
  );
};
export default TransactionDemo;
