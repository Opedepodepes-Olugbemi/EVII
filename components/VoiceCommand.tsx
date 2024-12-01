"use client";

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
}

interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

interface SpeechRecognitionEvent {
  results: {
    item(index: number): { item(index: number): SpeechRecognitionResult };
    length: number;
  };
}

interface VoiceCommandProps {
  onWakeWord: () => void;
  isCallActive?: boolean;
}

export function VoiceCommand({ onWakeWord, isCallActive = false }: VoiceCommandProps) {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isActiveRef = useRef(false);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to safely start recognition
  const startRecognition = async () => {
    try {
      if (recognitionRef.current && !isActiveRef.current) {
        await recognitionRef.current.start();
        isActiveRef.current = true;
        console.log('Recognition started');
      }
    } catch (error) {
      console.error('Failed to start recognition:', error);
      isActiveRef.current = false;
    }
  };

  // Function to safely stop recognition
  const stopRecognition = () => {
    try {
      if (recognitionRef.current && isActiveRef.current) {
        recognitionRef.current.stop();
        isActiveRef.current = false;
        console.log('Recognition stopped');
      }
    } catch (error) {
      console.error('Failed to stop recognition:', error);
    }
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionRef.current = recognitionInstance;
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    
    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results.item(i).item(0).transcript.toLowerCase() + ' ';
      }

      if (transcript.includes('hello kizuna') && !isCallActive) {
        onWakeWord();
      }
    };

    recognitionInstance.onerror = (event: { error: string }) => {
      console.error('Speech recognition error:', event.error);
      isActiveRef.current = false;
      
      // Clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };

    recognitionInstance.onend = () => {
      isActiveRef.current = false;
      
      // Clear any existing restart timeout
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      
      // Only attempt to restart if not in a call and after a short delay
      if (!isCallActive) {
        restartTimeoutRef.current = setTimeout(() => {
          startRecognition();
        }, 300); // Add a small delay before restarting
      }
    };

    // Initial start
    startRecognition();

    return () => {
      // Clear any pending restart
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      stopRecognition();
    };
  }, [onWakeWord, isCallActive]);

  return null;
} 