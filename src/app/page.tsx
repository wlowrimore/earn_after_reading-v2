import LandingPage from '../components/LandingPage';

export default function Home() {
  return (
    <main className="container flex flex-col mx-auto p-12">
      <h1 className="text-6xl font-light py-3 text-neutral-700 border-b border-neutral-700">
        Earn After Reading
      </h1>
      <LandingPage />
    </main>
  );
}
