import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'

// 粒子类（亮色粒子，适配深色背景，修复TS类型错误）
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    // 亮色粒子，在深色背景上更明显
    this.color = `rgba(147, 197, 253, ${Math.random() * 0.8 + 0.2})`
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX
    this.y += this.speedY

    // 边界反弹
    if (this.x < 0 || this.x > canvasWidth) this.speedX = -this.speedX
    if (this.y < 0 || this.y > canvasHeight) this.speedY = -this.speedY
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function App() {
  useEffect(() => {
    const canvas = document.getElementById('bgCanvas') as HTMLCanvasElement | null
    if (!canvas) return // 非空断言，TS直接放行

    const ctx = canvas.getContext('2d')
    if (!ctx) return // 关键：先判断ctx不为null，再执行后续代码

    // 设置画布尺寸
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 创建粒子数组
    const particlesArray: Particle[] = []
    const numberOfParticles = 100

    const init = () => {
      particlesArray.length = 0
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height))
      }
    }
    init()

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx) // 此时ctx已100%非空，TS不再报错

        // 粒子连线效果
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.2 - distance / 500})`
            ctx.lineWidth = 1
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(animate)
    }
    animate()

    // 清理事件监听
    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
        {/* 背景画布 */}
        <canvas
          id="bgCanvas"
          className="fixed top-0 left-0 w-full h-full -z-10"
          style={{ pointerEvents: 'none' }}
        />

        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App