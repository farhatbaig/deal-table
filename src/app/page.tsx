import DealsTable from "../components/DealsTable";

export default function Home() {
  return (
    <main className="p-8 max-w-full">
      <h1 className="text-2xl font-bold mb-6">Deals Table Demo</h1>
      <DealsTable />
    </main>
  );
}
