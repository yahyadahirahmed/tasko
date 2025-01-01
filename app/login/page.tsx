"use client";
import React from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserType } from "@prisma/client";
import Admin from "../admin/page";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  
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

      console.log("SignIn response:", res); // Debug log

      if (res?.error) {
        setError(`Authentication error: ${res.error}`);
      } else if (res?.ok) {
        // Get the user data after successful login
        const session = await getSession();
        
        switch(session?.user?.userType) {
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
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] flex items-center justify-center overflow-hidden">
      {/* Background Blur Shapes */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-white opacity-10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-white opacity-10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-medium text-center text-white mb-6">
          Login Here
        </h2>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200 relative z-10">

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-bold text-gray-900 mb-2">
              <code>Username:</code>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
              <code>Password:</code>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="w-1/2 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 block"
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
