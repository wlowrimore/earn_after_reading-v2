"use client";

import { useState } from "react";
import Select, { ActionMeta, components } from "react-select";

interface Option {
  value: string;
  label: string;
}

const MorningEssentialsDropDown = () => {
  const [morningEssentialTask, setMorningEssentialTask] = useState<string[]>(
    []
  );
  const [deadline, setDeadline] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

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
      setMorningEssentialTask([...morningEssentialTask, option.value]);
    }
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDeadline(value);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  return (
    <main id="task-creator" className="p-6 w-full">
      <h1 className="text-xl mb-2">Morning Essentials</h1>
      <Select<Option>
        value={[]}
        options={options}
        onChange={handleOptionChange}
      />
      <div className="flex flex-col gap-2 mt-6">
        {morningEssentialTask.map((task) => (
          <div
            key={task}
            className="flex justify-between items-center px-6 bg-neutral-700 text-white p-2 rounded-md"
          >
            <p className="max-w-[5rem] truncate">{task}</p>
            {isSaved && <p className="text-green-500">Saved</p>}
            <div className="flex items-center gap-4">
              <input
                type="time"
                defaultValue={deadline}
                onChange={handleDeadlineChange}
                placeholder="Deadline"
                className="w-[10.8rem] outline-none bg-purple-50 text-black rounded py-1 px-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="bg-[#902b61] border border-[#902b61] w-[6rem] text-white font-bold py-1 px-2 rounded-md hover:bg-[#6c2a4d] transition duration-300"
              >
                Save
              </button>
              <button className="border border-[#cd468e] w-[6rem] text-white font-bold py-1 px-2 rounded-md hover:bg-[#b01e43] transition duration-300">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MorningEssentialsDropDown;
