import "./submit.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
type PropsType = {
  setQuiz: Dispatch<
    SetStateAction<
      {
        question: string;
        correct: number;
        selected: number;
        answers: string[];
      }[]
    >
  >;
  file: string;
  quiz: {
    question: string;
    correct: number;
    selected: number;
    answers: string[];
  }[];
};
function Submit(props: PropsType) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [degree, setDegree] = useState(
    props.quiz.filter((question) => {
      if (question.correct === question.selected) {
        return true;
      }
      return false;
    }).length
  );
  const questionNumberHandler: (action: "next" | "prev") => void = (action) => {
    switch (action) {
      case "next":
        if (questionNumber < props.quiz.length - 1)
          setQuestionNumber(questionNumber + 1);
        break;
      case "prev":
        if (questionNumber > 0) setQuestionNumber(questionNumber - 1);
        break;

      default:
        break;
    }
  };

  return (
    <div className="submit-window">
      <h3>{props.quiz[questionNumber].question}</h3>
      <ul className="choices">
        {props.quiz[questionNumber].answers.map((answer, index) => {
          const selected =
            props.quiz[questionNumber].selected === index ? true : false;
          return (
            <li
              className={`choice ${selected ? "selected" : ""} ${
                index === props.quiz[questionNumber].correct ? "true" : ""
              } ${
                props.quiz[questionNumber].selected === -1 &&
                index === props.quiz[questionNumber].correct
                  ? "not-choosen"
                  : ""
              }`}
            >
              {answer}
            </li>
          );
        })}
      </ul>
      <div className="manage">
        <button
          className="handler"
          onClick={() => {
            questionNumberHandler("prev");
          }}
        >
          {"<"}prev
        </button>
        <button
          className="handler"
          onClick={() => {
            questionNumberHandler("next");
          }}
        >
          next{">"}
        </button>
      </div>
      <div className="info">
        <h4>
          You got {degree}/{props.quiz.length}
        </h4>
        <h4>
          Questions Answered{" "}
          {
            props.quiz.filter((answer) => {
              if (answer.selected >= 0) {
                return true;
              }
              return false;
            }).length
          }
          /{props.quiz.length}
        </h4>
      </div>
    </div>
  );
}

export default Submit;
