import { CaseStudies } from "../../../components/CaseStudies";

const CaseStudiesPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-3 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Case Studies</h1>
        <p className="text-lg ml-1">
          Here are some personal accounts on how Earn After Reading has helped
          families and students alike.
        </p>
      </div>
      <div>
        <CaseStudies />
      </div>
    </main>
  );
};

export default CaseStudiesPage;
