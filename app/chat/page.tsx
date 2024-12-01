import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ClientChat from "./page.client";

export default async function ChatPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("No access token");
  }

  return <ClientChat accessToken={accessToken} />;
} 