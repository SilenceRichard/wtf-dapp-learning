"use client";
import {
  Mainnet,
  Localhost,
  WagmiWeb3ConfigProvider,
  MetaMask,
} from "@ant-design/web3-wagmi";
import { parseEther } from "viem";
import { Button, message } from "antd";
import { http, useReadContract, useWriteContract } from "wagmi";
import {
  Address,
  NFTCard,
  ConnectButton,
  Connector,
  useAccount,
} from "@ant-design/web3";
import { abi } from "./abi";

const CallTest = () => {
  const { account } = useAccount();
  console.log("account:", account);
  const result = useReadContract({
    abi,
    address: "0xB3B263442CF2EfA59A1A83D77ab4725befD22C35",
    functionName: "balanceOf",
    args: [account?.address as `0x${string}`],
  });

  const { writeContract } = useWriteContract();
  return (
    <div>
      {result.data?.toString()}
      <Button
        onClick={() => {
          writeContract(
            {
              abi,
              address: "0xB3B263442CF2EfA59A1A83D77ab4725befD22C35",
              functionName: "init",
              // args: [BigInt(1)],
              // value: parseEther("0.01"),
            },
            {
              onSuccess: () => {
                message.success("Init Success");
              },
              onError: (err) => {
                console.log("err:", err);
                message.error(err.message);
              },
            }
          );
        }}
      >
        init
      </Button>
      <Button
        onClick={() => {
          writeContract(
            {
              abi,
              address: "0xB3B263442CF2EfA59A1A83D77ab4725befD22C35",
              functionName: "numberMinted",
              args: [account?.address as `0x${string}`],
              // value: parseEther("0.01"),
            },
            {
              onSuccess: (res) => {
                // message.success("Number Minted:", res);
                console.log("Number Minted:", res);
              },
              onError: (err) => {
                console.log("err:", err);
                message.error(err.message);
              },
            }
          );
        }}
      >
        numberMinted
      </Button>
      <Button
        onClick={() => {
          writeContract(
            {
              abi,
              address: "0xB3B263442CF2EfA59A1A83D77ab4725befD22C35",
              functionName: "mint",
              args: [BigInt(1)],
              value: parseEther("0.01"),
            },
            {
              onSuccess: () => {
                message.success("Mint Success");
              },
              onError: (err) => {
                console.log("err:", err);
                message.error(err.message);
              },
            }
          );
        }}
      >
        mint
      </Button>
    </div>
  );
};

export default function Web3() {
  return (
    <WagmiWeb3ConfigProvider
      chains={[Mainnet, Localhost]}
      transports={{
        [Mainnet.id]: http(
          "https://api.zan.top/node/v1/eth/mainnet/f54457478f874ba2975e0eb4ee272b2c"
        ),
        [Localhost.id]: http("http://127.0.0.1:7545"),
      }}
      wallets={[MetaMask()]}
    >
      <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
      <NFTCard
        address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
        tokenId={641}
      />
      <Connector>
        <ConnectButton />
      </Connector>
      <CallTest />
    </WagmiWeb3ConfigProvider>
  );
}
