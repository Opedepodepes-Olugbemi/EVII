"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Controls from "./Controls";
import { useRef, useState } from "react";
import { SplineViewer } from "./SplineViewer";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { VoiceCommand } from "./VoiceCommand";
import Expressions from "./Expressions";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];
  const [isCallEnabled, setIsCallEnabled] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  
  return (
    <div className="relative h-screen w-full">
      <SplineViewer />
      <Nav accessToken={accessToken}>
        {/* <ChatDrawer accessToken={accessToken} /> */}
      </Nav>
      <VoiceCommand 
        onWakeWord={() => setIsCallEnabled(true)}
        isCallActive={isCallActive}
      />
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId={configId}
      >
        <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
          <div className="p-4 mt-auto pointer-events-auto">
            <Controls 
              onStopListening={() => {
                setIsCallActive(false);
                setIsCallEnabled(false);
              }}
              isEnabled={isCallEnabled}
              onStartListening={() => setIsCallActive(true)}
            />
          </div>
        </div>
        <Expressions />
      </VoiceProvider>
      <Footer />
    </div>
  );
}
