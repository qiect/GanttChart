import type { MermaidConfig } from 'mermaid'

export const lightConfig: MermaidConfig = {
  startOnLoad: false,
  theme: 'default',
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    sectionFontSize: 11,
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
  },
  securityLevel: 'loose',
}

export const darkConfig: MermaidConfig = {
  ...lightConfig,
  theme: 'dark',
}

export const getMermaidConfig = (theme: 'light' | 'dark'): MermaidConfig => {
  return theme === 'dark' ? darkConfig : lightConfig
}
