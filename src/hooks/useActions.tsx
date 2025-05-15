import { useProjects, type Task, type Project } from "../context/ProjectContextType";
import { useApi } from "./useApi";



export function useActions() {
  const { fetchData } = useApi<[]>();
  const { dispatch, state } = useProjects();
  const handleChange = (value: string) => {
    dispatch({ type: "SET_INPUT", payload: value });
  }

  const handleChangeTask = (field: string, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
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
          alert("Error al crear el proyecto: " + err.message);
        },
      })

      if (newProject) {
        alert("✅ Proyecto creado exitosamente");
        dispatch({ type: 'NEW_PROJECT', payload: data })
      }

    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      alert("Error de conexión al crear el proyecto");
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
          alert("Error al editar el proyecto: " + err.message);
        },
      });

      if (result) {
        alert("✅ Proyecto actualizado correctamente");

        dispatch({ type: "UPDATE_PROJECT", payload: updatedProject });

      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      alert("Error de conexión al editar el proyecto");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const result = await fetchData({
        url: `http://localhost:3001/Projects/${projectId}`,
        method: "DELETE",
        onError: (err) => {
          alert("Error al eliminar el proyecto: " + err.message);
        },
      });

      if (result) {
        alert("✅ Proyecto eliminado correctamente");

        dispatch({ type: "DELETE_PROJECT", payload: projectId });
      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      alert("Error de conexión al eliminar el proyecto");
    }
  };

  const handleAddTask = async (projectId: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: state.title,
      description: state.description,
      dueDate: state.dueDate,
      status: state.status,
      priority: state.priority,
    };

    try {
      const updatedProject = await fetchData({
        url: `http://localhost:3001/Projects/${projectId}`,
        method: "PATCH",
        body: {
          tasks: [
            ...(state.projects.find(p => p.id === projectId)?.tasks || []),
            newTask,
          ],
        },
        onError: (err) => alert("Error al agregar la tarea: " + err.message),
      });

      if (updatedProject) {
        alert("✅ Tarea agregada exitosamente");
        dispatch({ type: 'ADD_TASK', payload: { projectId, task: newTask } });
      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      alert("Error de conexión al agregar la tarea");
    }
  };

  const handleEditTask = async (projectId: string, taskId: string) => {

    const updatedTask = {
      id: taskId,
      title: state.title,
      description: state.description,
      dueDate: state.dueDate,
      status: state.status,
      priority: state.priority,
    };

    try {
      const result = await fetchData({
        url: `http://localhost:3001/Projects/${projectId}`,
        method: 'PATCH',
        body: {
          tasks: state.projects.find(p => p.id === projectId)?.tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        },
        onError: (err) => {
          alert('Error al editar la tarea: ' + err.message);
        },
      });

      if (result) {
        dispatch({ type: 'EDIT_TASK', payload: { projectId, task: updatedTask } });
        alert('✅ Tarea actualizada correctamente');
      }
    } catch (error) {
      console.error('❌ Error en la conexión:', error);
      alert('Error de conexión al editar la tarea');
    }
  };

  const handleDeleteTask = async (projectId: string, taskId: string,) => {
    try {
      const filteredTasks = state.projects.find(p => p.id === projectId)?.tasks.filter(task => task.id !== taskId);

      const result = await fetchData({
        url: `http://localhost:3001/Projects/${projectId}`,
        method: 'PATCH',
        body: { tasks: filteredTasks },
        onError: (err) => {
          alert('Error al eliminar la tarea: ' + err.message);
        },
      });

      if (result) {
        dispatch({ type: 'DELETE_TASK', payload: { projectId, taskId } });
        alert('🗑️ Tarea eliminada correctamente');
      }
    } catch (error) {
      console.error('❌ Error en la conexión:', error);
      alert('Error de conexión al eliminar la tarea');
    }
  };



  return { handleChange, filterTasks, handleAddProject, handleEditProject, handleDeleteProject, handleChangeTask, handleAddTask, handleEditTask, handleDeleteTask }
}

