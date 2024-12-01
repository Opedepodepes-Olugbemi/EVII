"use client";

import { SplineViewer } from "@/components/SplineViewer";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { VoiceCommand } from "@/components/VoiceCommand";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full">
      <SplineViewer />
      <Nav />
      <VoiceCommand 
        onWakeWord={() => {
          router.push("/chat");
        }}
        isCallActive={false}
      />
      <Footer />
    </div>
  );
}
