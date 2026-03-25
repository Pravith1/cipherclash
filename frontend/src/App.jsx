import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import RegistrationForm from './components/RegistrationForm'
import SuccessPage from './pages/SuccessPage'

function App() {
  const [registrationData, setRegistrationData] = useState(null)
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafId   = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const onEnter = (e) => {
      if (e.target.closest('a,button,select,input,[role="button"]'))
        document.body.classList.add('cursor-hover')
    }
    const onLeave = () => document.body.classList.remove('cursor-hover')

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13
      rng.style.left = ring.current.x + 'px'
      rng.style.top  = ring.current.y + 'px'
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout',  onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout',  onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const handleSuccess = (data) => {
    setRegistrationData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Custom cursor elements */}
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />

      {registrationData ? (
        <SuccessPage data={registrationData} onReset={() => setRegistrationData(null)} />
      ) : (
        <div>
          <Navbar />
          <HeroSection />
          <RegistrationForm onSuccess={handleSuccess} />
        </div>
      )}
    </>
  )
}

export default App
