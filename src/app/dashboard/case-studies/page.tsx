import { CaseStudies } from "../../../components/DashboardContainerComponents/CaseStudies";

const HowItWorksPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-2 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Case Studies</h1>
        <p className="text-2xl">
          Here are some personal accounts on how Earn After Reading has helped
          families.
        </p>
      </div>
      <div>
        <CaseStudies />
      </div>
    </main>
  );
};

export default HowItWorksPage;
