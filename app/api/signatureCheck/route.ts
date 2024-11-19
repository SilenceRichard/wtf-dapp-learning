import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

// 创建公共客户端
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// 处理 POST 请求
export async function POST(request: Request) {
  try {
    const body = await request.json(); // 获取请求体 JSON 数据
    const valid = await publicClient.verifyMessage({
      address: body.address,
      message: "test message for WTF-DApp demo",
      signature: body.signature,
    });

    return new Response(JSON.stringify({ data: valid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 处理 GET 请求（用于直接浏览器访问验证）
export async function GET() {
  return new Response(
    JSON.stringify({ message: "Please use POST method for this endpoint." }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
