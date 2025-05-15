import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Sidebar from "./components/Organism/Sidebar";
import Home from "./pages/Home";
import Header from "./components/Organism/Header";

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen w-screen">
        <div className="h-20">
          <Header onEdit={() => console.log("hi")} onNewTask={() => console.log("hi")} />
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-20 bg-white shadow-md">
            <Sidebar />
          </div>

          {/* Contenido de la página */}
          <div className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" />
              <Route path="/chat" />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>

  )
}

export default App
