import { HowItWorks } from "../../../components/DashboardContainerComponents/HowItWorks";

const HowItWorksPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-2 px-6">
        <h1 className="text-6xl font-light text-neutral-700">How It Works</h1>
        <p className="text-2xl">
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
