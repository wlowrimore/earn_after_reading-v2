"use server";

import { db } from "../../../lib/db";
import { auth } from "../../../auth";

export async function getTasks(task: {
  userId: string;
  text: string;
  deadline: string;
  duedate?: string;
  taskFor?: string;
  isCompleted?: boolean;
}) {
  try {
    const session = await auth();
    console.log("SESSION:", session);
  } catch (error) {
    console.error("Error authenticating:", error);
  }

  //   if (!session?.user?.id) {
  //     throw new Error("User not authenticated");
  //   }

  //   const tasks = await db.task.findMany({
  //     where: {
  //       userId: session.user.id,
  //     },
  //   });
  //   console.log("Loaded tasks:", tasks);
  //   return tasks;
}

export async function saveTask(task: {
  text: string;
  deadline: string;
  duedate: string;
  taskFor?: string;
  isCompleted?: boolean;
  isValid?: boolean;
}) {
  const session = await auth();
  const id = session?.user?.id;
  console.log("id", id);

  console.log("Session user ID:", session?.user?.id);
  console.log("Saving task:", task);

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) {
    console.error("User not found in database");
    throw new Error("User not found in database");
  }

  try {
    const savedTask = await db.task.create({
      data: {
        text: task.text,
        deadline: task.deadline,
        duedate: task.duedate,
        taskFor: task.taskFor,
        isCompleted: task.isCompleted ?? false,
        isSaved: true,
        userId: user.id,
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
  taskFor?: string;
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
