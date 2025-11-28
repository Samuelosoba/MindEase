import { useState, useEffect } from "react";
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
import api from "../../Utils/axios";

export default function TimeManagement() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);

  const headerDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  /** -------------------------------------------------
   *  ⭐ Load Completed Tasks From Storage (per date)
   * ------------------------------------------------- */
  const getStoredCompletion = () => {
    const key = `completedTasks-${selectedDate.toDateString()}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  };

  const saveCompleted = (completed) => {
    const key = `completedTasks-${selectedDate.toDateString()}`;
    localStorage.setItem(key, JSON.stringify(completed));
  };

  /** -------------------------------------------------
   *  ✨ Fetch Tasks From Backend
   * ------------------------------------------------- */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/reminders");
        const storedCompleted = getStoredCompletion();

        const mappedTasks = res.data
          .filter((task) => {
            const date = new Date(task.dueDateTime);
            return (
              date.getFullYear() === selectedDate.getFullYear() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getDate() === selectedDate.getDate()
            );
          })
          .map((task) => ({
            id: task.id,
            title: task.notes,
            time: new Date(task.dueDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            checked: storedCompleted[task.id] || false,
            status: storedCompleted[task.id] ? "completed" : "pending",
          }));

        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  /** -------------------------------------------------
   *  ✔ Toggle Task + Persist For The Day
   * ------------------------------------------------- */
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            checked: !task.checked,
            status: !task.checked ? "completed" : "pending",
          }
        : task
    );

    setTasks(updatedTasks);

    // Update localStorage
    const completed = getStoredCompletion();
    if (completed[id]) delete completed[id];
    else completed[id] = true;
    saveCompleted(completed);
  };

  /** -------------------------------------------------
   *  ➕ Add New Task
   * ------------------------------------------------- */
  // Update addTask function
  const addTask = async () => {
    if (!newTaskTitle.trim() || !newTaskTime.trim()) return;

    setIsAdding(true); // Start loading

    try {
      const today = new Date();
      const [hours, minutes] = newTaskTime.split(":");

      const dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        parseInt(hours),
        parseInt(minutes)
      );

      const res = await api.post("/set-reminder", {
        notes: newTaskTitle,
        setDateTime: new Date().toISOString(),
        dueDateTime: dueDate.toISOString(),
      });

      setTasks([
        ...tasks,
        {
          id: res.data.id,
          title: res.data.notes,
          time: newTaskTime,
          checked: false,
          status: "pending",
        },
      ]);

      setNewTaskTitle("");
      setNewTaskTime("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsAdding(false); // Stop loading
    }
  };

  const handleCancel = () => {
    setNewTaskTitle("");
    setNewTaskTime("");
    setIsModalOpen(false);
  };

  /** -------------------------------------------------
   *  Charts + UI Helpers
   * ------------------------------------------------- */
  const completedCount = tasks.filter((t) => t.checked).length;
  const remainingCount = tasks.length - completedCount;
  const completionPercentage = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const pieData = [
    { name: "Completed", value: completionPercentage },
    { name: "Remaining", value: 100 - completionPercentage },
  ];

  const weekData = [
    { day: "Mon", value: 85 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 70 },
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
      case "pending":
        return { bg: "bg-[#fce9e8]", text: "text-[#881411]", label: "Pending" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-600", label: "Unknown" };
    }
  };

  /** -------------------------------------------------
   *  📩 Send Email Reminders
   * ------------------------------------------------- */
  const sendEmailReminders = async () => {
    try {
      await api.post("/send-reminders");
      alert("Email reminders sent!");
    } catch (error) {
      console.error("Error sending email reminders:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6fafe] flex flex-col">
      {/* Header */}
      <div className="px-4 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-black text-lg md:text-2xl font-medium">
            Time Management
          </h1>
          <p className="text-sm md:text-base text-black">{headerDate}</p>
        </div>

        <button
          className="bg-[#1560b7] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-xl flex items-center gap-2 hover:bg-[#104889] transition"
          onClick={sendEmailReminders}
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-xs md:text-sm">Email Reminders</span>
        </button>
      </div>

      {/* Main */}
      <div className="px-4 md:px-8 pb-8 space-y-5 w-full max-w-[1400px] mx-auto">
        {/* Motivational Card */}
        <div className="bg-[#a3c9f5] rounded-xl p-4 md:p-6 flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white/20 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1523705480679-b5d0cc17a656"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[#05182e]">
            <p className="text-base md:text-lg font-medium">
              One task at a time, you're doing great!
            </p>
            <p className="text-sm md:text-base">Small steps lead to big wins</p>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl border border-[#d2e5f9] p-4 md:p-6">
          <h2 className="text-lg mb-4 font-medium">Today's Task</h2>

          <div className="space-y-3 md:space-y-4">
            {tasks.map((task) => {
              const styles = getStatusStyles(task.status);
              return (
                <div
                  key={task.id}
                  className="bg-[#f2f2f2] rounded-xl p-4 flex items-center gap-4"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 border-[#1560b7] flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    {task.checked && (
                      <CheckCircle2 className="w-5 h-5 text-[#1560b7]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <p className="text-base md:text-lg">{task.title}</p>
                    <p className="text-xs md:text-sm">{task.time}</p>
                  </div>

                  <div className={`${styles.bg} px-3 py-2 rounded-lg`}>
                    <span className={`${styles.text} text-xs md:text-sm`}>
                      {styles.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Productivity Summary */}
        <div className="bg-white rounded-xl border border-[#d2e5f9] p-4 md:p-6">
          <h2 className="text-lg md:text-xl mb-4 font-medium">
            Productivity Summary
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="relative w-[180px] h-[180px] md:w-60 md:h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius="65%"
                    outerRadius="80%"
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#1A78E5" />
                    <Cell fill="#A3C9F5" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#104889] text-center">
                  <span className="block text-xl md:text-2xl font-semibold">
                    {completionPercentage}%
                  </span>
                  <span className="text-sm md:text-base">Completed</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-[#e8f2fc] rounded-xl p-4 text-center">
                <p className="text-lg md:text-xl text-[#1560b7] font-semibold">
                  {completedCount}
                </p>
                <p className="text-xs md:text-sm">Tasks done</p>
              </div>

              <div className="bg-[#ecf8ed] rounded-xl p-4 text-center">
                <p className="text-lg md:text-xl text-[#2a6f2d] font-semibold">
                  {remainingCount}
                </p>
                <p className="text-xs md:text-sm">Remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Week Summary */}
        <div className="bg-white rounded-xl border border-[#d2e5f9] p-4 md:p-6">
          <h2 className="text-lg md:text-xl mb-4 font-medium">This Week</h2>

          <div className="w-full h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#333", fontSize: 10 }}
                />
                <Bar dataKey="value" radius={[6, 6, 6, 6]}>
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

      {/* Add Task Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-5 right-5 bg-[#1560b7] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-[#104889] hover:scale-110 transition"
      >
        <Plus className="w-5 h-5" />
      </button>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-2xl p-5 md:p-8 max-w-[90%] md:max-w-[500px] mx-auto">
          <p className="text-xl md:text-2xl text-[#1560b7] font-semibold mb-6">
            Add Task
          </p>

          <div className="space-y-5">
            <div className="h-12 md:h-14 rounded-xl border border-[#a3c9f5] flex items-center px-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full text-sm md:text-base outline-none bg-transparent"
              />
            </div>

            <div className="h-12 md:h-14 rounded-xl border border-[#a3c9f5] flex items-center px-4">
              <input
                type="time"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="w-full text-sm md:text-base outline-none bg-transparent"
              />
              {/* <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#104889]" /> */}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleCancel}
                className="bg-[#e8f2fc] text-[#1560b7] px-5 h-12 rounded-xl hover:bg-[#d2e5f9]"
              >
                Cancel
              </button>

              <button
                onClick={addTask}
                disabled={isAdding} // disable when loading
                className={`bg-[#1560b7] text-white px-5 h-12 rounded-xl hover:bg-[#104889] flex items-center justify-center ${
                  isAdding ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isAdding ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
