import Typography from '../Atom/Typography';
import ButtonUi from '../Atom/ButtonUi';
import { useState } from 'react';
import Select from './Select';
import type { Project } from '../../context/ProjectContextType';
import Modal from './Modal';
import CrudProject from '../Molecules/CrudProject';
import CrudTask from '../Molecules/Crudtask';
import { useActions } from '../../hooks/useActions';

interface props {
  project: Project;
  filter: string;
  setFilter: (val: string) => void;

}

export default function Header({ project, filter, setFilter }: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTask, setIsModalOpenTask] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { handleEditProject, handleDeleteProject } = useActions();

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
        <div className="flex items-center gap-4 w-[30%]">
          <div className="flex gap-2 w-full">
            <ButtonUi
              title="Edit"
              type="secondary"
              onClick={() => setIsModalOpen(true)}
            />
            <ButtonUi
              title="Delete"
              type="secondary"
              onClick={() => setModalDelete(true)}
            />
            <ButtonUi
              onClick={() => setIsModalOpenTask(true)}
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
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Project">
        <CrudProject onClose={() => setIsModalOpen(false)} type="Edit" action={() => handleEditProject(project.id)} />
      </Modal>
      <Modal isOpen={modalDelete} onClose={() => setModalDelete(false)} title="Delete Project">
        <CrudProject onClose={() => setModalDelete(false)} type="Delete" action={() => handleDeleteProject(project.id)} />
      </Modal>

      <Modal isOpen={isModalOpenTask} onClose={() => setIsModalOpenTask(false)} title="New Task">
        <CrudTask onClose={() => setIsModalOpenTask(false)} type="Create" />
      </Modal>
    </header>

  );
}
