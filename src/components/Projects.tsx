import { useState } from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    id: '1',
    title: '智慧环保 APP',
    category: 'APP',
    imageUrl: '/src/assets/project1-1.png',
    desc: '一款面向环保监测的移动端应用，包含数据可视化、告警推送、任务管理等核心功能，设计尺寸 1920×1080。'
  },
  {
    id: '2',
    title: '智慧种植 APP',
    category: 'APP',
    imageUrl: '/src/assets/project2-1.png',
    desc: '面向农户与农业合作社的智慧种植管理工具，支持土壤墒情监测、作物生长预警、施肥灌溉指导。'
  },
  {
    id: '3',
    title: '魔品优聚',
    category: 'APP',
    imageUrl: '/src/assets/project3-1.png',
    desc: '专注摩托车配件垂类电商平台，集商品展示、在线选购、订单管理、商家入驻于一体。'
  },
  {
    id: '4',
    title: '环保综合平台',
    category: '网页端',
    imageUrl: '/src/assets/project4-1.png',
    desc: '面向环保监管与企业运维的综合管理平台，包含数据大屏、污染源监控、工单处置、报表统计。'
  },
  {
    id: '5',
    title: '官网设计',
    category: '网页端',
    imageUrl: '/src/assets/project5-1.png',
    desc: '品牌官方网站定制设计，包含首页、关于我们、产品中心、新闻动态、联系我们等完整模块。'
  },
  {
    id: '6',
    title: 'IP形象设计',
    category: '其他',
    imageUrl: '/src/assets/project6-1.png',
    desc: '品牌IP形象全案设计，包含基础造型、情绪版、应用延展、场景展示、视觉规范等完整内容。'
  }
]

const categories = ['全部', 'APP', '网页端', '动效', '其他']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const filteredProjects = selectedCategory === '全部'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}