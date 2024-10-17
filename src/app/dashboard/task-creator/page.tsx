import AllTasks from "../../../components/TaskCreatorComponents/AllTasks";

const TaskCreatorPage = () => {
  return (
    <main className="container flex flex-col mx-auto">
      <div className="flex flex-col border-b border-neutral-300 pb-3 px-6">
        <h1 className="text-6xl font-light text-neutral-700">Task Creator</h1>
        <p className="text-lg ml-1">
          Use this page to create, organize, and manage your tasks. Upon saving
          a task, it will be available to view and edit in your dashboard.
        </p>
      </div>
      <div>
        <AllTasks />
      </div>
    </main>
  );
};

export default TaskCreatorPage;
