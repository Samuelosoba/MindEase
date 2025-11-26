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

const stressData = [
  { day: "Mon", level: 6, activity: 3 },
  { day: "Tue", level: 7, activity: 2 },
  { day: "Wed", level: 5, activity: 4 },
  { day: "Thu", level: 4, activity: 5 },
  { day: "Fri", level: 6, activity: 3 },
  { day: "Sat", level: 3, activity: 6 },
  { day: "Sun", level: 2, activity: 7 },
];

const stressSourcesData = [
  { name: "Exam Pressure", value: 35, color: "#1560b7" },
  { name: "Time Management", value: 25, color: "#43a047" },
  { name: "Academic Performance", value: 20, color: "#9c19b3" },
  { name: "Social Life", value: 12, color: "#ff9800" },
  { name: "Other", value: 8, color: "#e91e63" },
];

const activitiesData = [
  { name: "Breathing", count: 12 },
  { name: "Music", count: 8 },
  { name: "Videos", count: 5 },
  { name: "AI Chat", count: 15 },
  { name: "Sleep", count: 7 },
];

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
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1560b7] to-[#43a047] px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-white mb-2">
            {greeting}, Interns Flexisaf! 👋
          </h1>
          <p className="text-xl text-white/90">
            Here's your wellness overview for today
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-16 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#e8f2fc] rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-[#1560b7]" />
              </div>
              <span className="text-sm text-[#43a047]">↓ 23%</span>
            </div>
            <h3 className="text-3xl text-[#1560b7] mb-1">Low</h3>
            <p className="text-sm text-gray-600">Current Stress Level</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#daf1db] rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#38943c]" />
              </div>
              <span className="text-sm text-[#43a047]">↑ 12</span>
            </div>
            <h3 className="text-3xl text-[#38943c] mb-1">47</h3>
            <p className="text-sm text-gray-600">Activities This Week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#fff4e5] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-[#ff9800]" />
              </div>
              <span className="text-sm text-[#43a047]">🔥</span>
            </div>
            <h3 className="text-3xl text-[#ff9800] mb-1">7</h3>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#f3e5f5] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#9c19b3]" />
              </div>
              <span className="text-sm text-[#43a047]">Good</span>
            </div>
            <h3 className="text-3xl text-[#9c19b3] mb-1">7.5h</h3>
            <p className="text-sm text-gray-600">Avg Sleep Time</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Stress Levels Chart */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="mb-6">
              <h3 className="text-2xl text-[#333333] mb-1">
                Weekly Stress Levels
              </h3>
              <p className="text-sm text-gray-600">
                Your stress trend over the past week
              </p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
                <XAxis dataKey="day" stroke="#5b6776" />
                <YAxis stroke="#5b6776" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d2e5f9",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#1560b7"
                  strokeWidth={3}
                  dot={{ fill: "#1560b7", r: 5 }}
                  name="Stress Level"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <TrendingDown className="w-4 h-4 text-[#43a047]" />
              <span>Stress levels are decreasing. Keep it up!</span>
            </div>
          </div>

          {/* Stress Sources Pie Chart */}
          <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
            <div className="mb-6">
              <h3 className="text-2xl text-[#333333] mb-1">Stress Sources</h3>
              <p className="text-sm text-gray-600">
                What's causing your stress
              </p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={stressSourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stressSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #d2e5f9",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activities Chart */}
        <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
          <div className="mb-6">
            <h3 className="text-2xl text-[#333333] mb-1">
              Activities Completed
            </h3>
            <p className="text-sm text-gray-600">
              Your wellness activities this week
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activitiesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" />
              <XAxis dataKey="name" stroke="#5b6776" />
              <YAxis stroke="#5b6776" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #d2e5f9",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#1560b7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Access Section */}
        <div>
          <h3 className="text-2xl text-[#333333] mb-4">Quick Access</h3>
          <div className="grid grid-cols-4 gap-6">
            {quickAccessCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(card.route)}
                  className="bg-white rounded-2xl p-6 border border-[#d2e5f9] hover:shadow-lg transition-shadow text-left"
                >
                  <div
                    className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg text-[#333333] mb-1">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-[#d2e5f9]">
          <h3 className="text-2xl text-[#333333] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-[#daf1db] rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#38943c]" />
              </div>
              <div className="flex-1">
                <p className="text-[#333333]">
                  Completed 4-7-8 Breathing Exercise
                </p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <span className="text-sm text-[#43a047]">+10 pts</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-[#e8f2fc] rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#1560b7]" />
              </div>
              <div className="flex-1">
                <p className="text-[#333333]">Chatted with AI Assistant</p>
                <p className="text-sm text-gray-600">5 hours ago</p>
              </div>
              <span className="text-sm text-[#43a047]">+5 pts</span>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-[#f3e5f5] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#9c19b3]" />
              </div>
              <div className="flex-1">
                <p className="text-[#333333]">Completed Stress Assessment</p>
                <p className="text-sm text-gray-600">Yesterday</p>
              </div>
              <span className="text-sm text-[#43a047]">+15 pts</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#fff4e5] rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-[#ff9800]" />
              </div>
              <div className="flex-1">
                <p className="text-[#333333]">Sleep Meditation Session</p>
                <p className="text-sm text-gray-600">Yesterday</p>
              </div>
              <span className="text-sm text-[#43a047]">+8 pts</span>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="bg-gradient-to-r from-[#1560b7] to-[#43a047] rounded-2xl p-8 text-white">
          <h3 className="text-2xl mb-4">💡 Insights & Recommendations</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="text-lg mb-2">🎯 Your Best Time</h4>
              <p className="text-white/90">
                You're most relaxed on weekends. Try to maintain some of those
                habits during weekdays.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="text-lg mb-2">📈 Progress Update</h4>
              <p className="text-white/90">
                Your stress levels have decreased by 23% this week. Keep up the
                great work!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="text-lg mb-2">🧘 Suggested Activity</h4>
              <p className="text-white/90">
                Try the Box Breathing exercise before your next exam for better
                focus.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h4 className="text-lg mb-2">🌙 Sleep Reminder</h4>
              <p className="text-white/90">
                Your sleep quality improves when you do breathing exercises
                before bed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
