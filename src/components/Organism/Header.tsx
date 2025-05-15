import { useState } from 'react';
import Modal from './Modal';
import Select from './Select';
import ButtonUi from '../Atom/ButtonUi';
import Typography from '../Atom/Typography';
import CrudTask from '../Molecules/Crudtask';
import CrudProject from '../Molecules/CrudProject';
import { useActions } from '../../hooks/useActions';
import type { Project } from '../../context/ProjectContextType';

interface props {
  project: Project;
  filter: string;
  setFilter: (val: string) => void;

}

export default function Header({ project, filter, setFilter }: props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTask, setIsModalOpenTask] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { handleEditProject, handleDeleteProject, handleAddTask } = useActions();

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
    <header className="w-full bg-white shadow-md relative">
      <div className="h-[50px] px-4 flex items-center justify-evenly">
        <Typography
          text={project.name ?? "Proyecto"}
          tag="h2"
          className="text-lg font-semibold text-gray-800"
        />

        {/* Botones Desktop */}
        <div className="hidden md:flex items-center gap-4 w-[50%]">
          <ButtonUi title="Edit" type="secondary" onClick={() => setIsModalOpen(true)} />
          <ButtonUi title="Delete" type="secondary" onClick={() => setModalDelete(true)} />
          <ButtonUi title="New Task" type="secondary" onClick={() => setIsModalOpenTask(true)} />
          <Select
            label="Filter"
            value={filter}
            options={options}
            onChange={(val) => setFilter(val)}
          />
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú mobile desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white shadow-md flex flex-col gap-3 z-10">
          <ButtonUi title="Edit" type="secondary" onClick={() => setIsModalOpen(true)} />
          <ButtonUi title="Delete" type="secondary" onClick={() => setModalDelete(true)} />
          <ButtonUi title="New Task" type="secondary" onClick={() => setIsModalOpenTask(true)} />
          <Select
            label="Filter"
            value={filter}
            options={options}
            onChange={(val) => setFilter(val)}
          />
        </div>
      )}

      {/* Modales */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Project">
        <CrudProject onClose={() => setIsModalOpen(false)} type="Edit" action={() => handleEditProject(project.id)} />
      </Modal>
      <Modal isOpen={modalDelete} onClose={() => setModalDelete(false)} title="Delete Project">
        <CrudProject onClose={() => setModalDelete(false)} type="Delete" action={() => handleDeleteProject(project.id)} />
      </Modal>
      <Modal isOpen={isModalOpenTask} onClose={() => setIsModalOpenTask(false)} title="New Task">
        <CrudTask onClose={() => setIsModalOpenTask(false)} type="Create" action={() => handleAddTask(project.id)} />
      </Modal>
    </header>


  );
}
