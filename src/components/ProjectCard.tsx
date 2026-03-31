import { useNavigate } from 'react-router-dom'

interface Project {
  id: string
  title: string
  category: string
  imageUrl: string
  desc: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/project/${project.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      {/* 卡片封面：等比展示，用项目第一张图 */}
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      {/* 卡片内容 */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${project.category === 'APP' ? 'bg-blue-100 text-blue-800' :
              project.category === '网页端' ? 'bg-green-100 text-green-800' :
              project.category === '动效' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'}`}
          >
            {project.category}
          </span>
        </div>
        <p className="text-gray-600 line-clamp-3">{project.desc}</p>
      </div>
    </div>
  )
}