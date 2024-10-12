"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { extractFirstName } from "../../../utils/extractFirstName";
import { getTasks } from "../../app/actions/tasks";

interface LoadedTaskProps {
  id: string;
  text: string;
  deadline: string;
  isCompleted?: boolean;
}

const DashboardSavedTasks = () => {
  const { data: session } = useSession();
  const firstName = extractFirstName();

  const [loadedTasks, setLoadedTasks] = useState<LoadedTaskProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await getTasks({
          userId: session?.user?.id as string,
          text: "",
          deadline: "",
        });

        setLoadedTasks(tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <main id="dashboard" className="max-w-[14rem] bg-purple-300 p-2">
      {loadedTasks.map((t) => (
        <div key={t.id}>
          <div className="flex justify-between">
            <p>{t.text}</p>
            <p>{t.deadline}</p>
            <p>{t.isCompleted}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default DashboardSavedTasks;
