import 'server-only';

import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  try {
    if (!process.env.HUME_API_KEY || !process.env.HUME_SECRET_KEY) {
      throw new Error('Missing Hume API credentials');
    }

    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY,
      secretKey: process.env.HUME_SECRET_KEY,
    });

    if (!accessToken || accessToken === "undefined") {
      throw new Error('Invalid access token received');
    }

    return accessToken;
  } catch (error) {
    console.error('Failed to fetch Hume access token:', error);
    return null;
  }
};
