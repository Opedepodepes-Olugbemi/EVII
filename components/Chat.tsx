"use client";

import { VoiceProvider } from "@humeai/voice-react";
import { useState } from "react";
import { SplineViewer } from "./SplineViewer";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import Expressions from "./Expressions";
import { Button } from "./ui/button";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  
  return (
    <div className="relative h-screen w-full">
      <SplineViewer />
      <Nav accessToken={accessToken} />
      
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => setIsSessionStarted(true)}
            className="bg-black text-white hover:bg-black/90 px-8 py-6 text-lg"
          >
            {isSessionStarted ? 'Session Started' : 'Start Session'}
          </Button>
        </div>
        {isSessionStarted && <Expressions />}
      </VoiceProvider>
      <Footer />
    </div>
  );
}
