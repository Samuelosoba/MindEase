import { useState } from "react";
import { Bell, Plus, CheckCircle2, Clock } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { Dialog, DialogContent } from "../../Components/User/Dialog";

export default function TimeManagement() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Math Assignments",
      time: "8:00",
      status: "completed",
      checked: true,
    },
    {
      id: 2,
      title: "Study For Test",
      time: "12:00",
      status: "ongoing",
      checked: false,
    },
    {
      id: 3,
      title: "Take a rest",
      time: "2:00",
      status: "pending",
      checked: false,
    },
    {
      id: 4,
      title: "Go for rehearsal",
      time: "4:50",
      status: "pending",
      checked: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              checked: !task.checked,
              status: !task.checked
                ? "completed"
                : task.id === 2
                ? "ongoing"
                : "pending",
            }
          : task
      )
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim() && newTaskTime.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTaskTitle,
          time: newTaskTime,
          status: "pending",
          checked: false,
        },
      ]);
      setNewTaskTitle("");
      setNewTaskTime("");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setNewTaskTitle("");
    setNewTaskTime("");
    setIsModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.checked).length;
  const remainingCount = tasks.length - completedCount;
  const completionPercentage = Math.round(
    (completedCount / tasks.length) * 100
  );

  const pieData = [
    { name: "Completed", value: completionPercentage },
    { name: "Remaining", value: 100 - completionPercentage },
  ];

  const weekData = [
    { day: "Mon", value: 85 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 80 },
    { day: "Thur", value: 70 },
    { day: "Fri", value: 25 },
    { day: "Sat", value: 20 },
    { day: "Sun", value: 15 },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-[#edf7ed]",
          text: "text-[#2d6c30]",
          label: "Completed",
        };
      case "ongoing":
        return { bg: "bg-[#e8f2fc]", text: "text-[#1560b7]", label: "Ongoing" };
      case "pending":
        return { bg: "bg-[#fce9e8]", text: "text-[#881411]", label: "Pending" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", label: "Unknown" };
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fafe] flex flex-col">
      {/* Header */}
      <div className="px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-black text-xl md:text-2xl">Time Management</h1>
          <p className="text-[16px] md:text-[18px] text-black">
            Monday, November 3, 2025
          </p>
        </div>

        <button className="bg-[#1560b7] text-white px-5 md:px-6 py-3 md:py-4 rounded-2xl flex items-center gap-2 md:gap-3 hover:bg-[#104889] transition-colors">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-[18px]">Email Reminders</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 pb-8 space-y-6 max-w-[1400px] w-full mx-auto">
        {/* Motivational Card */}
        <div className="bg-[#a3c9f5] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 bg-white/20">
            <img
              src="https://images.unsplash.com/photo-1523705480679-b5d0cc17a656"
              alt="Productivity"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-[#05182e] text-center md:text-left">
            <p className="text-xl md:text-[24px]">
              One task at a time, you're doing great!
            </p>
            <p className="text-[16px] md:text-[18px]">
              Small steps lead to big wins
            </p>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl border border-[#d2e5f9] p-5 md:p-8">
          <h2 className="text-[20px] md:text-[24px] mb-6">Today's Task</h2>

          <div className="space-y-4 md:space-y-6">
            {tasks.map((task) => {
              const styles = getStatusStyles(task.status);
              return (
                <div
                  key={task.id}
                  className="bg-[#f2f2f2] rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-[#1560b7] flex items-center justify-center hover:bg-[#1560b7] hover:text-white transition-all"
                  >
                    {task.checked && (
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#1560b7]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <p className="text-lg md:text-[24px] text-[#333333]">
                      {task.title}
                    </p>
                    <p className="text-[16px] md:text-[18px] text-[#333333]">
                      {task.time}
                    </p>
                  </div>

                  <div
                    className={`${styles.bg} px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center`}
                  >
                    <span
                      className={`${styles.text} text-[16px] md:text-[18px]`}
                    >
                      {styles.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Productivity Summary */}
        <div className="bg-white rounded-2xl border border-[#d2e5f9] p-6 md:p-8">
          <h2 className="text-[20px] md:text-[24px] mb-6">
            Productivity Summary
          </h2>

          <div className="flex flex-col items-center gap-8">
            {/* Circular Chart */}
            <div className="relative w-full max-w-[250px] md:max-w-[300px] h-[250px] md:h-[300px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius="60%"
                    outerRadius="80%"
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#1A78E5" />
                    <Cell fill="#A3C9F5" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#104889] text-center">
                  <span className="block text-2xl md:text-[32px]">
                    {completionPercentage}%
                  </span>
                  <span className="text-lg md:text-[24px]">Completed</span>
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:flex md:gap-6 w-full">
              <div className="flex-1 bg-[#e8f2fc] rounded-2xl p-4 md:p-6 text-center">
                <p className="text-xl md:text-[24px] text-[#1560b7]">
                  {completedCount}
                </p>
                <p className="text-[16px] md:text-[18px] text-[#1560b7]">
                  Tasks done
                </p>
              </div>
              <div className="flex-1 bg-[#ecf8ed] rounded-2xl p-4 md:p-6 text-center">
                <p className="text-xl md:text-[24px] text-[#2a6f2d]">
                  {remainingCount}
                </p>
                <p className="text-[16px] md:text-[18px] text-[#2a6f2d]">
                  Remaining
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-2xl border border-[#d2e5f9] p-6 md:p-8">
          <h2 className="text-[20px] md:text-[24px] mb-6">This Week</h2>

          <div className="w-full h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#333", fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                  {weekData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.value > 50 ? "url(#colorGradient)" : "#E8F2FC"
                      }
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2DD4BF" />
                    <stop offset="100%" stopColor="#1560B7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#1560b7] text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#104889] transition-all hover:scale-110"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Add Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-[20px] p-6 md:p-[60px] max-w-[90%] md:max-w-[600px] mx-auto">
          <div className="space-y-6 md:space-y-[40px]">
            <p className="text-xl md:text-[32px] text-[#1560b7]">Add Task</p>

            <div className="space-y-6 md:space-y-[59px]">
              {/* Title Input */}
              <div className="h-[56px] md:h-[64px] rounded-2xl border border-[#a3c9f5] flex items-center px-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-[16px] text-[#104889] bg-transparent outline-none"
                />
              </div>

              {/* Time Input */}
              <div className="h-[56px] md:h-[64px] rounded-2xl border border-[#a3c9f5] flex items-center px-4">
                <input
                  type="time"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-full text-[16px] text-[#104889] bg-transparent outline-none"
                />
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#104889]" />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[30px]">
                <button
                  onClick={handleCancel}
                  className="bg-[#e8f2fc] text-[#1560b7] px-6 h-[56px] md:h-[70px] w-full md:w-[200px] rounded-2xl text-[16px] md:text-[18px] hover:bg-[#d2e5f9]"
                >
                  Cancel
                </button>

                <button
                  onClick={addTask}
                  className="bg-[#1560b7] text-white px-6 h-[56px] md:h-[70px] w-full md:w-[200px] rounded-2xl text-[16px] md:text-[18px] hover:bg-[#104889] border border-[#a3c9f5]"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
