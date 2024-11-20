import { mainnet, sepolia, polygon, hardhat } from "wagmi/chains";
import {
  WagmiWeb3ConfigProvider,
  MetaMask,
  Sepolia,
  Polygon,
  Hardhat,
  WalletConnect,
} from "@ant-design/web3-wagmi";
import { ConnectButton, Connector, Address, NFTCard } from "@ant-design/web3";
import { injected, walletConnect } from "wagmi/connectors";
import { createConfig, http } from "wagmi";
// ...

const config = createConfig({
  chains: [mainnet, sepolia, polygon, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [hardhat.id]: http("http://127.0.0.1:8545/"),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
    walletConnect({
      projectId: "c07c0051c2055890eade3556618e38a6",
      showQrModal: false,
    }),
  ],
});

const contractInfo = [
  {
    id: 1,
    name: "Ethereum",
    contractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  },
  {
    id: 5,
    name: "Sepolia",
    contractAddress: "0x418325c3979b7f8a17678ec2463a74355bdbe72c",
  },
  {
    id: 137,
    name: "Polygon",
    contractAddress: "0x418325c3979b7f8a17678ec2463a74355bdbe72c",
  },
  {
    id: hardhat.id,
    name: "Hardhat",
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // 这里需要替换为你本地部署后获得的地址
  },
];

// ...

export default function Web3() {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      wallets={[MetaMask(), WalletConnect()]}
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      chains={[Sepolia, Polygon, Hardhat]}
    >
      <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
      <NFTCard
        address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
        tokenId={641}
      />
      <Connector>
        <ConnectButton />
      </Connector>
      {/* <CallTest /> */}
    </WagmiWeb3ConfigProvider>
  );
}
