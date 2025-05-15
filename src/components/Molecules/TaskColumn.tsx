import Typography from "../Atom/Typography";
import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export default function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div className="flex flex-col w-full items-center bg-gray-100 rounded-lg shadow-md min-h-[250px] lg:min-h-[400px] gap-4">
      <Typography text={title} tag="h2" color="blue" />
      <div className="w-full h-full flex lg:flex-col gap-4 overflow-auto lg:w-[80%]">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
