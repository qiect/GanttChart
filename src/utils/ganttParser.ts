import type { GanttTask, GanttSection } from '../types'

/**
 * Parse Mermaid gantt code into structured sections and tasks
 */
export function parseMermaidGantt(code: string): GanttSection[] {
  const lines = code.split('\n')
  const sections: GanttSection[] = []
  let currentSection: GanttSection | null = null

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('title ') || trimmed.startsWith('dateFormat ') || trimmed.startsWith('axisFormat ')) {
      continue
    }

    if (trimmed.startsWith('section ')) {
      currentSection = { name: trimmed.replace('section ', ''), tasks: [] }
      sections.push(currentSection)
      continue
    }

    if (!trimmed || trimmed.startsWith('%') || trimmed === 'gantt') continue

    // Parse task line: name :status, id, start, duration
    if (currentSection) {
      const task = parseTaskLine(trimmed)
      if (task) {
        currentSection.tasks.push(task)
      }
    }
  }

  return sections
}

function parseTaskLine(line: string): GanttTask | null {
  const colonIdx = line.indexOf(':')
  if (colonIdx === -1) return null

  const name = line.substring(0, colonIdx).trim()
  const rest = line.substring(colonIdx + 1).trim()

  const parts = rest.split(',').map(p => p.trim())
  if (parts.length < 2) return null

  let status: GanttTask['status'] = ''
  let idPart = parts[0]
  let id = ''

  // Check for status modifiers (milestone, active, done, crit)
  if (idPart === 'milestone') {
    status = 'milestone'
    id = parts[1]
  } else if (idPart === 'active' || idPart === 'done' || idPart === 'crit') {
    status = idPart as GanttTask['status']
    id = parts[1]
  } else {
    id = idPart
  }

  const startIdx = status ? 2 : 1
  const startDate = parts[startIdx] || ''
  const duration = parts[startIdx + 1] || '0d'

  const dependsOn = startDate.startsWith('after ') ? startDate.replace('after ', '') : ''

  // Normalize duration: Mermaid uses uppercase M for months, lowercase m for minutes
  const normalizedDuration = duration.replace(/^(\d+)m$/, '$1M')

  return {
    id,
    name,
    section: '',
    startDate: dependsOn ? '' : startDate,
    duration: normalizedDuration,
    status,
    dependsOn,
  }
}

/**
 * Generate Mermaid gantt code from structured sections and tasks
 */
export function generateMermaidGantt(
  sections: GanttSection[],
  title: string = '项目计划',
  dateFormat: string = 'YYYY-MM-DD',
): string {
  const lines: string[] = [
    'gantt',
    `    title ${title}`,
    `    dateFormat ${dateFormat}`,
    '    axisFormat %m/%d',
    '',
  ]

  for (const section of sections) {
    lines.push(`    section ${section.name}`)
    for (const task of section.tasks) {
      const statusPrefix = task.status === 'milestone' ? 'milestone, ' :
        task.status ? `${task.status}, ` : ''

      // Determine start reference: dependsOn takes priority over startDate
      let startRef = ''
      if (task.dependsOn) {
        startRef = `after ${task.dependsOn}`
      } else if (task.startDate) {
        startRef = task.startDate
      }

      // Milestone: duration is always 0d
      const duration = task.status === 'milestone' ? '0d' : task.duration

      // Ensure we always have valid parts
      if (startRef) {
        lines.push(`    ${task.name}           :${statusPrefix}${task.id}, ${startRef}, ${duration}`)
      } else {
        // No start date or dependency - use today as fallback
        const today = new Date().toISOString().split('T')[0]
        lines.push(`    ${task.name}           :${statusPrefix}${task.id}, ${today}, ${duration}`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Generate a unique task ID
 */
export function generateTaskId(existingIds: string[]): string {
  const prefix = 't'
  let counter = 1
  while (existingIds.includes(`${prefix}${counter}`)) {
    counter++
  }
  return `${prefix}${counter}`
}
