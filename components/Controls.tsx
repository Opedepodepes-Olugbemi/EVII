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
    <div className="flex justify-center items-start gap-4">
      <Button
        variant="default"
        size="icon"
        className={`rounded-full w-12 h-12 transition-opacity ${!isEnabled && !isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleToggle}
        disabled={!isEnabled && !isRecording}
      > 
        {isRecording ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
