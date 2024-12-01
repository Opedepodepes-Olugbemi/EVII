"use client";

import { VoiceProvider } from "@humeai/voice-react";
import { SplineViewer } from "@/components/SplineViewer";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Messages from "@/components/Messages";
import Controls from "@/components/Controls";
import { useState } from "react";

export default function ClientChat({ accessToken }: { accessToken: string }) {
  const [isCallActive, setIsCallActive] = useState(false);

  return (
    <div className="relative h-screen w-full">
      <SplineViewer />
      <Nav />
      <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
          <div className="flex-1 overflow-hidden pointer-events-auto">
            <Messages />
          </div>
          <div className="p-4 pointer-events-auto">
            <Controls 
              onStopListening={() => setIsCallActive(false)}
              isEnabled={true}
              onStartListening={() => setIsCallActive(true)}
            />
          </div>
        </div>
      </VoiceProvider>
      <Footer />
    </div>
  );
} 