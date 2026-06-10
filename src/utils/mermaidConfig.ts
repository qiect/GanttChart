import type { MermaidConfig } from 'mermaid'

export type ChartThemeId = 'indigo' | 'emerald' | 'ocean' | 'obsidian' | 'amber' | 'slate'

export interface ChartThemePreset {
  id: ChartThemeId
  name: string
  swatch: string
  config: MermaidConfig
}

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
    id: 'indigo',
    name: '靛蓝',
    swatch: '#6366f1',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#6366f1',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#4f46e5',
        lineColor: '#c7d2fe',
        secondaryColor: '#eef2ff',
        tertiaryColor: '#e0e7ff',
        background: '#fafaff',
        mainBkg: '#6366f1',
        nodeBorder: '#4f46e5',
        clusterBkg: '#eef2ff',
        clusterBorder: '#c7d2fe',
        titleColor: '#312e81',
        edgeLabelBackground: '#eef2ff',
        nodeTextColor: '#3730a3',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'emerald',
    name: '翡翠',
    swatch: '#10b981',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#10b981',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#059669',
        lineColor: '#a7f3d0',
        secondaryColor: '#ecfdf5',
        tertiaryColor: '#d1fae5',
        background: '#f8fdfb',
        mainBkg: '#10b981',
        nodeBorder: '#059669',
        clusterBkg: '#ecfdf5',
        clusterBorder: '#a7f3d0',
        titleColor: '#064e3b',
        edgeLabelBackground: '#ecfdf5',
        nodeTextColor: '#065f46',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'ocean',
    name: '深海',
    swatch: '#0ea5e9',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#0ea5e9',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#0284c7',
        lineColor: '#bae6fd',
        secondaryColor: '#f0f9ff',
        tertiaryColor: '#e0f2fe',
        background: '#f8fbff',
        mainBkg: '#0ea5e9',
        nodeBorder: '#0284c7',
        clusterBkg: '#f0f9ff',
        clusterBorder: '#bae6fd',
        titleColor: '#0c4a6e',
        edgeLabelBackground: '#f0f9ff',
        nodeTextColor: '#075985',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'obsidian',
    name: '黑曜',
    swatch: '#8b5cf6',
    config: {
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#0f0f1a',
        primaryColor: '#8b5cf6',
        primaryTextColor: '#ede9fe',
        primaryBorderColor: '#7c3aed',
        lineColor: '#4c1d95',
        secondaryColor: '#1e1b4b',
        tertiaryColor: '#1a1730',
        mainBkg: '#8b5cf6',
        nodeBorder: '#7c3aed',
        clusterBkg: '#1e1b4b',
        clusterBorder: '#4c1d95',
        titleColor: '#c4b5fd',
        edgeLabelBackground: '#1e1b4b',
        nodeTextColor: '#c4b5fd',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'amber',
    name: '琥珀',
    swatch: '#f59e0b',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#f59e0b',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#d97706',
        lineColor: '#fde68a',
        secondaryColor: '#fffbeb',
        tertiaryColor: '#fef3c7',
        background: '#fffefb',
        mainBkg: '#f59e0b',
        nodeBorder: '#d97706',
        clusterBkg: '#fffbeb',
        clusterBorder: '#fde68a',
        titleColor: '#78350f',
        edgeLabelBackground: '#fffbeb',
        nodeTextColor: '#92400e',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'slate',
    name: '石墨',
    swatch: '#64748b',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#64748b',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#475569',
        lineColor: '#cbd5e1',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#f1f5f9',
        background: '#fafbfc',
        mainBkg: '#64748b',
        nodeBorder: '#475569',
        clusterBkg: '#f8fafc',
        clusterBorder: '#cbd5e1',
        titleColor: '#1e293b',
        edgeLabelBackground: '#f8fafc',
        nodeTextColor: '#334155',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
]

export const getMermaidConfig = (chartTheme: ChartThemeId): MermaidConfig => {
  const preset = chartThemePresets.find(p => p.id === chartTheme) || chartThemePresets[0]
  return preset.config
}

// Legacy support
export const getMermaidConfigByAppTheme = (theme: 'light' | 'dark'): MermaidConfig => {
  return theme === 'dark' ? chartThemePresets[3].config : chartThemePresets[0].config
}
