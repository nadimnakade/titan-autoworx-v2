export interface Service {
  id: string
  title: string
  description: string
  icon: string
  metrics: Record<string, string>
}

export interface ProcessStep {
  step: string
  title: string
  duration: string
  description: string
}

export interface ShowcaseItem {
  id: string
  title: string
  subtitle: string
  category: string
  year: string
  power: string
  description: string
}

export interface Stat {
  label: string
  value: string
  suffix: string
}

export interface MousePosition {
  x: number
  y: number
  clientX: number
  clientY: number
}

export interface ScrollProgress {
  progress: number
  direction: 'up' | 'down'
}
