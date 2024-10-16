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
  points?: number;
  completedAt: Date;
}

interface Task {
  id: string;
  points: number;
  deadline: string;
  isCompleted: boolean;
  completedAt?: Date;
}

enum TaskStatus {
  Normal = "normal",
  Warning = "warning",
  Late = "late",
}

const DashboardSavedTasks: React.FC = () => {
  const { data: session } = useSession();
  const [loadedTasks, setLoadedTasks] = useState<LoadedTaskProps[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [titleTime, setTitleTime] = useState<string>("");

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

          const sortedTasks = tasks.sort(
            (a: any, b: any) =>
              new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );

          const tasksWithPoints = sortedTasks.map((task: Task) => ({
            ...task,
            points: task.points || 0,
          }));

          setLoadedTasks(tasksWithPoints);
        } catch (error) {
          console.error("Failed to load tasks:", error);
        }
      }
    };
    loadTasks();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
  }, [session]);

  const calculatePoints = (task: LoadedTaskProps) => {
    if (task.isCompleted) {
      if (
        task.completedAt &&
        new Date(task.completedAt) > new Date(task.deadline)
      ) {
        return 0.5; // Completed late
      }
      return 1; // Completed on time
    }
    return -1; // Not completed
  };

  const getTaskStatus = (deadline: string): TaskStatus => {
    const deadlineTime = new Date(deadline).getTime();
    const currentTimeMs = currentTime.getTime();
    const warningThreshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (currentTimeMs > deadlineTime) {
      return TaskStatus.Late;
    } else if (deadlineTime - currentTimeMs < warningThreshold) {
      return TaskStatus.Warning;
    }
    return TaskStatus.Normal;
  };

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.Warning:
        return "bg-amber-200/50";
      case TaskStatus.Late:
        return "bg-red-200/50";
      default:
        return "";
    }
  };

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const { checked } = event.target;

    try {
      const completedAt = checked ? new Date() : undefined;
      await updateTask({
        id: taskId,
        isCompleted: checked,
        completedAt,
      } as Task);

      setLoadedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                isCompleted: checked,
                completedAt: completedAt ?? new Date(),
                points: calculatePoints({
                  ...task,
                  isCompleted: checked,
                  completedAt: completedAt ?? new Date(),
                }),
              }
            : task
        )
      );

      // Here I'll update the points in the database
      // await updateTaskPoints({ id: taskId, points: calculatedPoints });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const uniqueTaskFors = Array.from(new Set(loadedTasks.map((t) => t.taskFor)));
  const datesCreated = Array.from(new Set(loadedTasks.map((t) => t.createdAt)));

  useEffect(() => {
    const getTitleTime = () => {
      const timeOfDay = loadedTasks.map((lt) => {
        if (lt.deadline <= "12:00" && lt.deadline.includes("am")) {
          setTitleTime("Evening");
        } else if (
          lt.deadline >= "12:00" &&
          lt.deadline.includes("pm") &&
          lt.deadline <= "4:00" &&
          lt.deadline.includes("pm")
        ) {
          setTitleTime("Afternoon");
        }
        setTitleTime("Morning");
      });
    };
    getTitleTime();
  }, [loadedTasks]);

  return (
    <main className="m-6">
      {uniqueTaskFors.map((taskFor) => (
        <div key={taskFor}>
          <div className="flex justify-between items-end bg-neutral-700 border-b-4 border-blue-200 text-white text-2xl py-1 px-4 rounded-t-lg shadow-lg shadow-neutral-700">
            <h3 className="text-base">Saved Tasks for {taskFor}</h3>
            <p className="text-base">{titleTime} Tasks</p>
            <p className="text-base">
              Created on {datesCreated?.[0]?.toLocaleDateString()}
            </p>
          </div>
          <div className="bg-indigo-50 px-4 py-2 space-y-4 rounded-b-lg shadow-md shadow-neutral-600">
            {loadedTasks.map((t) => {
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
                        onChange={(event) => handleCheckboxChange(event, t.id)}
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
