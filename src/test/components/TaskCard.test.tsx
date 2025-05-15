import { queryByText, render, screen } from "@testing-library/react";
import TaskCard from "../../components/Molecules/TaskCard";
import { ProjectProvider } from "../../context/ProjectContextType";
import userEvent from "@testing-library/user-event";


describe("TaskCard component", () => {
  // Mockea las funciones que abren los modales
  const setIsModalOpenTask = jest.fn();
  const setDeleteModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render properly", () => {
    const component = render(
      <ProjectProvider>
        <TaskCard
          id="1"
          title="task"
          description="task1"
          dueDate="14-05-2025"
          status="pending"
          priority="high"
        />
      </ProjectProvider>
    );
    expect(component).toBeDefined();
  });

  it("renders Edit and Delete buttons and opens modals on click", () => {
    render(
      <ProjectProvider>
        <TaskCard
          id="1"
          title="task"
          description="task1"
          dueDate="14-05-2025"
          status="pending"
          priority="high"
        />
      </ProjectProvider>
    );


    const editButton = screen.getByRole("button", { name: 'Edit' });
    const deleteButton = screen.getByRole("button", { name: 'Delete' });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(editButton);
    expect(setIsModalOpenTask).toHaveBeenCalledWith(true);

    userEvent.click(deleteButton);
    expect(setDeleteModal).toHaveBeenCalledWith(true);
  });
});
