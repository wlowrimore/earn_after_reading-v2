"use client";

import { useSession } from "next-auth/react";

export const extractInitials = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const firstNameInitial = name?.split(" ")[0]?.charAt(0);
  const lastNameInitial = name?.split(" ")[1]?.charAt(0);

  const initials = `${firstNameInitial}${lastNameInitial}`;

  if (!initials) {
    return "";
  }
  return initials;
};
