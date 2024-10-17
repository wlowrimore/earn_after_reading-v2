"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import {
  getTasks,
  updateTask,
  saveTask,
  removeTask,
} from "@/app/actions/tasks";
import { ActionMeta } from "react-select";

interface LoadedTaskProps {
  id: string;
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isCompleted?: boolean;
  createdAt?: Date;
  points?: number;
  completedAt?: Date;
}

interface Task {
  id: string;
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isCompleted: boolean;
  isSaved: boolean;
  isValid: boolean;
  completedAt?: Date;
  createdAt?: Date;
  points?: number;
}

interface Option {
  value: string;
  label: string;
}

enum TaskStatus {
  Normal = "normal",
  Warning = "warning",
  Late = "late",
}

interface TaskContextProps {
  loadTasks: () => Promise<void>;
  loadedTasks: LoadedTaskProps[];
  tasks: Task[];
  currentTime: Date;
  titleTime: string;
  taskForValue: string;
  options: Option[];
  uniqueTaskFors: string[];
  datesCreated: string[];
  formatDateForDatabase: (date: Date | string) => Date;
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => Promise<void>;
  getTaskStatus: (deadline: string) => TaskStatus;
  getStatusColor: (status: TaskStatus) => string;
  handleOptionChange: (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => void;
  handleCustomTitleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    newTitle: string
  ) => void;
  handleCustomDeadlineChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    newDeadline: string
  ) => void;
  handleDeadlineChange: (taskId: string, newDeadline: string) => void;
  validateDeadline: (deadline: string) => boolean;
  handleDueDateChange: (taskId: string, newDueDate: string) => void;
  calculatePoints: (task: LoadedTaskProps) => number;
  handleTaskForChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (taskIndex: number) => Promise<void>;
  handleRemove: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [loadedTasks, setLoadedTasks] = useState<LoadedTaskProps[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [titleTime, setTitleTime] = useState<string>("");
  const [taskForValue, setTaskForValue] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [uniqueTaskFors, setUniqueTaskFors] = useState<string[]>([]);
  const [datesCreated, setDatesCreated] = useState<string[]>([]);

  const formatDateForDatabase = (date: Date | string | undefined): Date => {
    if (!date) return new Date();

    try {
      if (date instanceof Date) {
        return date;
      }

      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        console.warn(`Invalid date input: ${date}, returning current date`);
        return new Date();
      }

      return new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate()
      );
    } catch (error) {
      console.warn(`Error formatting date: ${date}, returning current date`);
      return new Date();
    }
  };

  const ensureValidDate = (date: Date | string | undefined): Date => {
    if (!date) return new Date();

    try {
      const parsedDate = typeof date === "string" ? new Date(date) : date;
      return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    } catch {
      return new Date();
    }
  };

  const loadTasks = async () => {
    if (session?.user?.id) {
      try {
        const currentDate = new Date();

        const tasks = await getTasks({
          userId: session.user.id as string,
          text: "",
          deadline: "",
          duedate: currentDate.toISOString(),
          taskFor: "",
          isCompleted: false,
          createdAt: currentDate.toISOString(),
        });

        const sortedTasks = tasks.sort(
          (a: LoadedTaskProps, b: LoadedTaskProps) => {
            const dateA = ensureValidDate(a.deadline).getTime();
            const dateB = ensureValidDate(b.deadline).getTime();
            return dateA - dateB;
          }
        );

        const tasksWithPoints = sortedTasks.map((task: LoadedTaskProps) => {
          const createdAt = ensureValidDate(task.createdAt);
          const dueDate = ensureValidDate(task.duedate);
          const completedAt = task.completedAt
            ? ensureValidDate(task.completedAt)
            : undefined;

          return {
            ...task,
            points: task.points || 0,
            createdAt,
            duedate: dueDate.toISOString(),
            completedAt,
          } as LoadedTaskProps;
        });

        setLoadedTasks(tasksWithPoints);

        // Update uniqueTaskFors
        const uniqueTasks = Array.from(
          new Set(tasksWithPoints.map((t) => t.taskFor))
        );
        setUniqueTaskFors(uniqueTasks);

        // Update datesCreated
        const uniqueDates = Array.from(
          new Set(
            tasksWithPoints
              .map((t) => {
                try {
                  const date = ensureValidDate(t.createdAt);
                  return date.toISOString();
                } catch {
                  return null;
                }
              })
              .filter(Boolean)
          )
        );
        setDatesCreated(uniqueDates as string[]);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }
  };

  const handleSave = async (taskIndex: number) => {
    const taskToSave = tasks[taskIndex];
    if (!taskToSave) return;

    const isValid = validateDeadline(taskToSave.deadline);

    if (!isValid || !taskToSave.deadline) {
      setTasks(
        tasks.map((task, index) => {
          if (index === taskIndex) {
            return {
              ...task,
              isValid: false,
              isSaved: false,
            };
          }
          return task;
        })
      );
      return;
    }

    try {
      const now = new Date();
      const dueDate = ensureValidDate(taskToSave.duedate);

      const savedTask = await saveTask({
        text: taskToSave.text,
        deadline: taskToSave.deadline,
        duedate: dueDate.toISOString(),
        taskFor: taskToSave.taskFor,
        isCompleted: taskToSave.isCompleted,
        isValid: taskToSave.isValid,
        createdAt: now.toISOString(),
      });

      setTasks(
        tasks.map((task, index) => {
          if (index === taskIndex) {
            return {
              ...savedTask,
              duedate: dueDate.toISOString(),
              createdAt: now,
              isSaved: true,
              isValid: true,
            };
          }
          return task;
        })
      );

      setLoadedTasks((prevLoadedTasks) => {
        const newTask = {
          ...savedTask,
          duedate: dueDate.toISOString(),
          createdAt: now,
          points: 0,
        };
        return [...prevLoadedTasks, newTask].sort((a, b) => {
          const dateA = ensureValidDate(a.deadline).getTime();
          const dateB = ensureValidDate(b.deadline).getTime();
          return dateA - dateB;
        });
      });

      setUniqueTaskFors((prev) =>
        Array.from(new Set([...prev, taskToSave.taskFor]))
      );
      setDatesCreated((prev) =>
        Array.from(new Set([...prev, now.toISOString()]))
      );
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const calculatePoints = (task: LoadedTaskProps) => {
    if (task.isCompleted) {
      if (
        task.completedAt &&
        ensureValidDate(task.completedAt) > ensureValidDate(task.deadline)
      ) {
        return 0.5; // Completed late
      }
      return 1; // Completed on time
    }
    return -1; // Not completed
  };

  const getTaskStatus = (deadline: string): TaskStatus => {
    const deadlineTime = ensureValidDate(deadline).getTime();
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

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                isCompleted: checked,
              }
            : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleOptionChange = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (option) {
      const newTask: Task = {
        id: "",
        text: option.value,
        deadline: "",
        duedate: "",
        taskFor: taskForValue,
        isSaved: false,
        isValid: false,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleCustomTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    newTitle: string
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newTitle } : task
      )
    );
  };

  const handleCustomDeadlineChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    newDeadline: string
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, deadline: newDeadline } : task
      )
    );
  };

  const handleDeadlineChange = (taskId: string, newDeadline: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, deadline: newDeadline } : task
      )
    );
  };

  const handleDueDateChange = (taskId: string, newDueDate: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, duedate: newDueDate } : task
      )
    );
  };

  const handleTaskForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTaskFor = e.target.value;
    setTaskForValue(newTaskFor);

    if (tasks.length > 0) {
      setTasks(tasks.map((task) => ({ ...task, taskFor: newTaskFor })));
    }
  };

  const validateDeadline = (deadline: string): boolean => {
    if (!deadline) return false;
    const cleanDeadline = deadline.trim().toUpperCase();
    const [time, ampm] = cleanDeadline.split(" ");
    if (!time || !ampm) return false;
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return false;
    return (
      hours >= 1 &&
      hours <= 12 &&
      minutes >= 0 &&
      minutes < 60 &&
      (ampm === "AM" || ampm === "PM")
    );
  };

  const handleRemove = async (taskId: string) => {
    const taskToRemove = tasks.find((task) => task.id === taskId);
    if (!taskToRemove) return;

    setTasks(tasks.filter((task) => task.id !== taskId));

    try {
      await removeTask({
        id: taskToRemove.id,
        text: taskToRemove.text,
        deadline: taskToRemove.deadline,
        duedate: taskToRemove.duedate,
        taskFor: taskToRemove.taskFor,
        createdAt:
          taskToRemove.createdAt !== undefined
            ? taskToRemove.createdAt.toISOString()
            : "",
      });
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  useEffect(() => {
    loadTasks();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [session]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await fetch("/js/task-options.js");
        const data = await res.json();
        setOptions(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const getTitleTime = () => {
      const timeOfDay = loadedTasks.map((lt) => {
        if (lt.deadline <= "12:00" && lt.deadline.includes("am")) {
          return "Evening";
        } else if (
          lt.deadline >= "12:00" &&
          lt.deadline.includes("pm") &&
          lt.deadline <= "4:00" &&
          lt.deadline.includes("pm")
        ) {
          return "Afternoon";
        }
        return "Morning";
      });
      setTitleTime(timeOfDay[0] || "");
    };
    getTitleTime();
  }, [loadedTasks]);

  return (
    <TaskContext.Provider
      value={{
        loadTasks,
        loadedTasks,
        tasks,
        currentTime,
        titleTime,
        taskForValue,
        options,
        uniqueTaskFors,
        datesCreated,
        formatDateForDatabase,
        handleCheckboxChange,
        getTaskStatus,
        getStatusColor,
        handleOptionChange,
        handleCustomTitleChange,
        handleCustomDeadlineChange,
        handleDeadlineChange,
        validateDeadline,
        handleDueDateChange,
        calculatePoints,
        handleTaskForChange,
        handleSave,
        handleRemove,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
