import InputUi from "../Atom/InputUi";
import ButtonUi from "../Atom/ButtonUi"
import { useProjects } from "../../context/ProjectContextType";
import { useActions } from "../../hooks/useActions";


interface Props {
  action: () => void;
  onClose: () => void;
  type?: 'Create' | 'Edit' | 'Delete'
}

export default function CrudProject({ action, onClose, type = 'Edit' }: Props) {
  const { state } = useProjects();
  const { handleChange } = useActions();

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800" style={{ padding: '20px' }}>
      <form className="flex flex-col gap-4">
        {type !== 'Delete' &&
          <InputUi
            name={state.value}
            placeholder="Enter your value"
            value={state.value}
            onChange={handleChange}
          />
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
  )
}
