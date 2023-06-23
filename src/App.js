import "./App.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import NoteState from "./context/notes/NoteState"
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />
      <div className="container">
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      
      <Route exact path="/about" element={<About/>}/>
      
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/services" element={<Services/>}/>
      <Route exact path="/login" element={<Login/>}/>

      <Route exact path="/signup" element={<SignUp/>}/>

      
      
      </Routes>
      </div>
      </Router>
      </NoteState>
  );
}

export default App;
