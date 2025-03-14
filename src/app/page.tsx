import GlobeComponent from "@/components/Globe";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Interactive Globe</h1>
      <div className="w-full h-[500px]">
        <GlobeComponent />
      </div>
    </main>
  );
}
