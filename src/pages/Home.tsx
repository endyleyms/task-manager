import Board from '../components/Organism/Board'
import Header from "../components/Organism/Header";
import { useProjects } from '../context/ProjectContextType';
import { useParams } from "react-router-dom";


export default function Home() {
  const { projectName } = useParams();
  const { state } = useProjects();
  const { projects, loading, error } = state;

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projectName || Array.isArray(projectName)) return <p>ID inválido</p>;

  const project = projects.find((p) => p.id === projectName);

  if (!project) return <p>Proyecto no encontrado</p>;

  return (
    <div className='w-full h-full'>
      <div className="h-20">
        <Header onEdit={() => console.log("hi")} onNewTask={() => console.log("hi")} project={project} />
      </div>
      <Board tasks={project.tasks} />
    </div>
  )
}
