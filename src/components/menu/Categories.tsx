import categories from "./categories.json";
import { Link } from "react-router-dom";
import { FileContext } from "../../App";
function Categories() {
  return (
    <FileContext.Consumer>
      {(setFile) => (
        <>
          {categories.map((category) => {
            return (
              <Link
                onClick={() => {
                  document.title = `quizzme | ${category.name} quiz`;
                }}
                to={"/quiz"}
                className="card"
                key={category.id}
              >
                <div
                  onClick={() => {
                    setFile(category.file);
                    // console.log(category.file);
                  }}
                  className="image-container"
                  style={{ backgroundImage: `url("${category.image}")` }}
                ></div>
                <div className="name">
                  <h2>{category.name}</h2>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </FileContext.Consumer>
  );
}

export default Categories;
