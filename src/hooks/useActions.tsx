import { useProjects, type Task, type Project } from "../context/ProjectContextType";
import { useApi } from "./useApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function useActions() {
  const { fetchData } = useApi<[]>();
  const { dispatch, state } = useProjects();
  const handleChange = (value: string) => {
    dispatch({ type: "SET_INPUT", payload: value });
  }


  const filterTasks = (tasks: Task[], filter: string): Task[] => {
    if (!filter) return tasks;

    switch (filter) {
      case 'pending':
      case 'completed':
        return tasks.filter(task => task.status === filter);

      case 'alta':
      case 'medium':
      case 'low':
        return tasks.filter(task => task.priority === filter);

      case 'earliest':
        return [...tasks].sort((a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );

      case 'latest':
        return [...tasks].sort((a, b) =>
          new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );

      default:
        return tasks;
    }
  }


  const handleAddProject = async () => {

    const data = {
      id: crypto.randomUUID(),
      name: state.value,
      tasks: []
    };

    try {
      const newProject = await fetchData({
        url: "http://localhost:3001/Projects",
        method: "POST",
        body: data,
        onError: (err) => {
          toast.error("Error al crear el proyecto: " + err.message);
        },
      })

      if (newProject) {
        toast.success("✅ Proyecto creado exitosamente");
        dispatch({ type: 'NEW_PROJECT', payload: data })
      }

    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      toast.error("Error de conexión al crear el proyecto");
    }

  }

  const handleEditProject = async (projectId: string) => {
    const updatedProject: Project = {
      id: projectId,
      name: state.value,
      tasks: state.projects.find(p => p.id === projectId)?.tasks || []
    };
    try {
      const result = await fetchData({
        url: `http://localhost:3001/Projects/${updatedProject.id}`,
        method: "PUT",
        body: updatedProject,
        onError: (err) => {
          toast.error("Error al editar el proyecto: " + err.message);
        },
      });

      if (result) {
        toast.success("✅ Proyecto actualizado correctamente");

        dispatch({ type: "UPDATE_PROJECT", payload: updatedProject });

      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      toast.error("Error de conexión al editar el proyecto");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const result = await fetchData({
        url: `http://localhost:3001/Projects/${projectId}`,
        method: "DELETE",
        onError: (err) => {
          toast.error("Error al eliminar el proyecto: " + err.message);
        },
      });

      if (result) {
        toast.success("✅ Proyecto eliminado correctamente");

        dispatch({ type: "DELETE_PROJECT", payload: projectId });
      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      toast.error("Error de conexión al eliminar el proyecto");
    }
  };



  return { handleChange, filterTasks, handleAddProject, handleEditProject, handleDeleteProject }
}

