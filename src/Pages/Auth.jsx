import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Nav from "../Components/Nav";
import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/MindEase.png";

const API_BASE = "";

function Input({ label, id, type = "text", formik, name, placeholder }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-xs text-gray-500 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-0 bg-white"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-[12px] text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setApiError("");
      setLoading(true);
      try {
        const res = await axios.post(`${API_BASE}/api/auth/login`, values);
        const { data } = res;

        if (data?.token) {
          localStorage.setItem("auth_token", data.token);
          alert("Login successful");
        } else {
          alert("Logged in (no token)");
        }
      } catch (err) {
        setApiError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password"),
    }),
    onSubmit: async (values) => {
      setApiError("");
      setLoading(true);
      try {
        await axios.post(`${API_BASE}/api/auth/register`, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });

        alert("Account created. Please log in.");
        setMode("login");
      } catch (err) {
        setApiError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-[#F9FAFB]  min-h-screen flex items-center justify-center pt-10">
      <div className="w-full  bg-white shadow-sm overflow-hidden">
        <Nav />

        <div className="px-4 sm:px-8 md:px-12 py-10  mt-20 ">
          <div className="text-center">
            <div className="w-12 h-12  mx-auto mb-4 flex items-center justify-center text-white">
              <img
                src={Logo}
                alt="MindEase Logo"
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold">
              {mode === "login" ? "Welcome Back!" : "Create an account."}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {mode === "login"
                ? "Continue your wellness journey"
                : "Start your wellness journey today!"}
            </p>
          </div>

          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="bg-[#8499ac] rounded-full p-1 flex items-center border border-gray-200">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full py-2 text-sm transition-all ${
                  mode === "login"
                    ? "bg-white shadow text-gray-800"
                    : "text-white"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full py-2 text-sm transition-all ${
                  mode === "signup"
                    ? "bg-white shadow text-gray-800"
                    : "text-white"
                }`}
              >
                Sign up
              </button>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-md border border-gray-200 py-3 flex items-center justify-center gap-3 text-sm"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>

              <div className="flex items-center text-xs text-gray-400 gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                OR
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            </div>

            {apiError && (
              <div className="text-sm text-red-600 mb-3 text-center">
                {apiError}
              </div>
            )}

            {mode === "login" ? (
              <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  id="login-email"
                  name="email"
                  placeholder="you@email.com"
                  formik={loginFormik}
                />

                <Input
                  label="Password"
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="********"
                  formik={loginFormik}
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" /> Remember me
                  </label>
                  <button type="button" className="underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-[#1560B7] text-white text-sm shadow"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    type="button"
                    className="text-[#1560B7] underline"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={signupFormik.handleSubmit} className="space-y-4">
                <Input
                  label="First Name"
                  id="first"
                  name="firstName"
                  placeholder="First"
                  formik={signupFormik}
                />
                <Input
                  label="Last Name"
                  id="last"
                  name="lastName"
                  placeholder="Last"
                  formik={signupFormik}
                />
                <Input
                  label="Email Address"
                  id="signup-email"
                  name="email"
                  placeholder="you@email.com"
                  formik={signupFormik}
                />
                <Input
                  label="Password"
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="********"
                  formik={signupFormik}
                />
                <Input
                  label="Confirm Password"
                  id="signup-confirm"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  formik={signupFormik}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-[#1560B7] text-white text-sm shadow"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#1560B7] underline"
                  >
                    Log in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="bg-[#1560B7] text-white text-center py-6">
          <p className="max-w-xl mx-auto italic">
            “It's okay to take things one step at a time...”
          </p>
        </div>
      </div>
    </div>
  );
}
