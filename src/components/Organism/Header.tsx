import Typography from '../Atom/Typography';
import ButtonUi from '../Atom/ButtonUi';
import { useState } from 'react';
import Select from './Select';
import type { Project } from '../../context/ProjectContextType';

interface props {
  onEdit: () => void,
  onNewTask: () => void,
  project: Project

}

export default function Header({ onEdit, onNewTask, project }: props) {
  const [filter, setFilter] = useState("");


  const options = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Alta", value: "alta" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
    { label: "Earliest", value: "earliest" },
    { label: "Latest", value: "latest" },
  ];

  return (
    <header className="w-full h-[50px] bg-white shadow-md flex items-center justify-between px-0">
      <div className="w-full flex items-center justify-evenly">
        <Typography
          text={project.name ?? "Proyecto"}
          tag="h2"
          className="text-lg font-semibold text-gray-800"
        />
        <div className="flex items-center gap-4 w-[25%]">
          <div className="flex gap-2 w-full">
            <ButtonUi
              onClick={onEdit}
              title="Edit"
              type="secondary"
            />
            <ButtonUi
              onClick={onNewTask}
              title="New Task"
              type="secondary"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800"
            />
          </div>

          {/* Filtro */}
          <Select
            label="Filter"
            value={filter}
            options={options}
            onChange={(val) => setFilter(val)}
          />
        </div>
      </div>
    </header>

  );
}
