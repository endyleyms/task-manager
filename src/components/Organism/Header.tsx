// components/organisms/Header.tsx
import Typography from '../Atom/Typography';
import ButtonUi from '../Atom/ButtonUi';

export default function Header({ onEdit, onNewTask }: { onEdit: () => void, onNewTask: () => void }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
      <Typography text="Mi Proyecto" />
      <div className="min-h-screen bg-greenCustom-600 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">¡Hola Tailwind verde!</h1>
      </div>
      <div className="flex gap-2">
        <ButtonUi onClick={onEdit} label="Editar" />
        <ButtonUi onClick={onNewTask} label="Nueva tarea" />
      </div>
    </header>
  );
}
