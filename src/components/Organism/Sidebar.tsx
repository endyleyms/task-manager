import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-greenCustom-900 text-greenCustom-900 fixed top-0 left-0 p-4 flex flex-col gap-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">My Task Manager</h1>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:bg-greenCustom-600 px-3 py-2 rounded">Project 1</Link>
        <Link to="/login" className="hover:bg-greenCustom-600 px-3 py-2 rounded">Project 2</Link>
        <Link to="/chat" className="hover:bg-greenCustom-600 px-3 py-2 rounded">Project 3</Link>
      </nav>
    </div>
  );
}
