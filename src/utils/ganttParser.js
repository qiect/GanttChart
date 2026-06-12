/**
 * Parse Mermaid gantt code into structured sections and tasks
 */
export function parseMermaidGantt(code) {
    const lines = code.split('\n');
    const sections = [];
    let currentSection = null;
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
            const task = parseTaskLine(trimmed);
            if (task) {
                currentSection.tasks.push(task);
            }
        }
    }
    return sections;
}
function parseTaskLine(line) {
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
    // Check for status modifiers (milestone, active, done, crit)
    if (idPart === 'milestone') {
        status = 'milestone';
        id = parts[1];
    }
    else if (idPart === 'active' || idPart === 'done' || idPart === 'crit') {
        status = idPart;
        id = parts[1];
    }
    else {
        id = idPart;
    }
    const startIdx = status ? 2 : 1;
    const startDate = parts[startIdx] || '';
    let duration = parts[startIdx + 1] || '1d';
    // Validate duration format - must be like 5d, 3h, 2w, 1M
    if (!/^(\d+)([dhwM])$/.test(duration)) {
        duration = '1d';
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
            // Validate and fix duration: ensure it matches Mermaid format (e.g., 5d, 3h, 2w, 1M)
            let duration = task.status === 'milestone' ? task.duration.replace(/^\d+/, '0') : task.duration;
            if (!/^(\d+)([dhwM])$/.test(duration)) {
                duration = '1d'; // Fallback to 1 day if duration is invalid
            }
            // Ensure startRef is never empty - use today as fallback
            if (!startRef) {
                startRef = new Date().toISOString().split('T')[0];
            }
            lines.push(`    ${task.name}           :${statusPrefix}${task.id}, ${startRef}, ${duration}`);
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
