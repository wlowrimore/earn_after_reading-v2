"use client";

import { useSession } from "next-auth/react";

export default function SessionCheck() {
  const { data: session, status } = useSession();

  console.log("Session status:", status);
  console.log("Session data:", session);

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  return (
    <div>
      <h2>Session status: {status}</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
