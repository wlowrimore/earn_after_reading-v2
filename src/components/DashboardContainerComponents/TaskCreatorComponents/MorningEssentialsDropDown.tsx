"use client";

import { useState } from "react";
import Select, { ActionMeta, components } from "react-select";
import { saveTask, removeTask } from "@/app/actions/tasks";

interface Option {
  value: string;
  label: string;
}

interface Task {
  isCompleted: boolean | undefined;
  id: string;
  text: string;
  deadline: string;
  isSaved: boolean;
  isValid: boolean;
}

const MorningEssentialsDropDown = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const options: Option[] = [
    { value: "Eat Breakfast", label: "Eat Breakfast" },
    { value: "Clean Breakfast", label: "Clean Breakfast" },
    { value: "Brush Teeth", label: "Brush Teeth" },
    { value: "Wash Face", label: "Wash Face" },
    { value: "Take Shower", label: "Take Shower" },
    { value: "Apply Deodorant", label: "Apply Deodorant" },
    { value: "Get Dressed", label: "Get Dressed" },
    { value: "Inventory Backpack", label: "Inventory Backpack" },
    { value: "Take Medication", label: "Take Medication" },
  ];

  const handleOptionChange = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    if (option) {
      const newTask: Task = {
        id: Math.random().toString(36).substring(7),
        text: option.value,
        deadline: "",
        isSaved: false,
        isValid: false,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeadlineChange = (taskId: string, newDeadline: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, deadline: newDeadline } : task
      )
    );
  };

  const validateDeadline = (deadline: string): boolean => {
    if (!deadline) return false;
    const [hours, minutes] = deadline.split(":").map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  };

  const handleSave = async (taskId: string) => {
    const taskToSave = tasks.find((task) => task.id === taskId);

    if (!taskToSave) return;

    const isValid = validateDeadline(taskToSave.deadline);

    if (!isValid) {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
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
        isCompleted: taskToSave.isCompleted,
      });

      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              id: savedTask.id,
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
      });
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  return (
    <main id="task-creator" className="p-6 w-full">
      <h1 className="text-xl mb-2">Morning Essentials</h1>
      <Select<Option>
        value={[]}
        options={options}
        onChange={handleOptionChange}
      />
      <div></div>
      <div className="flex flex-col gap-2 mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center px-6 bg-neutral-700 text-white p-2 rounded-md"
          >
            <p className="min-w-[10rem]">{task.text}</p>
            <div className="w-[3rem]">
              {task.isSaved && <p className="text-green-500">Saved</p>}
            </div>

            <div className="flex items-center gap-4">
              <input
                type="time"
                value={task.deadline}
                onChange={(e) => handleDeadlineChange(task.id, e.target.value)}
                placeholder="Deadline"
                className="w-[10.8rem] outline-none bg-purple-50 text-black rounded py-1 px-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleSave(task.id)}
                className="bg-[#902b61] border border-[#902b61] w-[6rem] text-white font-bold py-1 px-2 rounded-md hover:bg-[#6c2a4d] transition duration-300"
              >
                Save
              </button>
              <button
                onClick={(e) => handleRemove(task.id)}
                className="border border-[#cd468e] w-[6rem] text-white font-bold py-1 px-2 rounded-md hover:bg-[#b01e43] transition duration-300"
              >
                Remove
              </button>
            </div>
            {!task.isSaved && (
              <p className="text-red-500">
                Could not save task. Please try again
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default MorningEssentialsDropDown;
