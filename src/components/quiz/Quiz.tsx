import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import "./quiz.css";
import axios from "axios";
import Choice from "./choice/Choice";
type jsonQuestion = {
  question: string;
  answers: string[];
  correct: number;
};
type questionData = jsonQuestion & { choosen: null | number };
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
function Quiz(props: PropsType) {
  const [questionNumber, setQuestionNumber] = useState(0);
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
  useEffect(() => {
    console.log("started");
    props.setQuiz([
      {
        question: "Loading",
        correct: 1,
        answers: ["Loading", "Loading", "Loading"],
        selected: -1,
      },
    ]);
    axios
      .get<jsonQuestion[]>(`/quizzes_data/${props.file}`)
      .then((response) => {
        if (response.status === 200) {
          props.setQuiz(
            response.data.map((item) => {
              console.log(response.data);
              return {
                question: item.question,
                correct: item.correct,
                answers: item.answers,
                selected: -1,
              };
            })
          );
        }
      })
      .catch(() => {
        props.setQuiz([
          {
            question:
              'You have to select quiz category first to proceed to quiz, What i"ll do ?',
            correct: 1,
            answers: [
              "Keep refreshing the app till it crashes.",
              "Go to home then select the category i want.",
              "Close the browser then go to bed.",
            ],
            selected: -1,
          },
        ]);
      });
  }, [props.file]);
  return (
    <div className="question-window">
      <h3>{props.quiz[questionNumber].question}</h3>
      <ul className="choices">
        {props.quiz[questionNumber].answers.map((answer, index) => {
          const selected =
            props.quiz[questionNumber].selected === index ? true : false;
          return (
            <Choice
              answer={answer}
              index={questionNumber}
              answerIndex={index}
              selected={selected}
              quiz={props.quiz}
              setQuiz={props.setQuiz}
            />
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
        <Link to={"submit"}>Submit</Link>
      </div>
    </div>
  );
}

export default Quiz;
