import MorningEssentialsDropDown from "../../../components/DashboardContainerComponents/TaskCreatorComponents/MorningEssentialsDropDown";

const TaskCreatorPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-3 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Task Creator</h1>
        <p className="text-lg ml-1">
          Use this page to create, organize, and manage your tasks.
        </p>
      </div>
      <div>
        <MorningEssentialsDropDown />
      </div>
    </main>
  );
};

export default TaskCreatorPage;
