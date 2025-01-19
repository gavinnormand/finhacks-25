import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <h1>
        <Link to="/" className="pageButton">
          Scholar Saver
        </Link>
      </h1>
      <div className="pages">
        <span className="pageButton">
          <Link
            to="/personal-finances"
            className={`pageButton ${
              location.pathname === "/personal-finances" ? "active" : "inactive"
            }`}
          >
            Personal Expenses
          </Link>
        </span>
        <span className="pageButton">
          <Link
            to="/educational-finances"
            className={`pageButton ${
              location.pathname === "/educational-finances"
                ? "active"
                : "inactive"
            }`}
          >
            Educational Expenses
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
