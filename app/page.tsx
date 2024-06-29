"use client";

import { useEffect, useState } from "react";
import { setToken } from "@/redux/auth/auth.slice";
import useAuthSession from "../hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const dispatch = useAppDispatch();
  const { user, setLogin } = useAuthSession();
  const { toast } = useToast();
  const handleLogin = async () => {
    // Implement the logic to authenticate the user
    const user = await axios.post("/api/auth/login", { username, password });
    const token = user.data.token.split(" ")[1];
    localStorage.setItem("token", token);
    setLogin((login) => !login);
  };

  useEffect(() => {
    validateForm();
  }, [username, password]);

  const validateForm = () => {
    let error: { username: string | null; password: string | null } = {
      username: null,
      password: null,
    };

    if (!username) {
      error.username = "Username must be entered";
    }
    if (!password) {
      error.password = "Password must be entered";
    } else if (password.length < 6) {
      error.password = "Password must be of at least 6 length";
    }

    setErrors(error);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">
              Welcome, {user.username}
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-black">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors?.username ? (
              <p className="text-red-500">{errors.username}</p>
            ) : null}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors?.password ? (
              <p className="text-red-500">{errors.password}</p>
            ) : null}
            <button
              onClick={() => {
                if (username && password.length >= 6) {
                  handleLogin();
                  toast({
                    title: "Signed in",
                  });
                } else {
                  toast({
                    title: "Signed failed",
                  });
                }
              }}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">
            The hook should be usable like this:
          </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
