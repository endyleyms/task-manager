import InputUi from "../Atom/InputUi";
import ButtonUi from "../Atom/ButtonUi"
import { useProjects } from "../../context/ProjectContextType";
import { useActions } from "../../utils/useActions";
const { state } = useProjects();


interface Props {
  onClose: () => void;
  type?: 'Create' | 'Edit' | 'Delete'
}

export default function CrudProject({ onClose, type = 'Edit' }: Props) {
  const { handleChange } = useActions();

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800" style={{ padding: '20px' }}>
      <form className="flex flex-col gap-4">
        <InputUi
          name={state.value}
          placeholder="Enter your value"
          value={state.value}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <ButtonUi
            title={type}
            onClick={() => console.log(true)}
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
