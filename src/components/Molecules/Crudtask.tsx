import InputUi from "../Atom/InputUi";
import ButtonUi from "../Atom/ButtonUi";
import { useActions } from "../../hooks/useActions";
import { useProjects } from "../../context/ProjectContextType";

interface Props {
  onClose: () => void;
  action: () => void;
  type?: 'Create' | 'Edit' | 'Delete';
}

export default function CrudTask({ onClose, type = 'Create', action }: Props) {
  const { state } = useProjects();
  const { handleChangeTask } = useActions();


  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800" style={{ padding: '20px' }}>
      <form className="flex flex-col gap-4">
        {type !== 'Delete' &&
          <>
            <InputUi
              name="title"
              placeholder="Title"
              value={state.title}
              onChange={(value) => handleChangeTask('title', value)} />
            <InputUi
              name="description"
              placeholder="Description"
              value={state.description}
              onChange={(value) => handleChangeTask('description', value)} />
            <InputUi
              name="dueDate"
              type="date"
              placeholder="Due Date"
              value={state.dueDate}
              onChange={(value) => handleChangeTask('dueDate', value)} />
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={state.status}
              onChange={(value) => handleChangeTask('status', value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={state.priority}
              onChange={(value) => handleChangeTask('priority', value)}
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
            onClick={action}
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
