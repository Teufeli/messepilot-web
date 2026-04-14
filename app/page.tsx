import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight">
          MessePilot 🚀
        </h1>
      </div>

    </main>
  );
}