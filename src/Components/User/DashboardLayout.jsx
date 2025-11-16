import { Sidebar } from "./Siderbar";

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-[#F8FBFF] w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
};
