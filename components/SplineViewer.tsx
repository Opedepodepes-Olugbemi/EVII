"use client";

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

export const SplineViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);
    appRef.current = app;

    app.load('https://prod.spline.design/zGtCCUjcOALVU7A6/scene.splinecode')
      .then((spline) => {
        if (canvasRef.current) {
          canvasRef.current.style.background = 'transparent';
        }
      })
      .catch(console.error);

    return () => {
      // Proper cleanup
      if (appRef.current) {
        try {
          appRef.current.dispose();
          appRef.current = null;
        } catch (error) {
          console.warn('Spline cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full pointer-events-auto"
        style={{ touchAction: 'none' }}
        data-events-target="global"
      />
    </div>
  );
}; 