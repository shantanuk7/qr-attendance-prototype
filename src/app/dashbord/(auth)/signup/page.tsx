"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
      email: "",
      password: "",
      username: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup success", response.data);
          router.push("/dashbord/login");
          
      } catch (error:any) {
          console.log("Signup failed", error.message);
          
          toast.error(error.message);
      }finally {
          setLoading(false);
      }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
          setButtonDisabled(false);
      } else {
          setButtonDisabled(true);
      }
  }, [user]);
  return (
    <section>
    <div>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center ">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md md:w-90% xl:w-full">
          <h2 className="text-2xl font-semibold mb-4">Signup</h2>
          
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
                required
              />
            </div>
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
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Your Email"
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
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Your Password"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                onClick={onSignup}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                {buttonDisabled ? "Something Is Missing" : "Signup"}
              </button>
            </div>
         
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link className="text-blue-500" href="/dashbord/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Signup;
