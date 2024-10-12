"use server";

import { db } from "../../../lib/db";
import { auth } from "../../../auth";

export async function getTasks(task: {
  userId: string;
  text: string;
  deadline: string;
  duedate?: string;
  isCompleted?: boolean;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const tasks = await db.task.findMany({
    where: {
      userId: session.user.id,
    },
  });
  console.log("Loaded tasks:", tasks);
  return tasks;
}

export async function saveTask(task: {
  text: string;
  deadline: string;
  duedate: string;
  isCompleted?: boolean;
  isValid?: boolean;
}) {
  const session = await auth();

  console.log("Session:", session);
  console.log("Saving task:", task);

  if (!session?.user?.id) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  try {
    const savedTask = await db.task.create({
      data: {
        text: task.text,
        deadline: task.deadline,
        duedate: task.duedate,
        isCompleted: task.isCompleted ?? false,
        isSaved: true,
        userId: session.user.id,
      },
    });

    console.log("Task saved successfully:", savedTask);
    return savedTask;
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
}

export async function removeTask(task: {
  id: string;
  text: string;
  deadline: string;
  isSaved?: boolean;
  isValid?: boolean;
  duedate?: string;
  isCompleted?: boolean;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const removedTask = await db.task.delete({
    where: {
      id: task.id,
    },
  });

  return removedTask;
}
