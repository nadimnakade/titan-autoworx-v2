import { useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import Navigation from './components/ui/Navigation'
import Preloader from './components/ui/Preloader'
import CustomCursor from './components/ui/CustomCursor'
import Scene01_TheTitanAwakens from './components/scenes/Scene01_TheTitanAwakens'
import Scene02_CapabilityMatrix from './components/scenes/Scene02_CapabilityMatrix'
import Scene03_WorkshopEcosystem from './components/scenes/Scene03_WorkshopEcosystem'
import Scene04_TheMachinesWeBuild from './components/scenes/Scene04_TheMachinesWeBuild'
import Scene05_EngineeringProcess from './components/scenes/Scene05_EngineeringProcess'
import Scene06_TheTitanNetwork from './components/scenes/Scene06_TheTitanNetwork'
import Footer from './components/ui/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [isLoading])

  return (
    <div className="bg-titan-void min-h-screen">
      <CustomCursor />

      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {!isLoading && (
        <>
          <Navigation />

          <main>
            <Scene01_TheTitanAwakens />
            <Scene02_CapabilityMatrix />
            <Scene03_WorkshopEcosystem />
            <Scene04_TheMachinesWeBuild />
            <Scene05_EngineeringProcess />
            <Scene06_TheTitanNetwork />
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}

export default App
