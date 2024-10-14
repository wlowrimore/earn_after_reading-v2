"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getTasks, updateTask } from "../../app/actions/tasks";

interface LoadedTaskProps {
  id: string;
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isCompleted?: boolean;
  createdAt?: Date;
}

const DashboardSavedTasks: React.FC = () => {
  const { data: session } = useSession();

  const [loadedTasks, setLoadedTasks] = useState<LoadedTaskProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      if (session?.user?.id) {
        try {
          const tasks = await getTasks({
            userId: session.user.id as string,
            text: "",
            deadline: "",
            duedate: "",
            taskFor: "",
            isCompleted: false,
            createdAt: new Date(),
          });

          setLoadedTasks(tasks);
        } catch (error) {
          console.error("Failed to load tasks:", error);
        }
      }
    };
    loadTasks();
  }, [session]);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const { checked } = event.target;

    try {
      await updateTask({ id: taskId, isCompleted: checked });

      setLoadedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: checked } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const uniqueTaskFors = Array.from(new Set(loadedTasks.map((t) => t.taskFor)));
  const datesCreated = Array.from(new Set(loadedTasks.map((t) => t.createdAt)));

  return (
    <main className="m-6 max-w-[40rem]">
      {uniqueTaskFors.map((taskFor) => (
        <div key={taskFor}>
          <div className="flex justify-between items-end bg-neutral-700 border-b-4 border-blue-200 text-white text-2xl py-1 px-4 rounded-t-lg shadow-lg shadow-neutral-700">
            <h3>Saved Tasks for {taskFor}</h3>
            <p className="text-base">
              Created on {datesCreated?.[0]?.toLocaleDateString()}
            </p>
          </div>
          <div className="bg-indigo-50 px-4 py-2 space-y-4 rounded-b-lg shadow-md shadow-neutral-600">
            {loadedTasks.map((t) => (
              <div key={t.id}>
                <div className="flex justify-between items-center border-b border-neutral-400">
                  <p className="w-[13rem]">{t.text}</p>
                  <p className="w-[6rem]">{t.deadline}</p>
                  <p>{t.duedate}</p>
                  <input
                    type="checkbox"
                    id={t.id}
                    checked={t.isCompleted}
                    onChange={(event) => handleCheckboxChange(event, t.id)}
                    className="w-4 h-4"
                  />
                  <span
                    className={`ml-[-1.5rem] text-[0.85rem] ${
                      t.isCompleted
                        ? "bg-neutral-600 font-semibold text-green-300 px-2 rounded-full"
                        : "bg-transparent font-semibold text-red-500 px-2 rounded-full"
                    }`}
                  >
                    {t.isCompleted ? "Completed" : "Incomplete"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default DashboardSavedTasks;
