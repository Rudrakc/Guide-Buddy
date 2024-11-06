import { AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface FeedbackBoxProps {
  feedback: string;
  loading: boolean;
}

const FeedbackBox = ({ feedback, loading }: FeedbackBoxProps) => {
  if (!feedback) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 border border-blue-100">
      <div className="flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Feedback</h3>
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Generating feedback...</span>
            </div>
          ) : (
            <ReactMarkdown className="text-gray-600 leading-relaxed whitespace-pre-line">{feedback}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackBox;