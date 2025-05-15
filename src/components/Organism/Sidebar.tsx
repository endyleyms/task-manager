import { Link, useLocation } from "react-router-dom";
import Typography from "../Atom/Typography";
import ButtonUi from "../Atom/ButtonUi";
import { useProjects } from "../../context/ProjectContextType";
import { useState } from "react";
import Modal from "./Modal";
import CrudProject from "../Molecules/CrudProject";
import { useActions } from "../../hooks/useActions";


export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleAddProject } = useActions();


  const location = useLocation();
  const { state } = useProjects();
  const { projects, loading } = state;
  if (loading) return <p>Cargando...</p>;
  if (!projects) return <p>No hay proyectos</p>;
  const projectList = projects.length
    ? projects.map((p) => (
      { name: `${p.name}`, path: `/project/${p.id}` }
    ))
    : [];


  return (
    <div className="w-[30%] md:w-[20%] z-10 lg:w-[13%] h-full bg-white text-gray-800 fixed top-0 left-0 shadow-xl flex flex-col justify-between border-r border-gray-200 py-6 px-4">
      <div className="flex flex-col gap-4">
        <div className="text-center mb-6">
          <Typography
            text="Task Manager"
            tag="h2"
            className="text-xl font-bold text-primary"
          />
        </div>

        <nav className="flex flex-col gap-2">
          {projectList.map((project, index) => {
            const isActive = location.pathname === project.path;

            return (
              <Link
                key={index}
                to={project.path}
                className={`px-4 py-2 rounded-lg transition duration-200 font-medium ${isActive
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'hover:bg-indigo-50 text-gray-700'
                  }`}
              >
                📁 {project.name}
              </Link>
            );
          })}
        </nav>

        {/* Button */}
        <div className="mt-4 items-center flex justify-center">
          <div className="w-1/2">
            <ButtonUi
              title="➕ New"
              onClick={() => setIsModalOpen(true)}
              type="secondary"
            />
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Project">
          <CrudProject onClose={() => setIsModalOpen(false)} type="Create" action={handleAddProject} />
        </Modal>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-auto">
        © 2025 MyTask
      </div>
    </div>


  );
}
