export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import ClientChat from "./page.client";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  try {
    const accessToken = await getHumeAccessToken();

    if (!accessToken) {
      redirect('/');
    }

    return <ClientChat accessToken={accessToken} />;
  } catch (error) {
    console.error('Failed to get access token:', error);
    redirect('/');
  }
} 