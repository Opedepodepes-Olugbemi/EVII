"use client";

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

export const SplineViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);
    app.load('https://prod.spline.design/zGtCCUjcOALVU7A6/scene.splinecode')
      .then(() => {
        if (canvasRef.current) {
          canvasRef.current.style.background = 'transparent';
        }
      });

    return () => {
      app.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        data-events-target="global"
      />
    </div>
  );
}; 