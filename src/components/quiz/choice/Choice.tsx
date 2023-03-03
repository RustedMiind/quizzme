import { Dispatch, SetStateAction } from "react";
type propsType = {
  selected: boolean;
  answer: string;
  index: number;
  answerIndex: number;
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
  quiz: {
    question: string;
    correct: number;
    selected: number;
    answers: string[];
  }[];
};
function Choice(props: propsType) {
  return (
    <li
      className={`choice ${props.selected ? "selected" : ""}`}
      onClick={() => {
        props.setQuiz(
          props.quiz.map((item, index) => {
            if (props.index === index) {
              return { ...item, selected: props.answerIndex };
            }
            return item;
          })
        );
      }}
    >
      {props.answer}
    </li>
  );
}

export default Choice;
