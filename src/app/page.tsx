"use client"

import dynamic from "next/dynamic";
import markers from "../../public/globemarkers.json"

const GlobeComponent = dynamic(() => import("../components/Globe"), { ssr: false });


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full h-full">
        <GlobeComponent htmlElements={markers} />
      </div>
    </main>
  );
}
