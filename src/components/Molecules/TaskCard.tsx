import { useState } from "react";
import ButtonUi from "../Atom/ButtonUi";
import Typography from "../Atom/Typography";
import Modal from "../Organism/Modal";
import CrudTask from "./Crudtask";

type Status = "pending" | "completed";
type Priority = "low" | "medium" | "high";

interface props {
  title: string;
  description?: string;
  dueDate?: string; // Formato: 'YYYY-MM-DD'
  status: Status;
  priority: Priority;
}

const getStatusColor = (status: Status) =>
  status === "completed" ? "text-green-600" : "text-yellow-500";

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "low":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "high":
      return "text-red-500";
    default:
      return "";
  }
};

export default function TaskCard({ title, description, dueDate, status, priority }: props) {

  const [isModalOpenTask, setIsModalOpenTask] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-[300px] h-[170px] border border-gray-100  flex flex-col justify-between hover:shadow-xl transition-shadow" style={{ padding: '10px' }}>
      <div>
        <Typography
          text={title}
          tag="h3"
          className="text-lg font-semibold text-indigo-700 mb-1"
        />
        {description && (
          <Typography
            text={description}
            className="text-sm text-gray-600 mb-2"
          />
        )}

        {dueDate && (
          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-500">Due:</span> {dueDate}
          </p>
        )}
      </div>

      <div className="flex items-center justify-evenly mt-2">
        <span className={`text-sm font-semibold capitalize ${getStatusColor(status)}`}>
          {status}
        </span>
        <span className={`text-sm font-semibold capitalize ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center justify-evenly mt-2 w-2/3 gap-3">
          <ButtonUi
            onClick={() => setIsModalOpenTask(true)}
            title="Edit"
            type="secondary"
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
          />
          <ButtonUi
            onClick={() => setDeleteModal(true)}
            title="Delete"
            type="outline"
            className="text-red-500 border-red-400 hover:bg-red-50"
          />
        </div>
      </div>

      <Modal isOpen={isModalOpenTask} onClose={() => setIsModalOpenTask(false)} title="Edit Task">
        <CrudTask onClose={() => setIsModalOpenTask(false)} type="Edit" />
      </Modal>
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Task">
        <CrudTask onClose={() => setDeleteModal(false)} type="Delete" />
      </Modal>
    </div>


  );
}
