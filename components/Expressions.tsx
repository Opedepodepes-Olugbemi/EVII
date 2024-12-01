"use client";
import { expressionLabels } from "@/utils/expressionLabels";
import * as R from "remeda";
import { useVoice } from "@humeai/voice-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ExpressionsProps {
  values?: Record<string, number>;
}

export default function Expressions({ values = {} }: ExpressionsProps) {
  const { status } = useVoice();
  const [displayExpressions, setDisplayExpressions] = useState<[string, number][]>([]);
  const [shouldShow, setShouldShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const liveValues = status.value === "connected" && "predictions" in status 
    ? (status.predictions as { emotions: Record<string, number> })?.emotions || {}
    : {};

  const currentValues = Object.keys(values).length > 0 ? values : liveValues;

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const top3 = R.pipe(
      currentValues,
      R.entries(),
      R.sortBy(R.pathOr([1], 0)),
      R.reverse(),
      R.take(3)
    );

    // Hide current expression if showing
    setShouldShow(false);

    // Wait for fade out animation
    setTimeout(() => {
      setDisplayExpressions(top3);
      setShouldShow(true);

      // Set timer to hide after 5 seconds
      timerRef.current = setTimeout(() => {
        setShouldShow(false);
      }, 2000);
    }, 400);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [JSON.stringify(currentValues)]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 rounded-lg bg-chalk/80 dark:bg-mirage/80 backdrop-blur-md border border-mirage/10 dark:border-chalk/10"
          >
            <div className="flex gap-3">
              {displayExpressions.map(([key, value]) => (
                <div key={key} className="text-sm">
                  <span className="font-medium text-mirage dark:text-chalk">
                    {expressionLabels[key]}
                  </span>
                  <span className="ml-2 opacity-50">
                    {(value * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
