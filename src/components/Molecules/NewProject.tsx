
export default function NewProject() {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg dark:bg-gray-800">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del proyecto</label>
          <input
            type="text"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:text-white"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
