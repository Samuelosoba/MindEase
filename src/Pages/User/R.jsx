import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";
import {
  Heart,
  Moon,
  Clock,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";

// ---- WEEKLY STRESS DATA ----
const stressData = [
  { day: "Mon", level: 6, activity: 3 },
  { day: "Tue", level: 7, activity: 2 },
  { day: "Wed", level: 5, activity: 4 },
  { day: "Thu", level: 4, activity: 5 },
  { day: "Fri", level: 6, activity: 3 },
  { day: "Sat", level: 3, activity: 6 },
  { day: "Sun", level: 2, activity: 7 },
];

// ---- STRESS SOURCES ----
const stressSourcesData = [
  { name: "Exam Pressure", value: 35, color: "#1560b7" },
  { name: "Time Management", value: 25, color: "#43a047" },
  { name: "Academic Performance", value: 20, color: "#9c19b3" },
  { name: "Social Life", value: 12, color: "#ff9800" },
  { name: "Other", value: 8, color: "#e91e63" },
];

// ---- USER ACTIVITIES ----
const activitiesData = [
  { name: "Breathing", count: 12 },
  { name: "Music", count: 8 },
  { name: "Videos", count: 5 },
  { name: "AI Chat", count: 15 },
  { name: "Sleep", count: 7 },
];

// ---- QUICK ACCESS ----
const quickAccessCards = [
  {
    title: "Stress Management",
    description: "Find your calm",
    icon: Heart,
    color: "bg-[#1560b7]",
    route: "/",
  },
  {
    title: "Breathing Exercises",
    description: "4 techniques available",
    icon: Activity,
    color: "bg-[#38943c]",
    route: "/breathing-exercises",
  },
  {
    title: "AI Assistant",
    description: "Chat for support",
    icon: MessageSquare,
    color: "bg-[#9c19b3]",
    route: "/",
  },
  {
    title: "Sleep Support",
    description: "Rest better tonight",
    icon: Moon,
    color: "bg-[#ff9800]",
    route: "/",
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

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* TOP BANNER */}
      <div className="bg-[#1560b7] px-6 md:px-10 lg:px-16 py-10 mt-12">
        <h1 className="text-3xl md:text-4xl text-white mb-1">
          {greeting}, {user?.firstName || "User"}! 👋
        </h1>
        <p className="text-white/90 text-base md:text-lg">
          Here's your wellness overview for today
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 space-y-8">
        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CARD 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-[#e8f2fc] rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#1560b7]" />
              </div>
              <span className="text-sm text-[#43a047]">↓ 23%</span>
            </div>
            <h3 className="text-2xl text-[#1560b7] mb-1">Low</h3>
            <p className="text-sm text-gray-600">Current Stress Level</p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-[#daf1db] rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#38943c]" />
              </div>
              <span className="text-sm text-[#43a047]">↑ 12</span>
            </div>
            <h3 className="text-2xl text-[#38943c] mb-1">47</h3>
            <p className="text-sm text-gray-600">Activities This Week</p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-[#fff4e5] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ff9800]" />
              </div>
              <span className="text-sm text-[#43a047]">🔥</span>
            </div>
            <h3 className="text-2xl text-[#ff9800] mb-1">7</h3>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex justify-between mb-4">
              <div className="w-12 h-12 bg-[#f3e5f5] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#9c19b3]" />
              </div>
              <span className="text-sm text-[#43a047]">Good</span>
            </div>
            <h3 className="text-2xl text-[#9c19b3] mb-1">7.5h</h3>
            <p className="text-sm text-gray-600">Avg Sleep Time</p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LINE CHART */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <h3 className="text-xl md:text-2xl mb-1">Weekly Stress Levels</h3>
            <p className="text-sm text-gray-600 mb-6">
              Your stress trend over the past week
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={stressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
                <XAxis dataKey="day" stroke="#5b6776" />
                <YAxis stroke="#5b6776" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#1560b7"
                  strokeWidth={3}
                  dot={{ fill: "#1560b7" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <h3 className="text-xl md:text-2xl mb-1">Stress Sources</h3>
            <p className="text-sm text-gray-600 mb-6">
              What's causing your stress
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stressSourcesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {stressSourcesData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTIVITIES BAR CHART */}
        <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
          <h3 className="text-xl md:text-2xl mb-1">Activities Completed</h3>
          <p className="text-sm text-gray-600 mb-6">
            Your wellness activities this week
          </p>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activitiesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
              <XAxis dataKey="name" stroke="#5b6776" />
              <YAxis stroke="#5b6776" />
              <Tooltip />
              <Bar dataKey="count" fill="#1560b7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* QUICK ACCESS */}
        <div>
          <h3 className="text-xl md:text-2xl mb-4">Quick Access</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {quickAccessCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(card.route)}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-[#d2e5f9] hover:shadow-lg transition flex flex-col items-start"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${card.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <h4 className="text-base sm:text-lg font-medium text-[#333]">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="bg-[#1560b7]  rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-xl md:text-2xl mb-6">
            💡 Insights & Recommendations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg mb-2">🎯 Your Best Time</h4>
              <p className="text-white/90">
                You're most relaxed on weekends. Try to maintain your weekend
                habits.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg mb-2">📈 Progress Update</h4>
              <p className="text-white/90">
                Stress levels decreased by 23% this week. Great work!
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg mb-2">🧘 Suggested Activity</h4>
              <p className="text-white/90">
                Try the Box Breathing exercise before your next exam.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <h4 className="text-lg mb-2">🌙 Sleep Reminder</h4>
              <p className="text-white/90">
                Your sleep quality improves when you do breathing exercises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
