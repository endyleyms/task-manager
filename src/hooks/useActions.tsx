import { useProjects, type Task } from "../context/ProjectContextType";


export function useActions() {
  const { dispatch } = useProjects();
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
  return { handleChange, filterTasks }
}

