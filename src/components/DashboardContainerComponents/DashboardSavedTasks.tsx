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
    <main className="m-4 max-w-[30rem]">
      {uniqueTaskFors.map((taskFor) => (
        <div key={taskFor}>
          <div className="bg-neutral-700 text-white text-2xl py-1 px-4">
            <h3>Saved Tasks for {taskFor}</h3>
          </div>
          <div className="bg-purple-300 px-4 py-1">
            {loadedTasks.map((t) => (
              <div key={t.id}>
                <div className="flex justify-between">
                  <p>{t.text}</p>
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
