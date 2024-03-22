import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Notes from "./components/notes/notes";
import Users from "./components/users/users";
import Register from "./components/register/register";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/notes" element={<Notes />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
