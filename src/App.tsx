import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Sidebar from "./components/Organism/Sidebar";
import Home from "./pages/Home";
import { ProjectProvider } from "./context/ProjectContextType";

function App() {

  return (
    <ProjectProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen w-screen">
          <div className="flex overflow-hidden">
            <div className="w-30 bg-white shadow-md">
              <Sidebar />
            </div>

            {/* Contenido de la página */}
            <div className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/project/proyecto1" />} />
                <Route path="/project/:projectName" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ProjectProvider>

  )
}

export default App
