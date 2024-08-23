import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen-with-Header items-center justify-center">
      <div className="text-center px-4">
        <h3 className="font-bold text-2xl">Gerencie sua empresa</h3>
        <h2 className="font-bold text-4xl text-blue-800">Atendimentos, Clientes</h2>

        <Image src="/hero.svg" alt="logo" width={600} height={600} className="mt-10" />
      </div>
    </main>
  );
}
