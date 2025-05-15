import type { Task } from "../../context/ProjectContextType";
import TaskColumn from "../Molecules/TaskColumn";


interface props {
  tasks: Task[];
}

export default function Board({ tasks }: props) {
  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");

  if (tasks.length === 0) {
    return (
      <div className="w-[90%] text-center text-gray-500 py-10">
        There are no tasks assigned to this project.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 overflow-auto w-[90%] lg:flex-row">
      <TaskColumn title="Pending" tasks={pending} />
      <TaskColumn title="Completed" tasks={completed} />
      <TaskColumn title="All" tasks={tasks} />
    </div>
  );
}
