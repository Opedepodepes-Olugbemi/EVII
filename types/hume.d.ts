declare module 'hume' {
  export function fetchAccessToken(config: {
    apiKey: string;
    secretKey: string;
  }): Promise<string>;
} 