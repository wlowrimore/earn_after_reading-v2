"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SiteLogo from "../../../public/logos/siteLogo.webp";

interface FormData {
  name: string;
  email: string;
  password: string;
  reEnteredPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
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
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupData.error || "Failed to sign up");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const signInResult = await signIn("credentials", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log("SignIn result:", signInResult);

      if (signInResult?.error) {
        setError(signInResult.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-4">
      <div className="mt-6">
        <label htmlFor="name">Full Name</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-indigo-200/40 rounded-md outline-none p-2 shadow-md shadow-neutral-300"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-indigo-200/40 rounded-md outline-none p-2 shadow-md shadow-neutral-300"
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
          className="w-full bg-indigo-200/40 rounded-md outline-none p-2 shadow-md shadow-neutral-300"
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
          className="w-full bg-indigo-200/40 rounded-md outline-none p-2 shadow-md shadow-neutral-300"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-12 flex items-center justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2.5 bg-neutral-800 text-white py-2 px-6 rounded-full shadow-md shadow-neutral-700 hover:bg-neutral-950 transition duration-300 text-lg disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
        >
          {loading ? "Signing up..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
