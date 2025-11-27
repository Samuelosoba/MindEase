import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthProvider";

export default function Settings() {
  const { user, logout } = useAuth(); // ⬅ get user & logout from auth

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "", // ⬅ email not editable
    schoolName: user?.schoolName || "",
    educationalLevel: user?.educationalLevel || "",
    gender: user?.gender || "",
    date_of_birth: user?.date_of_birth || "",
    role: user?.role || "", // displayed but not editable
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      await axios.put(
        "https://your-api.com/api/v1/auth/update-profile",
        profileData
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      setLoading(true);
      await axios.put(
        "https://your-api.com/api/v1/auth/reset-password",
        passwordData
      );
      setMessage("Password updated successfully!");
    } catch (err) {
      setMessage("Password update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>

      {message && (
        <p className="mb-4 text-center text-blue-600 font-medium">{message}</p>
      )}

      {/* ================= PROFILE UPDATE ================= */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profileData.firstName}
            onChange={handleProfileChange}
          />

          <input
            className="border p-3 rounded"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profileData.lastName}
            onChange={handleProfileChange}
          />

          {/* EMAIL – not editable */}
          <input
            className="border p-3 rounded bg-gray-200 cursor-not-allowed"
            type="email"
            name="email"
            placeholder="Email"
            value={profileData.email}
            readOnly
          />

          <input
            className="border p-3 rounded"
            type="text"
            name="schoolName"
            placeholder="School Name"
            value={profileData.schoolName}
            onChange={handleProfileChange}
          />

          <input
            className="border p-3 rounded"
            type="text"
            name="educationalLevel"
            placeholder="Educational Level"
            value={profileData.educationalLevel}
            onChange={handleProfileChange}
          />

          <input
            className="border p-3 rounded"
            type="text"
            name="gender"
            placeholder="Gender"
            value={profileData.gender}
            onChange={handleProfileChange}
          />

          <input
            className="border p-3 rounded"
            type="date"
            name="date_of_birth"
            value={profileData.date_of_birth}
            onChange={handleProfileChange}
          />

          {/* Role (non editable) */}
          <input
            className="border p-3 rounded bg-gray-200 cursor-not-allowed"
            type="text"
            name="role"
            value={profileData.role}
            readOnly
          />
        </div>

        <button
          onClick={updateProfile}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>

      {/* ================= PASSWORD RESET ================= */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

        <div className="flex flex-col gap-4">
          <input
            className="border p-3 rounded"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
          />

          <input
            className="border p-3 rounded"
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          onClick={updatePassword}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
