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
          duedate: "",
          isCompleted: false,
        });

        // setLoadedTasks(tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <main className="m-4 max-w-[30rem]">
      <div className="bg-neutral-700 text-white text-2xl py-1 px-4">
        Saved Tasks for Joey
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
    </main>
  );
};

export default DashboardSavedTasks;
