import Categories from "./Categories";
import "./menu.css";
import { useEffect, useState } from "react";
function Menu() {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  useEffect(() => {
    document.title = "quizzme";
  });
  return (
    <div className="menu">
      {!categoriesVisible ? (
        <Categories />
      ) : (
        <button
          onClick={() => {
            setCategoriesVisible(true);
          }}
          className="start"
        >
          <h2>Start Your Quizz now</h2>
        </button>
      )}
    </div>
  );
}

export default Menu;
