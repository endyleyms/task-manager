import InputUi from "../Atom/InputUi";
import ButtonUi from "../Atom/ButtonUi";
import { useState } from "react";
import { useActions } from "../../hooks/useActions";

interface Props {
  onClose: () => void;
  type?: 'Create' | 'Edit' | 'Delete';
}

export default function CrudTask({ onClose, type = 'Create' }: Props) {
  const { handleChange } = useActions();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
  });

  const handleChanges = (field: string, value: string) => {
    setTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Task to submit:", task);
    // Aquí podrías hacer el dispatch o llamar a una función para enviar esta tarea
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800" style={{ padding: '20px' }}>
      <form className="flex flex-col gap-4">
        {type !== 'Delete' &&
          <>
            <InputUi
              name="title"
              placeholder="Title"
              value={task.title}
              onChange={handleChange} />
            <InputUi
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange} />
            <InputUi
              name="dueDate"
              type="date"
              placeholder="Due Date"
              value={task.dueDate}
              onChange={handleChange} />
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={task.status}
              onChange={(e) => handleChanges("status", e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={task.priority}
              onChange={(e) => handleChanges("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </>
        }

        <div className="flex justify-end gap-2">
          <ButtonUi
            title={type}
            onClick={handleSubmit}
            type="secondary"
          />
          <ButtonUi
            title="Cancel"
            onClick={onClose}
            type="outline"
          />
        </div>
      </form>
    </div>
  );
}
