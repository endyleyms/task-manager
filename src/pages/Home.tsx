import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Board from '../components/Organism/Board'
import { useActions } from '../hooks/useActions';
import Header from "../components/Organism/Header";
import { useProjects } from '../context/ProjectContextType';


export default function Home() {
  const [filter, setFilter] = useState("");
  const { projectName } = useParams();
  const { state, dispatch } = useProjects();
  const { projects, loading, error, currentProject } = state;

  const { filterTasks } = useActions();

  useEffect(() => {
    if (!projectName || Array.isArray(projectName)) {
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: null });
      return;
    }

    const project = projects.find((p) => p.id === projectName) || null;
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
  }, [projectName, projects]);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projectName || Array.isArray(projectName)) return <p>ID inválido</p>;
  if (!currentProject) return <p>Proyecto no encontrado</p>;

  const filteredTasks = filterTasks(currentProject.tasks, filter);

  return (
    <div className='w-full h-full'>
      <div className="h-20">
        <Header
          project={currentProject}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <Board tasks={filteredTasks} />
    </div>
  )
}
