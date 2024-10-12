import { HowItWorks } from "../../../components/HowItWorks";

const HowItWorksPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-3 px-6">
        <h1 className="text-6xl font-light text-neutral-700">How It Works</h1>
        <p className="text-lg ml-1">
          Everything you need to know about Earn After Reading.
        </p>
      </div>
      <div>
        <HowItWorks />
      </div>
    </main>
  );
};

export default HowItWorksPage;
