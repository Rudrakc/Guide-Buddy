import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Profile from "./Pages/Profile";
import { QuizData } from "./types/type";
import { useState } from "react";

const App = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home setQuizData={setQuizData} />} />
          <Route path="/quiz" element={<Quiz quizData={quizData} setQuizData={setQuizData} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
