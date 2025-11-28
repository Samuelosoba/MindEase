import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import api from "../../Utils/axios";

export default function Settings() {
  const { user, logout } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    schoolName: user?.schoolName || "",
    educationalLevel: user?.educationalLevel || "",
    gender: user?.gender || "",
    date_of_birth: user?.date_of_birth || "",
    role: user?.role || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-clear messages
  const showMessage = (type, msg) => {
    if (type === "success") {
      setSuccessMsg(msg);
      setErrorMsg("");
    } else {
      setErrorMsg(msg);
      setSuccessMsg("");
    }

    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 4000);
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      setLoadingProfile(true);
      await api.put("/update-profile", profileData);
      showMessage("success", "Profile updated successfully!");
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Profile update failed."
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const updatePassword = async () => {
    try {
      setLoadingPassword(true);
      await api.put("/change-password", passwordData);
      showMessage("success", "Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Password change failed."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>

      {/* NOTIFICATIONS */}
      {successMsg && (
        <div className="w-full max-w-2xl bg-green-100 text-green-700 p-3 rounded-xl mb-4 border border-green-300 text-center">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="w-full max-w-2xl bg-red-100 text-red-700 p-3 rounded-xl mb-4 border border-red-300 text-center">
          {errorMsg}
        </div>
      )}

      {/* ================= PROFILE UPDATE ================= */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "firstName",
            "lastName",
            "schoolName",
            "educationalLevel",
            "gender",
          ].map((field) => (
            <input
              key={field}
              className="border p-3 rounded"
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={profileData[field]}
              onChange={handleProfileChange}
            />
          ))}

          <input
            className="border p-3 rounded bg-gray-200 cursor-not-allowed"
            type="email"
            name="email"
            value={profileData.email}
            readOnly
          />

          <input
            className="border p-3 rounded"
            type="date"
            name="date_of_birth"
            value={profileData.date_of_birth}
            onChange={handleProfileChange}
          />

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
          disabled={loadingProfile}
          className={`mt-6 w-full py-3 rounded-xl font-semibold text-white
            ${
              loadingProfile
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {loadingProfile ? "Updating..." : "Update Profile"}
        </button>

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
          disabled={loadingPassword}
          className={`mt-6 w-full py-3 rounded-xl font-semibold text-white
            ${
              loadingPassword
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }
          `}
        >
          {loadingPassword ? "Updating..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
