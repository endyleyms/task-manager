import { Link, useLocation } from "react-router-dom";
import Typography from "../Atom/Typography";
import ButtonUi from "../Atom/ButtonUi";
import { useProjects } from "../../context/ProjectContextType";
import { useState } from "react";
import Modal from "./Modal";
import NewProject from "../Molecules/NewProject";


export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const location = useLocation();
  const { state } = useProjects();
  const { projects, loading } = state;
  if (loading) return <p>Cargando...</p>;
  if (!projects) return <p>No hay proyectos</p>;
  const projectList = projects.length
    ? projects.map((p) => (
      { name: `🗂️ ${p.name}`, path: `/project/${p.id}` }
    ))
    : [];


  return (
    <div className="w-[13%] h-full bg-gradient-to-b from-blue-900 to-blue-500 text-white fixed top-0 left-0 shadow-xl flex flex-col justify-between border-r border-purple-700 gap-y-10">
      <div className="flex flex-col gap-4">
        <div className="mb-10 text-center">
          <Typography
            text="Task Manager"
            tag="h2"
            className="text-2xl font-semibold text-white tracking-wide"
          />
        </div>
        <nav className="flex flex-col gap-3">
          {projectList.map((project, index) => {
            const isActive = location.pathname === project.path;

            return (
              <Link
                key={index}
                to={project.path}
                className={`px-4 py-2 rounded-lg transition duration-200 ${isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"}`} >
                {project.name}
              </Link>
            );
          })}
        </nav>
        <ButtonUi
          title="➕ New"
          onClick={() => setIsModalOpen(true)}
          type="secondary"
        />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Project">
          <NewProject />
        </Modal>
      </div>
      <div className="text-sm text-white text-center">
        © 2025 MyTask
      </div>
    </div>

  );
}
