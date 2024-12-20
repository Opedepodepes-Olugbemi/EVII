"use client";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useState, useEffect, useRef } from "react";
import Expressions from "./Expressions";

type EmotionScores = {
  [key: string]: number;
};

interface VisibleMessage {
  content: string;
  id: string;
  expressions: Record<string, number>;
  shouldShow: boolean;
}

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  const [visibleMessages, setVisibleMessages] = useState<VisibleMessage[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const assistantMessages = messages.filter(
      (msg) => msg.type === "assistant_message"
    );
    const latestMessage = assistantMessages[assistantMessages.length - 1];

    // Type guard to check if the message has the expected structure
    const hasMessageContent = (msg: any): msg is { 
      type: string; 
      message: { content: string }; 
      models?: { prosody?: { scores: Record<string, number> } } 
    } => {
      return msg?.message?.content !== undefined;
    };

    if (!hasMessageContent(latestMessage)) return;

    const newMessageId = latestMessage.type + messages.length;
    
    // Clear existing timer
    if (timersRef.current.has(newMessageId)) {
      clearTimeout(timersRef.current.get(newMessageId));
    }

    // Create new message with explicit type safety
    const newMessage: VisibleMessage = {
      content: latestMessage.message.content,
      id: newMessageId,
      expressions: (latestMessage.models?.prosody?.scores ?? {}) as Record<string, number>,
      shouldShow: true
    };

    setVisibleMessages(prev => {
      const updatedOldMessages = prev.map(msg => ({
        ...msg,
        shouldShow: false
      }));
      return [...updatedOldMessages, newMessage];
    });

    // Set timer to hide new message
    const timer = setTimeout(() => {
      setVisibleMessages(currentMessages => 
        currentMessages.map(msg => 
          msg.id === newMessageId 
            ? { ...msg, shouldShow: false }
            : msg
        )
      );
    }, 3000);

    timersRef.current.set(newMessageId, timer);

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [messages]);

  return (
    <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2" ref={ref}>
      <AnimatePresence>
        {visibleMessages.map((msg) => (
          msg.shouldShow && (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 rounded-lg bg-chalk/80 dark:bg-mirage/80 backdrop-blur-md border border-mirage/10 dark:border-chalk/10 mb-4"
            >
              <div className="text-sm font-medium text-mirage dark:text-chalk">
                {msg.content}
              </div>
              {msg.expressions && <Expressions values={msg.expressions} />}
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
});

export default Messages;
