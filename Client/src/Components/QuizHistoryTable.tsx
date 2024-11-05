import { QuizAttempt } from "../types/type";
import { useNavigate } from "react-router-dom";

interface QuizHistoryTableProps {
  attempts: QuizAttempt[];
  onDelete: (id: number) => void;
}

const QuizHistoryTable = ({ attempts, onDelete }: QuizHistoryTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6 border-b">
        Your Previous Quizzes
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Attempt Date & Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attempts.map((attempt) => (
              <tr key={attempt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {attempt.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {attempt.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {attempt.attemptDate}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800">
                    {attempt.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm space-x-4">
                  <button
                    onClick={() => navigate(`/quiz/${attempt.id}`)}
                    className="text-blue-600 hover:text-blue-800 bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDelete(attempt.id)}
                    className="text-red-600 hover:text-red-800 bg-slate-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizHistoryTable;
