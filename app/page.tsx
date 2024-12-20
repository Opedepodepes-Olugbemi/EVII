"use client";

import { SplineViewer } from "@/components/SplineViewer";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full">
      <SplineViewer />
      <Nav />
      <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur">
        <div className="h-full flex flex-col items-center justify-center">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => router.push("/chat")}
            className="bg-red-600 hover:bg-red-700 text-white rounded-md border-0 px-6 py-4 text-md flex items-center gap-2"
          >
            <Phone className="w-6 h-6" />
            Start Session
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
