import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} exact />
      </Routes>
    </Router>
  )
}