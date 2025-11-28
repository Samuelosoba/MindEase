import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Heart,
  Moon,
  Clock,
  MessageSquare,
  Activity,
  Award,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../contexts/AuthProvider";
import api from "../../Utils/axios";

const quickAccessCards = [
  {
    title: "Stress Management",
    description: "Find your calm",
    icon: Heart,
    color: "bg-[#1560b7]",
    route: "/user/stress-management",
  },
  {
    title: "Breathing Exercises",
    description: "4 techniques available",
    icon: Activity,
    color: "bg-[#38943c]",
    route: "/user/stress-management/breathing",
  },
  {
    title: "AI Assistant",
    description: "Chat for support",
    icon: MessageSquare,
    color: "bg-[#9c19b3]",
    route: "/user/assistant",
  },
  {
    title: "Sleep Support",
    description: "Rest better tonight",
    icon: Moon,
    color: "bg-[#ff9800]",
    route: "/user/sleep-support",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/reminders");
        const today = new Date();
        const storedCompletion = JSON.parse(
          localStorage.getItem(`completedTasks-${today.toDateString()}`) || "{}"
        );

        const todayTasks = res.data
          .filter((task) => {
            const due = new Date(task.dueDateTime);
            return (
              due.getFullYear() === today.getFullYear() &&
              due.getMonth() === today.getMonth() &&
              due.getDate() === today.getDate()
            );
          })
          .map((task) => ({
            id: task.id,
            title: task.notes,
            time: new Date(task.dueDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            checked: storedCompletion[task.id] || false,
            status: storedCompletion[task.id] ? "completed" : "pending",
          }));

        setTasks(todayTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            checked: !t.checked,
            status: !t.checked ? "completed" : "pending",
          }
        : t
    );
    setTasks(updated);

    const key = `completedTasks-${new Date().toDateString()}`;
    const stored = JSON.parse(localStorage.getItem(key) || "{}");
    stored[id] = !stored[id];
    localStorage.setItem(key, JSON.stringify(stored));
  };

  const completedCount = tasks.filter((t) => t.checked).length;
  const remainingCount = tasks.length - completedCount;

  const lineChartData = tasks.map((t) => ({
    name: t.time,
    completed: t.checked ? 1 : 0,
  }));

  const pieChartData = [
    { name: "Completed", value: completedCount, color: "#1560b7" },
    { name: "Remaining", value: remainingCount, color: "#e5e5ea" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Banner */}
      <div className="bg-[#1560b7] px-6 py-10 sm:px-8 md:px-10 lg:px-16 mt-12 rounded-b-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold mb-2">
          {greeting}, {user?.firstName || "User"}! 👋
        </h1>
        <p className="text-white/90 text-sm sm:text-base md:text-lg">
          Here's your wellness overview for today
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tasks Remaining */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 bg-[#e8f2fc] rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#1560b7]" />
              </div>
              <span className="text-sm text-[#43a047]">
                ↓{" "}
                {tasks.length
                  ? Math.round((remainingCount / tasks.length) * 100)
                  : 0}
                %
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#1560b7] font-bold mb-1">
              {remainingCount}
            </h3>
            <p className="text-sm text-gray-600">Tasks Remaining</p>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 bg-[#daf1db] rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#38943c]" />
              </div>
              <span className="text-sm text-[#43a047]">↑ {completedCount}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#38943c] font-bold mb-1">
              {completedCount}
            </h3>
            <p className="text-sm text-gray-600">Completed Tasks</p>
          </div>

          {/* Day Streak */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 bg-[#fff4e5] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ff9800]" />
              </div>
              <span className="text-sm text-[#43a047]">🔥</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#ff9800] font-bold mb-1">
              7
            </h3>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>

          {/* Avg Sleep */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <div className="flex justify-between items-center mb-3">
              <div className="w-12 h-12 bg-[#f3e5f5] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#9c19b3]" />
              </div>
              <span className="text-sm text-[#43a047]">Good</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-[#9c19b3] font-bold mb-1">
              7.5h
            </h3>
            <p className="text-sm text-gray-600">Avg Sleep Time</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <h3 className="text-lg sm:text-xl md:text-2xl mb-4 font-semibold">
              Tasks Completion
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
                <XAxis dataKey="name" stroke="#5b6776" />
                <YAxis stroke="#5b6776" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#1560b7"
                  strokeWidth={3}
                  dot={{ fill: "#1560b7" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#d2e5f9]">
            <h3 className="text-lg sm:text-xl md:text-2xl mb-4 font-semibold">
              Today's Task Overview
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {pieChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks List */}
        {tasks.length > 0 && (
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl mb-4 font-semibold">
              Today's Tasks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-[#d2e5f9] hover:shadow-lg transition flex flex-col items-start w-full"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1560b7] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-[#333]">
                    {task.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {task.time}
                  </p>
                  <span
                    className={`mt-2 px-2 py-1 text-xs sm:text-sm rounded-lg ${
                      task.checked
                        ? "bg-[#edf7ed] text-[#2d6c30]"
                        : "bg-[#fce9e8] text-[#881411]"
                    }`}
                  >
                    {task.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl mb-6 font-semibold">
            Quick Access
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickAccessCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(card.route)}
                  className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-start shadow-md hover:shadow-xl transition-all duration-300 w-full"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${card.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h4 className="text-base text-left sm:text-lg font-semibold text-gray-800 mb-1">
                    {card.title}
                  </h4>
                  <p className="text-sm text-left sm:text-base text-gray-500">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#1560b7] rounded-2xl p-4 sm:p-6 md:p-8 text-white space-y-4 md:space-y-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            💡 Insights & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-base sm:text-lg md:text-lg mb-2 font-medium">
                🎯 Your Best Time
              </h4>
              <p className="text-white/90 text-sm sm:text-base">
                You're most relaxed on weekends. Try to maintain your weekend
                habits.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-base sm:text-lg md:text-lg mb-2 font-medium">
                📈 Progress Update
              </h4>
              <p className="text-white/90 text-sm sm:text-base">
                Stress levels decreased by 23% this week. Great work!
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-base sm:text-lg md:text-lg mb-2 font-medium">
                🧘 Suggested Activity
              </h4>
              <p className="text-white/90 text-sm sm:text-base">
                Try the Box Breathing exercise before your next exam.
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-base sm:text-lg md:text-lg mb-2 font-medium">
                🌙 Sleep Reminder
              </h4>
              <p className="text-white/90 text-sm sm:text-base">
                Your sleep quality improves when you do breathing exercises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
