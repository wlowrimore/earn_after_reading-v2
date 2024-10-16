"use client";

import { useTaskContext } from "../../app/context/TaskContext";

const DashboardSavedTasks: React.FC = () => {
  const {
    loadedTasks,
    currentTime,
    titleTime,
    uniqueTaskFors,
    datesCreated,
    handleCheckboxChange,
    getTaskStatus,
    getStatusColor,
  } = useTaskContext();

  return (
    <main className="m-6">
      {uniqueTaskFors.map((taskFor) => (
        <div key={taskFor}>
          <div className="flex justify-between items-end bg-neutral-700 border-b-4 border-blue-200 text-white text-2xl py-1 px-4 rounded-t-lg shadow-lg shadow-neutral-700">
            <h3 className="text-base">Saved Tasks for {taskFor}</h3>
            <p className="text-base">{titleTime} Tasks</p>
            <p className="text-base">
              Created on{" "}
              {datesCreated?.[0]
                ? new Date(datesCreated?.[0]).toLocaleDateString()
                : ""}
            </p>
          </div>
          <div className="bg-indigo-50 px-4 py-2 space-y-4 rounded-b-lg shadow-md shadow-neutral-600">
            {loadedTasks
              .filter((t) => t.taskFor === taskFor)
              .map((t) => {
                const taskStatus = getTaskStatus(t.deadline);
                return (
                  <div
                    key={t.id}
                    className={`p-2 rounded ${getStatusColor(taskStatus)}`}
                  >
                    <div className="flex justify-between items-center border-b border-neutral-400">
                      <p className="w-[13rem]">{t.text}</p>
                      <p className="w-[6rem]">{t.deadline}</p>
                      <p>{t.duedate}</p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={t.id}
                          checked={t.isCompleted}
                          onChange={(event) =>
                            handleCheckboxChange(event, t.id)
                          }
                          className="w-4 h-4"
                        />
                        <span
                          className={`ml-[-2rem] text-[0.85rem] ${
                            t.isCompleted
                              ? "bg-neutral-600 font-semibold text-green-300 px-2 rounded-full"
                              : "bg-transparent font-semibold text-red-500 px-2 rounded-full"
                          }`}
                        >
                          {t.isCompleted ? "Completed" : "Incomplete"}
                        </span>
                      </div>
                      <span>Points: {t.points}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </main>
  );
};

export default DashboardSavedTasks;
