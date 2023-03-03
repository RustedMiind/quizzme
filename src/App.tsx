import React, { Dispatch } from "react";
import { useContext, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/NavBar";
import Menu from "./components/menu/Menu";
import Quiz from "./components/quiz/Quiz";
import Submit from "./components/sibmit/Submit";

export const FileContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});
type quizType = {
  question: string;
  correct: number;
  selected: number;
  answers: string[];
}[];

function App() {
  const [quiz, setQuiz] = useState<quizType>([
    { question: "", correct: 0, selected: -1, answers: [""] },
  ]);
  const [file, setFile] = useState("quiz.json");
  return (
    <div className="App">
      <NavBar />
      <div className="View">
        <Routes>
          <Route
            path="/"
            element={
              <FileContext.Provider value={setFile}>
                <Menu />
              </FileContext.Provider>
            }
          />

          <Route path="quiz">
            <Route
              path=""
              element={<Quiz quiz={quiz} file={file} setQuiz={setQuiz} />}
            />
            <Route
              path="submit"
              element={<Submit quiz={quiz} file={file} setQuiz={setQuiz} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
