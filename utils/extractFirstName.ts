"use client";

import { useSession } from "next-auth/react";

export const extractFirstName = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const firstName = name?.split(" ")[0];

  return firstName;
};
