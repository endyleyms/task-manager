import { useProjects } from "../context/ProjectContextType";


export function useActions() {
  const { dispatch } = useProjects();
  const handleChange = (value: string) => {
    dispatch({ type: "SET_INPUT", payload: value });
  }
  return { handleChange }
}

