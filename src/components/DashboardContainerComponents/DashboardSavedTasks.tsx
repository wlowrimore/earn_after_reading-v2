"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { extractFirstName } from "../../../utils/extractFirstName";
import { getTasks } from "../../app/actions/tasks";

interface LoadedTaskProps {
  id: string;
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isCompleted?: boolean;
}

const DashboardSavedTasks: React.FC = () => {
  const { data: session } = useSession();
  const firstName = extractFirstName();

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
          });

          setLoadedTasks(tasks);
        } catch (error) {
          console.error("Failed to load tasks:", error);
        }
      }
    };
    loadTasks();
  }, [session]);

  const uniqueTaskFors = Array.from(new Set(loadedTasks.map((t) => t.taskFor)));

  return (
    <main className="m-4 max-w-[40rem]">
      {uniqueTaskFors.map((taskFor) => (
        <div key={taskFor}>
          <div className="bg-neutral-700 border-b-4 border-indigo-300 text-white text-2xl py-1 px-4 rounded-t-xl">
            <h3>Saved Tasks for {taskFor}</h3>
          </div>
          <div className="bg-indigo-50 px-4 py-2 space-y-2 rounded-b-lg">
            {loadedTasks.map((t) => (
              <div key={t.id}>
                <div className="flex justify-between items-center border-b border-neutral-400 pb-2">
                  <p className="w-[13rem]">{t.text}</p>
                  <p>{t.deadline}</p>
                  <p>{t.duedate}</p>
                  <p>{t.isCompleted}</p>
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
