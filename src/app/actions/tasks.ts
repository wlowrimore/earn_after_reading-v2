"use server";

import { db } from "../../../lib/db";
import { auth } from "../../../auth";

export async function saveTask(task: {
  text: string;
  deadline: string;
  isCompleted?: boolean;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const savedTask = await db.task.create({
    data: {
      text: task.text,
      deadline: task.deadline,
      isCompleted: task.isCompleted ?? false,
      isSaved: true,
      userId: session.user.id,
    },
  });

  return savedTask;
}

export async function removeTask(task: {
  id: string;
  text: string;
  deadline: string;
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
