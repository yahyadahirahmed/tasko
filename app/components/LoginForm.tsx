"use client";
import React from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
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
        const updatedSession = await getSession();
        if (updatedSession?.user?.userType) {
          switch (updatedSession.user.userType) {
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
    <div className="flex items-center justify-center">
  <div className="pb-6 w-full max-w-md rounded-lg">
    <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="alert alert-error text-white">
          {error}
        </div>
      )}
      
      <div className="form-control w-full">
        <label className="label">
          <code><span className="label-text text-white font-bold text-lg">Username:</span></code>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
        <code><span className=" label-text text-white font-bold text-lg">Password:</span></code>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
          required
        />
      </div>

      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn mt-2 w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
