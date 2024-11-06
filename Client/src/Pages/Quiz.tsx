import { useEffect, useState } from "react";
import QuizSection from "../Components/QuizSection";
import { QuizData } from "../types/type";
import { useQuizAnswer } from "../Hooks/useQuizAnswers";
import FeedbackBox from "../Components/FeedBackBox";
import { MessageCircle } from "lucide-react";
import axios from "axios";
interface QuizProps {
  quizData: QuizData | null; // Define the props interface
  setQuizData: React.Dispatch<React.SetStateAction<QuizData | null>>;
}

const Quiz: React.FC<QuizProps> = ({ quizData, setQuizData }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { userAns, addAnswer } = useQuizAnswer();

  useEffect(() => {
    const storedQuizData = localStorage.getItem("quizData");
    if (storedQuizData) {
      setQuizData(JSON.parse(storedQuizData));
    }
  }, [setQuizData]);

  const handleSectionToggle = (sectionTitle: string) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  const generateFeedback = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/quiz/getFeedback`,
        { userAns }
      );

      setFeedback(response.data);
    } catch (error) {
      setFeedback(
        "Sorry, there was an error generating feedback. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f9f9f9] p-6">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Sections</h1>
          <button
            onClick={generateFeedback}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Get Feedback</span>
          </button>
        </div>

        <div className="space-y-4">
          {quizData &&
            quizData.sections.map((section, index) => (
              <QuizSection
                key={index}
                section={section}
                sectionIndex={index}
                expandedSection={expandedSection}
                onSectionToggle={handleSectionToggle}
                addAnswer={addAnswer}
              />
            ))}
        </div>

        <FeedbackBox feedback={feedback} loading={loading} />
      </div>
    </div>
  );
};

export default Quiz;
