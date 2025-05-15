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
  dueDate: string;
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
  value: string
};

type Action =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'NEW_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string };

const initialState: State = {
  projects: [],
  loading: false,
  error: null,
  value: ''
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case 'SET_INPUT':
      return { ...state, value: action.payload };
    case 'NEW_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.id ? action.payload : proj
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };
    default:
      return state;
  }
}

interface ProjectContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
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
    <ProjectContext.Provider value={{ state, dispatch, refreshProjects: getProjects }}>
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
