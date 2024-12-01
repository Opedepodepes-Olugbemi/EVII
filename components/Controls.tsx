"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";

interface ControlsProps {
  onStopListening?: () => void;
  onStartListening?: () => void;
  isEnabled?: boolean;
}

export default function Controls({ 
  onStopListening, 
  onStartListening,
  isEnabled = false 
}: ControlsProps) {
  const { status, connect, disconnect } = useVoice();
  const isRecording = status.value === "connected";

  const handleToggle = () => {
    if (isRecording) {
      disconnect();
      onStopListening?.();
    } else if (isEnabled) {
      connect();
      onStartListening?.();
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 right-40 mb-12">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full w-12 h-12 transition-opacity flex items-center justify-center
          ${!isEnabled && !isRecording ? 'opacity-50 cursor-not-allowed' : ''}
          bg-secondary`}
        onClick={handleToggle}
        disabled={!isEnabled && !isRecording}
      > 
        {isRecording ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
