import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizAttempt, QuizData } from "../types/type";
import QuizHistoryTable from "../Components/QuizHistoryTable";
import axios from "axios";

interface HomeProps {
  setQuizData: React.Dispatch<React.SetStateAction<QuizData | null>>;
}

const Home: React.FC<HomeProps> = ({ setQuizData }) => {
  const [url, setUrl] = useState("");
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([
    {
      id: 1,
      name: "Async JavaScript Quiz",
      attemptDate: "2024-03-17T21:52:45.699Z",
      status: "Done",
    },
    {
      id: 2,
      name: "Promise Fundamentals",
      attemptDate: "2024-03-17T21:52:46.849Z",
      status: "Done",
    },
    {
      id: 3,
      name: "React Hooks Deep Dive",
      attemptDate: "2024-03-17T21:56:32.775Z",
      status: "Done",
    },
  ]);
  const navigate = useNavigate();

  const getQuizData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/getQuiz`,
        { url: url }
      );
      localStorage.setItem("quizData", JSON.stringify(response.data));
      setQuizData(response.data);
    } catch (error) {
      console.error("Error While getting Quiz Data");
    }
  };

  const handleSubmit = async () => {
    await getQuizData();
    navigate("/quiz");
  };

  const handleDelete = (id: number) => {
    setQuizAttempts((attempts) =>
      attempts.filter((attempt) => attempt.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Article Quiz Generator
          </h1>
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Article URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/article"
              required
            />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Generate Quiz
            </button>
          </div>
        </div>

        {quizAttempts.length > 0 && (
          <QuizHistoryTable attempts={quizAttempts} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Home;
