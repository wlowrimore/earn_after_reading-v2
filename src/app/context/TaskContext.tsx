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
  //   handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  calculatePoints: (task: Task) => number;
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

        const tasksWithPoints = sortedTasks.map((task: LoadedTaskProps) => ({
          ...task,
          points: task.points || 0,
        }));

        setLoadedTasks(tasksWithPoints);
        setUniqueTaskFors(
          Array.from(new Set(tasksWithPoints.map((t: Task) => t.taskFor)))
        );
        setDatesCreated(
          Array.from(new Set(tasksWithPoints.map((t: Task) => t.createdAt)))
        );
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
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

  //   useEffect(() => {
  //     const loadTasks = async () => {
  //       if (session?.user?.id) {
  //         try {
  //           const tasks = await getTasks({
  //             userId: session.user.id as string,
  //             text: "",
  //             deadline: "",
  //             duedate: "",
  //             taskFor: "",
  //             isCompleted: false,
  //             createdAt: new Date(),
  //           });

  //           const sortedTasks = tasks.sort(
  //             (a: any, b: any) =>
  //               new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  //           );

  //           const tasksWithPoints = sortedTasks.map((task: LoadedTaskProps) => ({
  //             ...task,
  //             points: task.points || 0,
  //           }));

  //           setLoadedTasks(tasksWithPoints);
  //         } catch (error) {
  //           console.error("Failed to load tasks:", error);
  //         }
  //       }
  //     };
  //     loadTasks();

  //     const timer = setInterval(() => {
  //       setCurrentTime(new Date());
  //     }, 60000);

  //     return () => clearInterval(timer);
  //   }, [session]);

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

      // Here you can update the points in the database
      // await updateTaskPoints({ id: taskId, points: calculatedPoints });
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
        duedate: new Date().toISOString().split("T")[0],
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
      const savedTask = await saveTask({
        text: taskToSave.text,
        deadline: taskToSave.deadline,
        duedate: taskToSave.duedate,
        taskFor: taskToSave.taskFor,
        isCompleted: taskToSave.isCompleted,
        isValid: taskToSave.isValid,
      });

      setTasks(
        tasks.map((task, index) => {
          if (index === taskIndex) {
            return {
              ...savedTask,
              isSaved: true,
              isValid: true,
            };
          }
          return task;
        })
      );
    } catch (error) {
      console.error("Failed to save task:", error);
    }
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
      });
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        loadedTasks,
        tasks,
        currentTime,
        titleTime,
        taskForValue,
        options,
        uniqueTaskFors,
        datesCreated,
        loadTasks,
        calculatePoints,
        handleCheckboxChange,
        getTaskStatus,
        getStatusColor,
        handleOptionChange,
        handleCustomTitleChange,
        handleCustomDeadlineChange,
        handleDeadlineChange,
        validateDeadline,
        handleDueDateChange,
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
