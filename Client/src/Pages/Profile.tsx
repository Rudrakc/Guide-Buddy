import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

// Mock data for the knowledge graph
const knowledgeData = [
  { subject: "JavaScript Basics", score: 85, totalQuizzes: 12 },
  { subject: "Async Programming", score: 72, totalQuizzes: 8 },
  { subject: "Promises", score: 90, totalQuizzes: 15 },
  { subject: "Error Handling", score: 65, totalQuizzes: 6 },
  { subject: "ES6+ Features", score: 78, totalQuizzes: 10 },
  { subject: "Best Practices", score: 88, totalQuizzes: 14 },
];

// Mock data for recent progress
const progressData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 85 },
  { month: "May", score: 90 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">
          {`Quizzes Completed: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const Profile = () => {
  const sortedTopics = [...knowledgeData].sort(
    (a, b) => b.totalQuizzes - a.totalQuizzes
  );
  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src="https://avatar.iran.liara.run/public/boy?username=Scott"
                className=""
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <div className="mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Advanced Learner
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Knowledge Radar Chart */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">
              Knowledge Distribution
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={knowledgeData}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Tooltip />
                  <Radar
                    name="Knowledge Level"
                    dataKey="score"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Learning Progress</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-white rounded-lg shadow-xl p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              Topic Mastery Overview
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sortedTopics}>
                  <defs>
                    {/* <linearGradient id="colorQuizzes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient> */}
                  </defs>
                  <XAxis
                    dataKey="subject"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    label={{
                      value: "Quizzes Completed",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="totalQuizzes"
                    stroke="#4F46E5"
                    fillOpacity={0.3}
                    fill="#4F46E5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Topic Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-600">Total Topics</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {knowledgeData.length}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-600">Total Quizzes</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {knowledgeData.reduce(
                    (acc, curr) => acc + curr.totalQuizzes,
                    0
                  )}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-600">Most Active Topic</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {sortedTopics[0].totalQuizzes}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {sortedTopics[0].subject}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm text-gray-600">Avg Quizzes/Topic</h4>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    knowledgeData.reduce(
                      (acc, curr) => acc + curr.totalQuizzes,
                      0
                    ) / knowledgeData.length
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-600">
                Total Score
              </h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {Math.round(
                  knowledgeData.reduce((acc, curr) => acc + curr.score, 0) /
                    knowledgeData.length
                )}
                %
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Average mastery level
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-600">
                Quizzes Completed
              </h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {knowledgeData.reduce(
                  (acc, curr) => acc + curr.totalQuizzes,
                  0
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">Across all topics</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-600">
                Strongest Topic
              </h4>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {
                  knowledgeData
                    .reduce((max, curr) =>
                      max.score > curr.score ? max : curr
                    )
                    .subject.split(" ")[0]
                }
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Highest scoring subject
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
