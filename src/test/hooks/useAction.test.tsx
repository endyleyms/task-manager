import db from '../../../db.json'
import { useActions } from "../../hooks/useActions";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ProjectContext, ProjectContextType, State, Task } from "../../context/ProjectContextType"; // Importa el tipo correcto

const tasks: Task[] = db.Projects[0].tasks as Task[];

// Mock global alert
global.alert = jest.fn();


jest.mock("../../hooks/useApi", () => ({
  useApi: () => ({
    fetchData: jest.fn(() => Promise.resolve({
      id: require('uuid').v4(),
      name: "Proyecto Mock",
      tasks: [],
    })),
  }),
}));


const mockState: State = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  value: "",
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
  priority: "low",
};

const mockDispatch = jest.fn();

const mockContextValue: ProjectContextType = {
  state: mockState,
  dispatch: mockDispatch,
};

const MockProjectProvider = ({ children }: any) => (
  <ProjectContext.Provider value={mockContextValue}>
    {children}
  </ProjectContext.Provider>
);

beforeEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  if (!global.crypto) {
    global.crypto = {} as any;
  }
  global.crypto.randomUUID = () => '123e4567-e89b-12d3-a456-426614174000';
});

describe('useActions test', () => {
  const wrapper = ({ children }: any) => (
    <MockProjectProvider>{children}</MockProjectProvider>
  );

  describe('filterTasks', () => {
    it("filters tasks by 'pending' status correctly", () => {
      const { result } = renderHook(() => useActions(), { wrapper });
      const filtered = result.current.filterTasks(tasks, "pending");

      expect(filtered).toHaveLength(2);
      expect(filtered.every((task) => task.status === "pending")).toBe(true);
    });

    it("filters tasks by 'completed' status correctly", () => {
      const { result } = renderHook(() => useActions(), { wrapper });
      const filtered = result.current.filterTasks(tasks, "completed");

      expect(filtered.every((task) => task.status === "completed")).toBe(true);
    });
  });

  describe('crud project test', () => {
    it("should add new project", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleAddProject();
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("✅ Proyecto creado exitosamente");
      });
    });

    it("should edit project", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleEditProject('123e4567-e89b-12d3-a456-426614174000');
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("✅ Proyecto actualizado correctamente");
      });
    });

    it("should delete project", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleDeleteProject('123e4567-e89b-12d3-a456-426614174000');
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("✅ Proyecto eliminado correctamente");
      });
    });
  });


  describe('crud task test', () => {
    it("should add new project", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleAddTask('123e4567-e89b-12d3-a456-426614174000');
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("✅ Tarea agregada exitosamente");
      });
    });

    it("should edit task", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleEditTask('123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000');
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('✅ Tarea actualizada correctamente');
      });
    });

    it("should delete task", async () => {
      let result: any;

      await act(async () => {
        const hook = renderHook(() => useActions(), { wrapper });
        result = hook.result;

      });

      await act(async () => {
        await result.current.handleDeleteTask('123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000');
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith("🗑️ Tarea eliminada correctamente");
      });
    });
  });
});
