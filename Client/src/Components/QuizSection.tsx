import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, X, HelpCircle } from 'lucide-react';
import { Section } from '../types/type';

interface QuizSectionProps {
  section: Section;
  sectionIndex: number;
  expandedSection: string | null;
  onSectionToggle: (sectionTitle: string) => void;
}

const QuizSection = ({ section, sectionIndex, expandedSection, onSectionToggle }: QuizSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleAnswer = (qIndex: string, answer: string) => {
    if (!submitted[qIndex]) setAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const getButtonStyles = (isSubmitted: boolean, isSelected: boolean, isCorrect: boolean) => {
    if (!isSelected) return "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
    if (!isSubmitted) return "border-blue-500 bg-blue-50 text-blue-700";
    return isCorrect 
      ? "border-green-500 bg-green-50 text-green-700"
      : "border-red-500 bg-red-50 text-red-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full border border-gray-100">
      <button
        className="bg-white w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
        onClick={() => onSectionToggle(section.sectionTitle)}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-lg p-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{section.sectionTitle}</h2>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">{section.questions.length} questions</span>
          {expandedSection === section.sectionTitle ? 
            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
            <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>
      
      {expandedSection === section.sectionTitle && (
        <div className="px-6 pb-4">
          {section.questions.map((question, qIdx) => {
            const qIndex = `${sectionIndex}-${qIdx}`;
            const isSubmitted = submitted[qIndex];
            const selectedAnswer = answers[qIndex];
            const isCorrect = selectedAnswer === question.correctAnswer;

            return (
              <div key={qIdx} className="mt-6 first:mt-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{qIdx + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-medium text-gray-800">{question.question}</p>
                    
                    <div className="mt-4 space-y-3">
                      {question.choices.map((choice, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handleAnswer(qIndex, choice)}
                          disabled={isSubmitted}
                          className={`w-full bg-white flex items-center p-4 rounded-lg border transition-all ${
                            getButtonStyles(isSubmitted, selectedAnswer === choice, isCorrect)
                          }`}
                        >
                          <span className="mr-2">{String.fromCharCode(65 + cIdx)}.</span>
                          <span className="flex-grow text-left">{choice}</span>
                          {isSubmitted && selectedAnswer === choice && (
                            isCorrect ? 
                              <Check className="w-5 h-5 text-green-600" /> : 
                              <X className="w-5 h-5 text-red-600" />
                          )}
                        </button>
                      ))}
                    </div>

                    {selectedAnswer && !isSubmitted && (
                      <button
                        onClick={() => setSubmitted(prev => ({ ...prev, [qIndex]: true }))}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Submit Answer
                      </button>
                    )}

                    {isSubmitted && (
                      <div className={`mt-4 p-4 rounded-lg border ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        {isCorrect ? (
                          <div className="flex items-center text-green-800">
                            <Check className="w-5 h-5 mr-2" />
                            Correct!
                          </div>
                        ) : (
                          <div className="flex items-center text-red-800">
                            <X className="w-5 h-5 mr-2" />
                            Incorrect. Correct answer: {question.correctAnswer}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizSection;