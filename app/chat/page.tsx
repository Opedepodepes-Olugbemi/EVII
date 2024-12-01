export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ClientChat from "./page.client";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    console.error('No access token available');
    redirect('/');
  }

  return <ClientChat accessToken={accessToken} />;
} 