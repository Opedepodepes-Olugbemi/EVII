"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Messages from "./Messages";
import { ComponentRef, useRef, useState } from "react";
import { VoiceProvider } from "@humeai/voice-react";

export function ChatDrawer({ accessToken }: { accessToken: string }) {
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white text-black hover:bg-white/90 flex items-center gap-2 border-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Messages</span>
        </Button>
      </SheetTrigger>
      {isOpen && (
        <SheetContent 
          side="right" 
          className="w-[400px] sm:w-[540px] p-0 bg-white border-l shadow-lg"
        >
          <VoiceProvider
            auth={{ type: "accessToken", value: accessToken }}
            configId={configId}
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <Messages ref={ref} />
              </div>
            </div>
          </VoiceProvider>
        </SheetContent>
      )}
    </Sheet>
  );
} 