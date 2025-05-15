import { Link } from "react-router-dom";
import Typography from "../Atom/Typography";

interface Project {
  name: string;
  path: string;
}

interface SidebarProps {
  projects?: Project[];
}

export default function Sidebar({ projects }: SidebarProps) {
  const projectList: Project[] = projects?.length
    ? projects
    : [{ name: "🗂️ Project 1", path: "/" }];

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white fixed top-0 left-0 p-8 shadow-xl flex flex-col justify-between border-r border-purple-700 gap-y-10">
      <div className="flex flex-col">
        <div className="mb-10 text-center">
          <Typography
            text="Task Manager"
            tag="h2"
            className="text-2xl font-semibold text-white tracking-wide"
          />
        </div>
        <nav className="flex flex-col gap-3">
          {projectList.map((project, index) => (
            <Link
              key={index}
              to={project.path}
              className="px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {project.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="text-sm text-white text-center">
        © 2025 MyTask
      </div>
    </div>

  );
}
