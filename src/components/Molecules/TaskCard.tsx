import ButtonUi from "../Atom/ButtonUi";
import Typography from "../Atom/Typography";

type Status = "pending" | "completed";
type Priority = "low" | "medium" | "high";

interface props {
  title: string;
  description?: string;
  dueDate?: string; // Formato: 'YYYY-MM-DD'
  status: Status;
  priority: Priority;
  onEdit?: () => void;
  onDelete?: () => void;
}

const getStatusColor = (status: Status) =>
  status === "completed" ? "text-green-600" : "text-yellow-600";

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "low":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "high":
      return "text-red-500";
    default:
      return "";
  }
};

export default function TaskCard({
  title,
  description,
  dueDate,
  status,
  priority,
  onEdit,
  onDelete,
}: props) {
  return (
    <div className="bg-white rounded-xl shadow-md w-[310px] h-[150px] border border-gray-200 flex flex-col gap-4 items-center">
      <div className="w-full">
        <Typography text={title} tag="h3" color="indigo" />

        {description && <Typography text={description} color="blue" />}

        {dueDate && (
          <p className="text-sm text-gray-500 mb-1">
            <span className="font-medium">Due:</span> {dueDate}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 mt-2">
          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>

          <span className={`text-sm font-medium ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center" >
        <div className="flex w-1/2 justify-center items-center  gap-2">
          <ButtonUi onClick={onEdit} title="Edit" type="secondary" />
          <ButtonUi onClick={onDelete} title="Delete" type="outline" />
        </div>
      </div>
    </div>

  );
}
