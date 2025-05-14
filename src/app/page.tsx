import { TipForm } from '../components/TipForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">FarcasTip App</h1>
        <TipForm />
      </div>
    </main>
  );
}
