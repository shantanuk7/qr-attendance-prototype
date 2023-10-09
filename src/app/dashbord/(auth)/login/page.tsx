"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",

  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data) {
        if (response.data.user.isAdmin) { router.push("/admin"); }
        if (response.data.user.isTeacher) { router.push("/teacher"); }
        if (response.data.user.isStudent) { router.push("/student") }
        toast.success('Successfully Login!')
      } else {
        toast.error("User Name or Password is Wrong!!!")
        console.error("Response data is missing or in unexpected format.");
      }

    } catch (error: any) {
      console.log("Login Failed!! :(", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (

    <div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center ">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md md:w-90% xl:w-full">
          <h2 className="text-2xl font-semibold mb-4">
            {loading ? "Processing...." : "Login"}
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              onClick={onLogin}
            >
              Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <p>
              Don&apos;t have Account?{" "}
              <Link className="text-blue-500" href="/dashbord/signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
