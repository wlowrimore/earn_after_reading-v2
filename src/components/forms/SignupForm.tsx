"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  reEnteredPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    reEnteredPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.reEnteredPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    console.log(formData);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to sign up");
      }

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white rounded-t-md border-b border-neutral-600 outline-none p-2"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-white rounded-t-md border-b border-neutral-600 outline-none p-2"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="reEnteredPassword">Re-Enter Password</label>
        <input
          type="password"
          id="reEnteredPassword"
          name="reEnteredPassword"
          value={formData.reEnteredPassword}
          onChange={handleChange}
          className="w-full bg-white rounded-t-md border-b border-neutral-600 outline-none p-2"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-700 text-white py-3 px-6 rounded-md hover:bg-neutral-950 transition duration-300 text-xl disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}
