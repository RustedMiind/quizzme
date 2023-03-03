import "./nav-bar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="navbar">
      <ul className="left-side">
        <li>
          <h2>Quizzme</h2>
        </li>
      </ul>
      <ul className="right-side">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Signin</li>
      </ul>
    </nav>
  );
}

export default NavBar;
