import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

// 最大支持多少张图，你可以改大一点，比如 30
const MAX_PAGES = 30

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (!project) return
    let count = 0

    // 自动检测有多少张图
    const checkImage = (index: number) => {
      const img = new Image()
      img.src = `/src/assets/project${project.id}-${index}.png`

      img.onload = () => {
        count++
        if (index < MAX_PAGES) checkImage(index + 1)
        else setTotalPages(count)
      }

      img.onerror = () => {
        setTotalPages(count)
      }
    }

    checkImage(1)
  }, [project])

  if (!project) {
    return <div className="p-10 text-center text-white">项目不存在</div>
  }

  // 所有项目统一：全屏 + 小间距
  const containerClass = 'w-full px-0 pt-20'
  const imageGap = 'gap-5'

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 shadow-sm px-4 py-4 h-16 flex items-center gap-4 border-b border-slate-700">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1.5 border border-slate-600 rounded-md text-sm text-white hover:bg-slate-700 transition"
        >
          ← 返回作品集
        </button>
        <h2 className="text-sm font-medium text-slate-300">项目详情</h2>
      </header>

      <div className={containerClass}>
        <div className="mx-auto px-4 mb-10 max-w-full">
          <h1 className="text-2xl font-bold text-white">{project.title}</h1>
          <p className="text-slate-400 mt-1">1920×自适应 · {totalPages}页设计稿</p>
          <p className="text-slate-300 mt-3">{project.desc}</p>
        </div>

        <div className={`flex flex-col ${imageGap}`}>
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1
            return (
              <div
                key={pageNum}
                className="opacity-0 translate-y-4 animate-fadeIn"
                style={{ animationDelay: `${pageNum * 0.1}s` }}
              >
                <img
                  src={`/src/assets/project${project.id}-${pageNum}.png`}
                  alt={`${project.title} 第${pageNum}页`}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}