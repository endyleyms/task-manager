// components/organisms/Header.tsx
import Typography from '../Atom/Typography';
import ButtonUi from '../Atom/ButtonUi';
import { useState } from 'react';
import Select from './Select';

interface props {
  onEdit: () => void,
  onNewTask: () => void

}

export default function Header({ onEdit, onNewTask }: props) {
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
        <Typography text="Project 1" tag="h2" color="black" />
        <div className="flex gap-3 w-[10%]">
          <ButtonUi onClick={onEdit} title="Edit" />
          <ButtonUi onClick={onNewTask} title="Nueva" type="secondary" />
        </div>
        <Select
          label="Filter"
          value={filter}
          options={options}
          onChange={(val) => setFilter(val)}
        />
      </div>
    </header>
  );
}
