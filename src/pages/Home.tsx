import Board from '../components/Organism/Board'
import Header from "../components/Organism/Header";
import { useProjects } from '../context/ProjectContextType';
import { useParams } from "react-router-dom";
import { useActions } from '../hooks/useActions';
import { useState } from 'react';


export default function Home() {
  const [filter, setFilter] = useState("");
  const { projectName } = useParams();
  const { state } = useProjects();
  const { projects, loading, error } = state;

  const { filterTasks } = useActions();

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projectName || Array.isArray(projectName)) return <p>ID inválido</p>;

  const project = projects.find((p) => p.id === projectName);

  if (!project) return <p>Proyecto no encontrado</p>;

  const filteredTasks = filterTasks(project.tasks, filter);

  return (
    <div className='w-full h-full'>
      <div className="h-20">
        <Header
          project={project}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <Board tasks={filteredTasks} />
    </div>
  )
}
