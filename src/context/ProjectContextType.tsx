import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
  useReducer,
} from "react";
import { useApi } from "../hooks/useApi";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

type State = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: State = {
  projects: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

interface ProjectContextType {
  state: State;
  refreshProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchData } = useApi<Project[]>();

  const getProjects = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    const response = await fetchData({
      url: "http://localhost:3001/Projects",
      method: "GET",
      onError: (err) => {
        dispatch({ type: "SET_ERROR", payload: err.message });
      },
    });

    if (response) {
      dispatch({ type: "SET_PROJECTS", payload: response });
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ state, refreshProjects: getProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de ProjectProvider");
  }
  return context;
};
