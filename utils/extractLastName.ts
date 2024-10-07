"use client";

import { useSession } from "next-auth/react";

export const extractLastName = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const lastName = name?.split(" ")[1];

  return lastName;
};
