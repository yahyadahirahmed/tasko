"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(`Authentication error: ${res.error}`);
      } else if (res?.ok) {
        // Use the session from useSession hook instead of getSession
        if (session?.user?.userType) {
          switch (session.user.userType) {
            case "ADMIN":
              router.push("/admin");
              break;
            case "TEAM_MANAGER":
              router.push("/manager");
              break;
            case "TEAM_MEMBER":
              router.push("/member");
              break;
            default:
              router.push("/");
          }
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white">
          Login Here
        </h2>

        <div className="shadow-lg rounded-lg p-8 w-full max-w-md border-gray-200 relative z-10">

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold mb-2">
                <code>Username:</code>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                required
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                <code>Password:</code>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                required
              />
            </div>

            {/* Button */}
            <div>
              <button
                type="submit"
                className="w-1/2 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-8 focus:outline-none focus:ring-2 focus:ring-blue-400 block"
              >
                <code>Submit</code>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
