"use client";

import { useState } from "react";
import Select, { ActionMeta } from "react-select";
import { saveTask, removeTask } from "../../app/actions/tasks";

interface Option {
  value: string;
  label: string;
}

interface Task {
  isCompleted: boolean | undefined;
  id: string;
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isSaved: boolean;
  isValid: boolean;
}

const MorningEssentialsDropDown: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskForValue, setTaskForValue] = useState<string>("");

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
    console.log("Validating deadline:", deadline);

    if (!deadline) {
      console.log("Validation failed: Deadline is empty");
      return false;
    }

    // Trimming and converting to uppercase
    const cleanDeadline = deadline.trim().toUpperCase();
    console.log("Cleaned deadline:", cleanDeadline);

    const [time, ampm] = cleanDeadline.split(" ");
    console.log("Time:", time, "AMPM:", ampm);

    if (!time || !ampm) {
      console.log("Validation failed: Invalid time format");
      return false;
    }

    const [hours, minutes] = time.split(":").map(Number);
    console.log("Hours:", hours, "Minutes:", minutes);

    if (isNaN(hours) || isNaN(minutes)) {
      console.log("Validation failed: Hours or minutes are not numbers");
      return false;
    }

    const isValid =
      hours >= 1 &&
      hours <= 12 &&
      minutes >= 0 &&
      minutes < 60 &&
      (ampm === "AM" || ampm === "PM");

    console.log("Validation result:", isValid);
    return isValid;
  };

  const handleSave = async (taskIndex: number) => {
    const taskToSave = tasks[taskIndex];
    console.log("Attempting to save task:", taskToSave);

    if (!taskToSave) {
      console.log("No task found at index:", taskIndex);
      return;
    }

    console.log("TaskDeadlinebefore validation:", taskToSave.deadline);
    const isValid = validateDeadline(taskToSave.deadline);
    console.log("Validation result:", isValid);

    if (!isValid || !taskToSave.deadline) {
      console.log("Task validation failed!");
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

      console.log("Task saved successfully:", savedTask);

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
    <main id="task-creator" className="p-6 w-full">
      <section className="w-[40%] flex justify-evenly px-3 py-5 bg-neutral-700 rounded-lg mb-8">
        <div>
          <h1 className="text-white">Who&apos;s This Task For?</h1>
          <input
            type="text"
            name="task-for"
            value={taskForValue}
            onChange={handleTaskForChange}
            className="w-4/5 bg-indigo-100 py-[0.077rem] px-2 rounded outline-none"
          />
        </div>
        <div>
          <h1 className="text-white">Select Due Date</h1>
          <input
            type="date"
            name="due-date"
            value={tasks[0]?.duedate || ""}
            onChange={(e) =>
              tasks[0] && handleDueDateChange(tasks[0].id, e.target.value)
            }
            className="w-full bg-indigo-100 px-2 rounded outline-none"
          />
        </div>
      </section>

      <h2 className="text-xl mb-2">Morning Essentials</h2>
      <Select<Option>
        instanceId="react-select-1728712826578-live-region"
        value={tasks[0] ? { value: tasks[0].text, label: tasks[0].text } : null}
        options={options}
        onChange={handleOptionChange}
        placeholder="Select a task..."
        styles={{
          control: (base) => ({
            ...base,
            cursor: "pointer",
          }),
        }}
      />

      <div className="flex flex-col gap-2 mt-6">
        {tasks.map((task, index) => (
          <div
            key={task.id || index}
            className="flex justify-between items-center px-6 bg-neutral-700 text-white p-2 rounded-md"
          >
            <p className="min-w-[10rem]">{task.text}</p>
            <div className="w-[3rem]">
              {task.isSaved && <p className="text-green-500">Saved</p>}
            </div>

            <div className="flex flex-col items-end w-1/2">
              <div className="flex text-black">
                <input
                  type="text"
                  value={task.deadline.split(" ")[0]}
                  onChange={(e) =>
                    handleDeadlineChange(task.id, e.target.value)
                  }
                  placeholder="Deadline"
                  className="w-[28%] text-lg px-2 bg-indigo-100 text-center rounded-l outline-none placeholder:text-red-800 placeholder:text-sm placeholder:tracking-wider placeholder:italic"
                />
                <div className="flex items-center bg-indigo-100 px-2 rounded-r">
                  <input
                    type="radio"
                    name={`ampm-${task.id}`}
                    value="am"
                    checked={task.deadline.toLowerCase().endsWith("am")}
                    onChange={() => {
                      const [time] = task.deadline.split(" ");
                      handleDeadlineChange(task.id, `${time} am`);
                    }}
                    className="w-1/2 bg-indigo-100 px-2 rounded outline-none"
                  />
                  <span className="text-sm ml-1 mr-2">am</span>

                  <input
                    type="radio"
                    name="ampm"
                    value={`ampm-${task.id}`}
                    checked={task.deadline.toLowerCase().endsWith("pm")}
                    onChange={() => {
                      const [time] = task.deadline.split(" ");
                      handleDeadlineChange(task.id, `${time} pm`);
                    }}
                    className="w-1/2 bg-indigo-100 px-2 py-[0.049rem] rounded outline-none"
                  />
                  <span className="text-sm ml-1">pm</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(index)}
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
            {/* {!task.isValid && (
              <p className="text-red-500">
                Could not save task. Please try again
              </p>
            )} */}
          </div>
        ))}
      </div>
    </main>
  );
};

export default MorningEssentialsDropDown;
