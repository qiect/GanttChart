import type { MermaidConfig } from 'mermaid'

export type ChartThemeId = 'aizuri' | 'cedar' | 'lagoon' | 'obsidian' | 'cinnabar' | 'platinum'

export interface ChartThemePreset {
  id: ChartThemeId
  name: string
  swatch: string
  config: MermaidConfig
}

export const dateFormatOptions = [
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' },
]

const baseGanttConfig = {
  titleTopMargin: 25,
  barHeight: 24,
  barGap: 6,
  topPadding: 50,
  leftPadding: 200,
  gridLineStartPadding: 35,
  fontSize: 12,
  sectionFontSize: 13,
  numberSectionStyles: 4,
  axisFormat: '%Y-%m-%d',
  useWidth: 1200,
}

export const chartThemePresets: ChartThemePreset[] = [
  {
    // 靛青 — Japanese aizuri woodblock print aesthetic
    // Deep indigo with warm periwinkle undertones on cream parchment
    id: 'aizuri',
    name: '靛青',
    swatch: '#4338ca',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#4338ca',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#3730a3',
        lineColor: '#c7d2fe',
        secondaryColor: '#f0f0f8',
        tertiaryColor: '#e4e4f2',
        background: '#f7f7fc',
        mainBkg: '#4338ca',
        nodeBorder: '#3730a3',
        clusterBkg: '#f0f0f8',
        clusterBorder: '#c7d2fe',
        titleColor: '#1e1b4b',
        edgeLabelBackground: '#f0f0f8',
        nodeTextColor: '#312e81',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#4338ca',
        cScale1: '#6366f1',
        cScale2: '#8b5cf6',
        cScale3: '#a78bfa',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
  {
    // 松柏 — Aged cedar forest aesthetic
    // Muted sage with golden warmth on warm parchment
    id: 'cedar',
    name: '松柏',
    swatch: '#2d7a5f',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#2d7a5f',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#1f5e47',
        lineColor: '#b7d9c8',
        secondaryColor: '#f4f8f5',
        tertiaryColor: '#e6efe9',
        background: '#f8faf8',
        mainBkg: '#2d7a5f',
        nodeBorder: '#1f5e47',
        clusterBkg: '#f4f8f5',
        clusterBorder: '#b7d9c8',
        titleColor: '#14332a',
        edgeLabelBackground: '#f4f8f5',
        nodeTextColor: '#1a4a3a',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#2d7a5f',
        cScale1: '#3d9970',
        cScale2: '#5bb88e',
        cScale3: '#8bcbaa',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
  {
    // 碧波 — Tropical lagoon bioluminescence
    // Teal-cerulean with aquamarine shimmer on cool mist
    id: 'lagoon',
    name: '碧波',
    swatch: '#0891b2',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#0891b2',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#0e7490',
        lineColor: '#a5f3fc',
        secondaryColor: '#f0fafa',
        tertiaryColor: '#e0f5f5',
        background: '#f5fbfb',
        mainBkg: '#0891b2',
        nodeBorder: '#0e7490',
        clusterBkg: '#f0fafa',
        clusterBorder: '#a5f3fc',
        titleColor: '#083344',
        edgeLabelBackground: '#f0fafa',
        nodeTextColor: '#155e75',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#0891b2',
        cScale1: '#06b6d4',
        cScale2: '#22d3ee',
        cScale3: '#67e8f9',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
  {
    // 黑曜 — Volcanic obsidian dark mode
    // Electric violet with rose accents on deep space
    id: 'obsidian',
    name: '黑曜',
    swatch: '#8b5cf6',
    config: {
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#0c0c18',
        primaryColor: '#8b5cf6',
        primaryTextColor: '#ede9fe',
        primaryBorderColor: '#7c3aed',
        lineColor: '#3b1f7a',
        secondaryColor: '#1a1030',
        tertiaryColor: '#150d28',
        mainBkg: '#8b5cf6',
        nodeBorder: '#7c3aed',
        clusterBkg: '#1a1030',
        clusterBorder: '#3b1f7a',
        titleColor: '#ddd6fe',
        edgeLabelBackground: '#1a1030',
        nodeTextColor: '#c4b5fd',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#8b5cf6',
        cScale1: '#a78bfa',
        cScale2: '#c084fc',
        cScale3: '#e879f9',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
  {
    // 朱砂 — Chinese lacquerware aesthetic
    // Vermillion-cinnabar with amber warmth on warm ivory
    id: 'cinnabar',
    name: '朱砂',
    swatch: '#c2410c',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#c2410c',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#9a3412',
        lineColor: '#fed7aa',
        secondaryColor: '#fef7f0',
        tertiaryColor: '#fdecd8',
        background: '#fdf9f5',
        mainBkg: '#c2410c',
        nodeBorder: '#9a3412',
        clusterBkg: '#fef7f0',
        clusterBorder: '#fed7aa',
        titleColor: '#431407',
        edgeLabelBackground: '#fef7f0',
        nodeTextColor: '#7c2d12',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#c2410c',
        cScale1: '#ea580c',
        cScale2: '#f59e0b',
        cScale3: '#fbbf24',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
  {
    // 铂金 — Brushed platinum metal aesthetic
    // Cool steel with lavender mist on silver-white
    id: 'platinum',
    name: '铂金',
    swatch: '#5b5f73',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#5b5f73',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#464958',
        lineColor: '#c8cad4',
        secondaryColor: '#f5f5f9',
        tertiaryColor: '#eaeaf0',
        background: '#f9f9fc',
        mainBkg: '#5b5f73',
        nodeBorder: '#464958',
        clusterBkg: '#f5f5f9',
        clusterBorder: '#c8cad4',
        titleColor: '#1c1e2a',
        edgeLabelBackground: '#f5f5f9',
        nodeTextColor: '#363848',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
        cScale0: '#5b5f73',
        cScale1: '#7c7f96',
        cScale2: '#9d9fb5',
        cScale3: '#b8bad0',
      },
      gantt: { ...baseGanttConfig, taskTextColor: '#ffffff' },
      securityLevel: 'loose',
    },
  },
]

export const getMermaidConfig = (chartTheme: ChartThemeId, axisFormat?: string): MermaidConfig => {
  const preset = chartThemePresets.find(p => p.id === chartTheme) || chartThemePresets[0]
  const config = { ...preset.config }
  if (axisFormat && config.gantt) {
    config.gantt = { ...config.gantt, axisFormat }
  }
  return config
}

// Legacy support
export const getMermaidConfigByAppTheme = (theme: 'light' | 'dark'): MermaidConfig => {
  return theme === 'dark' ? chartThemePresets[3].config : chartThemePresets[0].config
}
