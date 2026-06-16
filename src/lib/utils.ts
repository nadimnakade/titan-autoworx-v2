import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export const TITAN_DATA = {
  stats: [
    { label: 'Vehicles Serviced', value: '12,847', suffix: '+' },
    { label: 'Years of Excellence', value: '18', suffix: '+' },
    { label: 'Certified Technicians', value: '34', suffix: '' },
    { label: 'Customer Satisfaction', value: '99.7', suffix: '%' },
  ],
  services: [
    {
      id: 'diagnostics',
      title: 'Advanced Diagnostics',
      description: 'AI-powered vehicle diagnostics with real-time telemetry analysis and predictive maintenance algorithms.',
      icon: 'Cpu',
      metrics: { accuracy: '99.8%', speed: '2.3s', systems: '2,400+' },
    },
    {
      id: 'performance',
      title: 'Performance Engineering',
      description: 'Custom ECU tuning, dyno testing, and power optimization for maximum output and efficiency.',
      icon: 'Gauge',
      metrics: { gain: '+40%', dyno: 'AWD', power: '1,200hp' },
    },
    {
      id: 'restoration',
      title: 'Heritage Restoration',
      description: 'Meticulous restoration of classic vehicles to concours condition with period-correct authenticity.',
      icon: 'Wrench',
      metrics: { projects: '340+', rating: '5.0', awards: '28' },
    },
    {
      id: 'fabrication',
      title: 'Custom Fabrication',
      description: 'Bespoke metalwork, carbon fiber composites, and precision engineering for unique builds.',
      icon: 'Hammer',
      metrics: { materials: '50+', tolerance: '0.01mm', crafts: '100+' },
    },
    {
      id: 'electrical',
      title: 'Electrical Systems',
      description: 'Complete rewiring, custom harnesses, and advanced electronics integration.',
      icon: 'Zap',
      metrics: { voltage: '12V-800V', systems: 'ECU/CAN', protocols: '15+' },
    },
    {
      id: 'aero',
      title: 'Aerodynamic Design',
      description: 'Wind tunnel tested aero packages, diffusers, and downforce optimization.',
      icon: 'Wind',
      metrics: { cd: '0.28', downforce: '+35%', tunnel: 'CFD' },
    },
  ],
  process: [
    {
      step: '01',
      title: 'Intake Analysis',
      duration: '1-2 Days',
      description: 'Comprehensive vehicle assessment with full diagnostic scan, customer consultation, and project scope definition.',
    },
    {
      step: '02',
      title: 'Engineering Blueprint',
      duration: '3-5 Days',
      description: 'Detailed engineering plan with 3D modeling, component mapping, timeline creation, and resource allocation.',
    },
    {
      step: '03',
      title: 'Precision Build',
      duration: '1-8 Weeks',
      description: 'Expert execution with real-time progress tracking, quality checkpoints, and transparent communication.',
    },
    {
      step: '04',
      title: 'Validation & Delivery',
      duration: '2-3 Days',
      description: 'Comprehensive testing, dyno validation, road testing, and detailed handover documentation.',
    },
  ],
  showcase: [
    {
      id: 'gt500',
      title: 'Shelby GT500',
      subtitle: 'Heritage Reborn',
      category: 'Restoration',
      year: '1967',
      power: '750hp',
      description: 'Full concours restoration with modern powertrain integration. Every nut and bolt, reimagined.',
    },
    {
      id: 'rs6',
      title: 'Audi RS6-R',
      subtitle: 'Wolf in Wolf\'s Clothing',
      category: 'Performance',
      year: '2024',
      power: '850hp',
      description: 'Full Stage 3 build with hybrid turbo system, custom intercooler, and E85 flex fuel.',
    },
    {
      id: 'gtr',
      title: 'Nissan GT-R R35',
      subtitle: 'Godzilla Evolved',
      category: 'Performance',
      year: '2023',
      power: '1,200hp',
      description: 'Complete engine rebuild with billet block, twin turbo conversion, and sequential gearbox.',
    },
    {
      id: '911rsr',
      title: 'Porsche 911 RSR',
      subtitle: 'Air-Cooled Legend',
      category: 'Restoration',
      year: '1973',
      power: '310hp',
      description: 'Matching numbers restoration with period-correct RSR specification and FIA compliance.',
    },
  ],
}
