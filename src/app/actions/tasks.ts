"use server";

import { db } from "../../../lib/db";
import { auth } from "../../../auth";

export async function getTasks(task: {
  userId: string;
  text: string;
  deadline: string;
  duedate?: string;
  taskFor: string;
  isCompleted?: boolean;
  createdAt?: Date;
}) {
  try {
    const session = await auth();
    console.log("SESSION:", session);

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const tasks = await db.task.findMany({
      where: {
        userId: session.user.id,
      },
    });

    console.log("Tasks retrieved:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
}

export async function saveTask(task: {
  text: string;
  deadline: string;
  duedate: string;
  taskFor: string;
  isCompleted?: boolean;
  isValid?: boolean;
}) {
  const session = await auth();
  const id = session?.user?.id;
  console.log("Session user ID:", id);
  console.log("Saving task:", task);

  if (!id) {
    throw new Error("User not authenticated");
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
        userId: id,
      },
    });

    console.log("Task saved successfully:", savedTask);
    return savedTask;
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
}

export async function updateTask(task: { id: string; isCompleted: boolean }) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    const updatedTask = await db.task.update({
      where: {
        id: task.id,
        userId: session.user.id, // Ensure the task belongs to the authenticated user
      },
      data: {
        isCompleted: task.isCompleted,
      },
    });

    console.log("Task updated successfully:", updatedTask);
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
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
  taskFor: string;
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

  console.log("Task removed successfully:", removedTask);
  return removedTask;
}
