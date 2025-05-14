import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Sidebar from "./components/Organism/Sidebar";
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" />
          <Route path="/chat" />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
