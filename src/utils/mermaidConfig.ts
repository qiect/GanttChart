import type { MermaidConfig } from 'mermaid'

export type ChartThemeId = 'default' | 'forest' | 'ocean' | 'midnight' | 'sunset' | 'minimal'

export interface ChartThemePreset {
  id: ChartThemeId
  name: string
  icon: string
  config: MermaidConfig
}

const baseGanttConfig = {
  titleTopMargin: 25,
  barHeight: 24,
  barGap: 6,
  topPadding: 50,
  leftPadding: 75,
  gridLineStartPadding: 35,
  fontSize: 12,
  sectionFontSize: 13,
  numberSectionStyles: 4,
  axisFormat: '%Y-%m-%d',
}

export const chartThemePresets: ChartThemePreset[] = [
  {
    id: 'default',
    name: '经典',
    icon: '◆',
    config: {
      startOnLoad: false,
      theme: 'default',
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'forest',
    name: '森林',
    icon: '🌿',
    config: {
      startOnLoad: false,
      theme: 'forest',
      gantt: { ...baseGanttConfig },
      securityLevel: 'loose',
    },
  },
  {
    id: 'ocean',
    name: '海洋',
    icon: '🌊',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#1e88e5',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#1565c0',
        lineColor: '#90caf9',
        secondaryColor: '#e3f2fd',
        tertiaryColor: '#bbdefb',
        background: '#f8fbff',
        mainBkg: '#1e88e5',
        nodeBorder: '#1565c0',
        clusterBkg: '#e3f2fd',
        clusterBorder: '#90caf9',
        titleColor: '#0d47a1',
        edgeLabelBackground: '#e3f2fd',
        nodeTextColor: '#0d47a1',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: {
        ...baseGanttConfig,
      },
      securityLevel: 'loose',
    },
  },
  {
    id: 'midnight',
    name: '暗夜',
    icon: '🌙',
    config: {
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#1a1b2e',
        primaryColor: '#7c4dff',
        primaryTextColor: '#e8eaf6',
        primaryBorderColor: '#5c6bc0',
        lineColor: '#5c6bc0',
        secondaryColor: '#283593',
        tertiaryColor: '#1a237e',
        mainBkg: '#7c4dff',
        nodeBorder: '#5c6bc0',
        clusterBkg: '#1a237e',
        clusterBorder: '#3949ab',
        titleColor: '#c5cae9',
        edgeLabelBackground: '#283593',
        nodeTextColor: '#c5cae9',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: {
        ...baseGanttConfig,
      },
      securityLevel: 'loose',
    },
  },
  {
    id: 'sunset',
    name: '暖阳',
    icon: '🌅',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#ff7043',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#e64a19',
        lineColor: '#ffab91',
        secondaryColor: '#fff3e0',
        tertiaryColor: '#ffe0b2',
        background: '#fffaf5',
        mainBkg: '#ff7043',
        nodeBorder: '#e64a19',
        clusterBkg: '#fff3e0',
        clusterBorder: '#ffab91',
        titleColor: '#bf360c',
        edgeLabelBackground: '#fff3e0',
        nodeTextColor: '#bf360c',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: {
        ...baseGanttConfig,
      },
      securityLevel: 'loose',
    },
  },
  {
    id: 'minimal',
    name: '极简',
    icon: '◻',
    config: {
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#455a64',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#37474f',
        lineColor: '#cfd8dc',
        secondaryColor: '#f5f5f5',
        tertiaryColor: '#eceff1',
        background: '#fafafa',
        mainBkg: '#546e7a',
        nodeBorder: '#37474f',
        clusterBkg: '#f5f5f5',
        clusterBorder: '#cfd8dc',
        titleColor: '#263238',
        edgeLabelBackground: '#f5f5f5',
        nodeTextColor: '#37474f',
        fontSize: '12px',
        fontFamily: '"DM Sans", sans-serif',
      },
      gantt: {
        ...baseGanttConfig,
      },
      securityLevel: 'loose',
    },
  },
]

export const getMermaidConfig = (chartTheme: ChartThemeId): MermaidConfig => {
  const preset = chartThemePresets.find(p => p.id === chartTheme) || chartThemePresets[0]
  return preset.config
}

// Legacy support: map app theme to chart theme
export const getMermaidConfigByAppTheme = (theme: 'light' | 'dark'): MermaidConfig => {
  return theme === 'dark' ? chartThemePresets[3].config : chartThemePresets[0].config
}
