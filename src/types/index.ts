export type TemplateCategory = 'software' | 'business' | 'engineering' | 'life' | 'education'

export interface GanttTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  icon: string
  code: string
}

export interface ExportOptions {
  format: 'png' | 'svg' | 'pdf'
  quality: number
  scale: number
  backgroundColor: string
}

export interface GanttTask {
  id: string
  name: string
  section: string
  startDate: string
  duration: string
  status: 'active' | 'done' | 'crit' | 'milestone' | ''
  dependsOn: string
}

export interface GanttSection {
  name: string
  tasks: GanttTask[]
}

export type ChartThemeId = 'aizuri' | 'cedar' | 'lagoon' | 'obsidian' | 'cinnabar' | 'platinum'

export interface AppState {
  code: string
  theme: 'light' | 'dark'
  splitRatio: number
  activeTemplate: string | null
  editorMode: 'code' | 'visual'
  chartTheme: ChartThemeId
}
