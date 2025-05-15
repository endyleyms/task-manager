import TaskColumn from "../Molecules/TaskColumn";

const tasks: {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}[] = [
    {
      id: "1",
      title: "Llamar al cliente",
      description: "Confirmar reunión",
      dueDate: "2025-05-20",
      status: "pending",
      priority: "medium",
    },
    {
      id: "2",
      title: "Enviar informe",
      dueDate: "2025-05-15",
      status: "completed",
      priority: "high",
    },
    {
      id: "3",
      title: "Revisar presupuesto",
      status: "pending",
      priority: "low",
    },
  ];

export default function Board() {
  const pending = tasks.filter((t) => t.status === "pending");
  const completed = tasks.filter((t) => t.status === "completed");

  return (
    <div className="flex gap-6 overflow-auto w-[90%]">
      <TaskColumn title="Pending" tasks={pending} />
      <TaskColumn title="Completed" tasks={completed} />
      <TaskColumn title="All" tasks={tasks} />
    </div>
  );
}
