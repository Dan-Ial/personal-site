"use client"

import dynamic from "next/dynamic";

const GlobeComponent = dynamic(() => import("../components/Globe"), { ssr: false });


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full h-full">
        <GlobeComponent htmlElements={["<div></div>"]} />
      </div>
    </main>
  );
}
