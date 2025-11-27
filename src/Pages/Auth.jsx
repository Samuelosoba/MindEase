import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Nav from "../Components/Nav";
import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/MindEase.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "https://mind-ease-backend-f68j.onrender.com/api/v1";

// -------------------------
// INPUT COMPONENT WITH EYE
// -------------------------
function Input({
  label,
  id,
  type = "text",
  formik,
  name,
  placeholder,
  isPassword,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-xs text-gray-500 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none bg-white"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-[12px] text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
}

// -------------------------
// FORGOT PASSWORD MODAL
// -------------------------
function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMsg("");

    try {
      await axios.put(`${API_BASE}/user/reset-password`, {
        email,
        redirectURL: window.location.origin,
      });

      setMsg("Reset link sent! Check your email.");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your email to receive a reset link.
        </p>

        <input
          type="email"
          placeholder="you@email.com"
          className="w-full px-4 py-3 border rounded-md mb-3 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {msg && <p className="text-sm text-center text-blue-600 mb-3">{msg}</p>}

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className="flex-1 py-3 bg-[#1560B7] text-white rounded-md text-sm"
          >
            {loading ? "Sending..." : "Send Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// MAIN AUTH PAGE
// -------------------------
export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [forgotOpen, setForgotOpen] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // -------------------------
  // LOGIN FORM
  // -------------------------
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
        const res = await axios.post(`${API_BASE}/auth/login`, values);
        const { token, userDTO } = res.data;

        login(token, userDTO);
        navigate("/selection");
      } catch (err) {
        setApiError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // -------------------------
  // SIGNUP FORM
  // -------------------------
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
        await axios.post(`${API_BASE}/auth/register-user`, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });

        alert("Account created successfully. Login now.");
        setMode("login");
      } catch (err) {
        setApiError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center pt-10">
      <div className="w-full bg-white shadow-sm overflow-hidden">
        <Nav />

        {/* BODY */}
        <div className="px-4 sm:px-8 md:px-12 py-10 mt-10">
          <div className="text-center">
            <img
              src={Logo}
              alt="MindEase Logo"
              className="w-14 h-14 mx-auto mb-3"
            />
            <h2 className="text-xl sm:text-2xl font-bold">
              {mode === "login" ? "Welcome Back!" : "Create an account."}
            </h2>
            <p className="text-sm text-gray-500">
              {mode === "login"
                ? "Continue your wellness journey"
                : "Start your wellness journey today!"}
            </p>
          </div>

          {/* SWITCH BUTTON */}
          <div className="mt-8 w-full max-w-md mx-auto">
            <div className="bg-[#8499ac] rounded-full p-1 flex items-center border border-gray-200">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full py-2 text-sm ${
                  mode === "login"
                    ? "bg-white shadow text-gray-800"
                    : "text-white"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full py-2 text-sm ${
                  mode === "signup"
                    ? "bg-white shadow text-gray-800"
                    : "text-white"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Google Btn */}
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

            {/* FORMS */}
            {mode === "login" ? (
              // -------------------------
              // LOGIN FORM
              // -------------------------
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
                  isPassword={true}
                  placeholder="********"
                  formik={loginFormik}
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" /> Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="underline"
                  >
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
              // -------------------------
              // SIGNUP FORM
              // -------------------------
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
                  isPassword={true}
                  placeholder="********"
                  formik={signupFormik}
                />

                <Input
                  label="Confirm Password"
                  id="signup-confirm"
                  name="confirmPassword"
                  isPassword={true}
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

        {/* FOOTER */}
        <div className="bg-[#1560B7] text-white text-center py-6">
          <p className="max-w-xl mx-auto italic">
            “It's okay to take things one step at a time...”
          </p>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
}
