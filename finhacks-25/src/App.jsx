import "./App.css";
import Home from "./pages/Home.jsx";
import Personal from "./pages/Personal.jsx";
import Educational from "./pages/Educational.jsx";
import Header from "./assets/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal-finances" element={<Personal />} />
          <Route path="/educational-finances" element={<Educational />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
