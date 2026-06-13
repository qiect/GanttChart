/**
 * Parse Mermaid gantt code into structured sections and tasks
 */
export function parseMermaidGantt(code) {
    const lines = code.split('\n');
    const sections = [];
    let currentSection = null;
    const existingIds = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('title ') || trimmed.startsWith('dateFormat ') || trimmed.startsWith('axisFormat ')) {
            continue;
        }
        if (trimmed.startsWith('section ')) {
            currentSection = { name: trimmed.replace('section ', ''), tasks: [] };
            sections.push(currentSection);
            continue;
        }
        if (!trimmed || trimmed.startsWith('%') || trimmed === 'gantt')
            continue;
        // Parse task line: name :status, id, start, duration
        if (currentSection) {
            const task = parseTaskLine(trimmed, existingIds);
            if (task) {
                existingIds.push(task.id);
                currentSection.tasks.push(task);
            }
        }
    }
    return sections;
}
function parseTaskLine(line, existingIds = []) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1)
        return null;
    const name = line.substring(0, colonIdx).trim();
    const rest = line.substring(colonIdx + 1).trim();
    const parts = rest.split(',').map(p => p.trim());
    if (parts.length < 2)
        return null;
    let status = '';
    let idPart = parts[0];
    let id = '';
    let startIdx = 1;
    // Helper: check if a part looks like a dependency or date (not an ID)
    const isStartRef = (s) => s.startsWith('after ') || /^\d{4}-\d{2}-\d{2}$/.test(s);
    // Check for status modifiers (milestone, active, done, crit)
    if (idPart === 'milestone' || idPart === 'active' || idPart === 'done' || idPart === 'crit') {
        status = idPart;
        // Check if parts[1] is a dependency/date (meaning no explicit ID)
        const secondPart = parts[1] || '';
        if (isStartRef(secondPart)) {
            // No explicit ID - generate one
            id = generateTaskId(existingIds);
            startIdx = 1;
        }
        else {
            id = secondPart;
            startIdx = 2;
        }
    }
    else {
        id = idPart;
        startIdx = 1;
    }
    const startDate = parts[startIdx] || '';
    const duration = parts[startIdx + 1] || (status === 'milestone' ? '0d' : '1d');
    // Validate duration format - d, h, w, M are valid Mermaid units
    if (!/^\d+[dhwM]$/.test(duration)) {
        return null;
    }
    const dependsOn = startDate.startsWith('after ') ? startDate.replace('after ', '') : '';
    return {
        id,
        name,
        section: '',
        startDate: dependsOn ? '' : startDate,
        duration,
        status,
        dependsOn,
    };
}
/**
 * Generate Mermaid gantt code from structured sections and tasks
 */
export function generateMermaidGantt(sections, title = '项目计划', dateFormat = 'YYYY-MM-DD') {
    const lines = [
        'gantt',
        `    title ${title}`,
        `    dateFormat ${dateFormat}`,
        '    axisFormat %m/%d',
        '',
    ];
    for (const section of sections) {
        lines.push(`    section ${section.name}`);
        for (const task of section.tasks) {
            const statusPrefix = task.status === 'milestone' ? 'milestone, ' :
                task.status ? `${task.status}, ` : '';
            // Determine start reference: dependsOn takes priority over startDate
            let startRef = '';
            if (task.dependsOn) {
                startRef = `after ${task.dependsOn}`;
            }
            else if (task.startDate) {
                startRef = task.startDate;
            }
            // Milestone: duration is always 0 with the task's current unit
            let taskDuration = task.status === 'milestone' ? task.duration.replace(/^\d+/, '0') : task.duration;
            // Validate duration format - d, h, w, M are valid Mermaid units
            if (!/^\d+[dhwM]$/.test(taskDuration)) {
                taskDuration = task.status === 'milestone' ? '0d' : '1d';
            }
            // Ensure we always have valid parts
            if (startRef) {
                lines.push(`    ${task.name}           :${statusPrefix}${task.id}, ${startRef}, ${taskDuration}`);
            }
            else {
                // No start date or dependency - use today as fallback
                const today = new Date().toISOString().split('T')[0];
                lines.push(`    ${task.name}           :${statusPrefix}${task.id}, ${today}, ${taskDuration}`);
            }
        }
        lines.push('');
    }
    return lines.join('\n');
}
/**
 * Generate a unique task ID
 */
export function generateTaskId(existingIds) {
    const prefix = 't';
    let counter = 1;
    while (existingIds.includes(`${prefix}${counter}`)) {
        counter++;
    }
    return `${prefix}${counter}`;
}
