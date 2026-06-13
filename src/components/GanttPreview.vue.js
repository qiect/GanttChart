/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, watch, nextTick } from 'vue';
import mermaid from 'mermaid';
import { getMermaidConfig, chartThemePresets } from '../utils/mermaidConfig';
const props = defineProps();
const emit = defineEmits();
const hasError = ref(false);
const isDark = computed(() => props.theme === 'dark');
const svg = ref('');
const error = ref('');
const zoom = ref(1);
const rendering = ref(false);
const containerRef = ref(null);
const scrollContainerRef = ref(null);
const showZoomIndicator = ref(false);
const isPanning = ref(false);
let zoomIndicatorTimer = null;
let panStartX = 0;
let panStartY = 0;
let scrollStartX = 0;
let scrollStartY = 0;
let renderCounter = 0;
const flashZoomIndicator = () => {
    showZoomIndicator.value = true;
    if (zoomIndicatorTimer)
        clearTimeout(zoomIndicatorTimer);
    zoomIndicatorTimer = setTimeout(() => {
        showZoomIndicator.value = false;
    }, 800);
};
const zoomIn = () => {
    zoom.value = Math.min(3, Math.round((zoom.value + 0.1) * 10) / 10);
    flashZoomIndicator();
};
const zoomOut = () => {
    zoom.value = Math.max(0.3, Math.round((zoom.value - 0.1) * 10) / 10);
    flashZoomIndicator();
};
const zoomReset = () => {
    zoom.value = 1;
    flashZoomIndicator();
};
const fitToWidth = () => {
    if (!scrollContainerRef.value || !containerRef.value)
        return;
    const svgEl = containerRef.value.querySelector('svg');
    if (!svgEl)
        return;
    const naturalWidth = svgEl.getBoundingClientRect().width / zoom.value;
    const containerWidth = scrollContainerRef.value.clientWidth - 48;
    if (naturalWidth > 0) {
        const newZoom = containerWidth / naturalWidth;
        zoom.value = Math.max(0.5, Math.min(3, Math.round(newZoom * 10) / 10));
        flashZoomIndicator();
    }
};
const onRangeInput = (e) => {
    zoom.value = parseFloat(e.target.value);
    flashZoomIndicator();
};
// Scroll to zoom: mouse wheel zooms in/out centered on cursor
const onWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    zoom.value = Math.max(0.3, Math.min(3, Math.round((zoom.value + delta) * 100) / 100));
    flashZoomIndicator();
};
// Mouse drag to pan
const onMouseDown = (e) => {
    if (e.button !== 0)
        return; // Only left button
    if (!scrollContainerRef.value)
        return;
    isPanning.value = true;
    panStartX = e.clientX;
    panStartY = e.clientY;
    scrollStartX = scrollContainerRef.value.scrollLeft;
    scrollStartY = scrollContainerRef.value.scrollTop;
    const onMouseMove = (ev) => {
        if (!isPanning.value || !scrollContainerRef.value)
            return;
        const dx = ev.clientX - panStartX;
        const dy = ev.clientY - panStartY;
        scrollContainerRef.value.scrollLeft = scrollStartX - dx;
        scrollContainerRef.value.scrollTop = scrollStartY - dy;
    };
    const onMouseUp = () => {
        isPanning.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};
const render = async () => {
    if (!props.code.trim()) {
        svg.value = '';
        error.value = '';
        hasError.value = false;
        emit('errorChange', false);
        return;
    }
    if (rendering.value)
        return;
    rendering.value = true;
    const id = `mermaid-gantt-${++renderCounter}`;
    // Clean up any leftover mermaid render elements
    document.querySelectorAll('[id^="mermaid-gantt-"]').forEach(el => {
        if (el.id !== id)
            el.remove();
    });
    document.querySelectorAll('.d3-tip, .mermaidTooltip').forEach(el => el.remove());
    try {
        mermaid.initialize(getMermaidConfig(props.chartTheme));
        const result = await mermaid.render(id, props.code);
        svg.value = result.svg;
        error.value = '';
        hasError.value = false;
        emit('errorChange', false);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : '渲染失败';
        error.value = errorMessage;
        hasError.value = true;
        emit('errorChange', true);
        const errorEl = document.getElementById(id);
        if (errorEl)
            errorEl.remove();
        const d3ErrorEl = document.getElementById(`d3-${id}`);
        if (d3ErrorEl)
            d3ErrorEl.remove();
    }
    finally {
        rendering.value = false;
    }
};
// Post-process SVG to fix text visibility and bar width issues
const postProcessSvg = () => {
    if (!containerRef.value)
        return;
    const svgEl = containerRef.value.querySelector('svg');
    if (!svgEl)
        return;
    svgEl.setAttribute('overflow', 'visible');
    const rects = svgEl.querySelectorAll('rect');
    const rectMap = new Map();
    rects.forEach(rect => {
        const w = parseFloat(rect.getAttribute('width') || '0');
        const x = parseFloat(rect.getAttribute('x') || '0');
        const y = parseFloat(rect.getAttribute('y') || '0');
        const h = parseFloat(rect.getAttribute('height') || '0');
        if (w > 0 && w < 6) {
            rect.setAttribute('width', '6');
        }
        if (w > 0 && h > 0) {
            rectMap.set(`${Math.round(y)}`, { x, y, width: w, height: h, el: rect });
        }
    });
    const MIN_BAR_WIDTH_FOR_TEXT = 40;
    const TEXT_OFFSET_RIGHT = 6;
    const textElements = svgEl.querySelectorAll('text');
    textElements.forEach(textEl => {
        const parent = textEl.parentElement;
        if (parent && parent.hasAttribute('clip-path')) {
            parent.removeAttribute('clip-path');
        }
        textEl.setAttribute('overflow', 'visible');
        const textY = parseFloat(textEl.getAttribute('y') || '0');
        const textContent = textEl.textContent?.trim() || '';
        let matchedRect = null;
        for (const [, rectInfo] of rectMap) {
            if (Math.abs(rectInfo.y - textY) < rectInfo.height) {
                matchedRect = rectInfo;
                break;
            }
        }
        if (matchedRect) {
            const barWidth = matchedRect.width;
            const barRight = matchedRect.x + barWidth;
            const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            titleEl.textContent = textContent;
            const targetParent = matchedRect.el.parentElement || matchedRect.el;
            targetParent.insertBefore(titleEl, targetParent.firstChild);
            if (barWidth < MIN_BAR_WIDTH_FOR_TEXT && textContent) {
                const currentX = parseFloat(textEl.getAttribute('x') || '0');
                if (currentX >= matchedRect.x && currentX <= barRight) {
                    textEl.setAttribute('x', String(barRight + TEXT_OFFSET_RIGHT));
                    textEl.style.fill = 'var(--text-secondary, #5c6170)';
                    textEl.style.fontSize = '11px';
                    textEl.style.fontWeight = '500';
                }
            }
            else if (barWidth >= MIN_BAR_WIDTH_FOR_TEXT && textContent) {
                const textLen = textContent.length;
                const approxCharWidth = 7;
                const maxChars = Math.floor((barWidth - 8) / approxCharWidth);
                if (textLen > maxChars && maxChars > 2) {
                    textEl.textContent = textContent.slice(0, maxChars - 1) + '…';
                }
            }
            const group = matchedRect.el.parentElement;
            if (group && group.tagName === 'g') {
                group.classList.add('gantt-task-group');
                group.style.cursor = 'pointer';
            }
        }
    });
    const svgWidth = parseFloat(svgEl.getAttribute('width') || '0');
    const viewBox = svgEl.getAttribute('viewBox');
    if (svgWidth > 5000 && viewBox) {
        svgEl.setAttribute('width', '5000');
    }
};
watch([() => props.code, () => props.chartTheme], () => {
    render();
}, { immediate: true });
watch(svg, (newSvg) => {
    if (newSvg) {
        nextTick(() => {
            postProcessSvg();
            fitToWidth();
        });
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['taskText']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['taskText']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['sectionTitle']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['tick']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-task-group']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-task-group']} */ ;
/** @type {__VLS_StyleScopedClasses['floating-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['zoom-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['zoom-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['zoom-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['theme-dot']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-preview-scroll']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "gantt-preview-root h-full w-full flex flex-col" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['gantt-preview-root']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 relative overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 gantt-grid-bg" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-grid-bg']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "fade",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.rendering) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 z-20 flex items-center justify-center" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center gap-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "render-spinner" },
    });
    /** @type {__VLS_StyleScopedClasses['render-spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs font-medium" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
}
// @ts-ignore
[rendering,];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "slide-down",
}));
const __VLS_8 = __VLS_7({
    name: "slide-down",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-3 left-3 right-3 z-30" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-30']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "error-banner flex items-start gap-3 px-4 py-3 rounded-xl" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['error-banner']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-start']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({
        ...{ class: "text-sm font-semibold" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs font-mono mt-0.5 whitespace-pre-wrap break-all" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['break-all']} */ ;
    (__VLS_ctx.error);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.error))
                    return;
                __VLS_ctx.error = '';
                // @ts-ignore
                [error, error, error,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.error))
                    return;
                $event.target.style.background = 'rgba(239,68,68,0.1)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.error))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "shrink-0 p-1 rounded-md cursor-pointer transition-colors" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M6 18L18 6M6 6l12 12",
    });
}
// @ts-ignore
[];
var __VLS_9;
if (!__VLS_ctx.code.trim()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 z-10 flex items-center justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center px-6 animate-fade-in" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-fade-in']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-illustration mx-auto mb-6" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-illustration']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        width: "120",
        height: "96",
        viewBox: "0 0 120 96",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "8",
        y: "8",
        width: "104",
        height: "80",
        rx: "12",
        fill: (__VLS_ctx.isDark ? '#1c1f2e' : '#f1f3f7'),
        stroke: (__VLS_ctx.isDark ? '#2a2e42' : '#e4e7ee'),
        'stroke-width': "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "8",
        y1: "32",
        x2: "112",
        y2: "32",
        stroke: (__VLS_ctx.isDark ? '#2a2e42' : '#e4e7ee'),
        'stroke-width': "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "8",
        y1: "56",
        x2: "112",
        y2: "56",
        stroke: (__VLS_ctx.isDark ? '#2a2e42' : '#e4e7ee'),
        'stroke-width': "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "40",
        y1: "8",
        x2: "40",
        y2: "88",
        stroke: (__VLS_ctx.isDark ? '#2a2e42' : '#e4e7ee'),
        'stroke-width': "1",
        'stroke-dasharray': "3 3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "72",
        y1: "8",
        x2: "72",
        y2: "88",
        stroke: (__VLS_ctx.isDark ? '#2a2e42' : '#e4e7ee'),
        'stroke-width': "1",
        'stroke-dasharray': "3 3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
        x: "44",
        y: "16",
        width: "36",
        height: "10",
        rx: "3",
        fill: "var(--accent)",
        opacity: "0.8",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.animate)({
        attributeName: "width",
        from: "0",
        to: "36",
        dur: "0.8s",
        fill: "freeze",
        begin: "0.2s",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
        x: "44",
        y: "40",
        width: "24",
        height: "10",
        rx: "3",
        fill: "var(--accent)",
        opacity: "0.5",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.animate)({
        attributeName: "width",
        from: "0",
        to: "24",
        dur: "0.6s",
        fill: "freeze",
        begin: "0.5s",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
        x: "76",
        y: "40",
        width: "16",
        height: "10",
        rx: "3",
        fill: "var(--accent)",
        opacity: "0.35",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.animate)({
        attributeName: "width",
        from: "0",
        to: "16",
        dur: "0.5s",
        fill: "freeze",
        begin: "0.7s",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
        x: "44",
        y: "64",
        width: "48",
        height: "10",
        rx: "3",
        fill: "var(--accent)",
        opacity: "0.25",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.animate)({
        attributeName: "width",
        from: "0",
        to: "48",
        dur: "0.9s",
        fill: "freeze",
        begin: "0.9s",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
        x: "82",
        y: "14",
        width: "6",
        height: "6",
        rx: "1",
        fill: "var(--warning)",
        transform: "rotate(45 85 17)",
        opacity: "0.9",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.animate)({
        attributeName: "opacity",
        from: "0",
        to: "0.9",
        dur: "0.3s",
        fill: "freeze",
        begin: "1.2s",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-base font-semibold" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm mt-1.5" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
}
if (__VLS_ctx.svg && __VLS_ctx.code.trim()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onWheel: (__VLS_ctx.onWheel) },
        ...{ onMousedown: (__VLS_ctx.onMouseDown) },
        ref: "scrollContainerRef",
        ...{ class: "absolute inset-0 overflow-auto gantt-preview-scroll" },
        ...{ class: ({ 'is-dragging': __VLS_ctx.isPanning }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['gantt-preview-scroll']} */ ;
    /** @type {__VLS_StyleScopedClasses['is-dragging']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ref: "containerRef",
        ...{ class: "gantt-svg-wrapper" },
        ...{ style: ({ transform: `scale(${__VLS_ctx.zoom})`, transformOrigin: 'top left' }) },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.svg) }, null, null);
    /** @type {__VLS_StyleScopedClasses['gantt-svg-wrapper']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute bottom-4 left-1/2 -translate-x-1/2 z-20" },
});
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-4']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "floating-bar flex items-center gap-1 px-2 py-1.5 rounded-2xl" },
});
/** @type {__VLS_StyleScopedClasses['floating-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-0.5 px-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
for (const [preset] of __VLS_vFor((__VLS_ctx.chartThemePresets))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('chartThemeChange', preset.id);
                // @ts-ignore
                [code, code, isDark, isDark, isDark, isDark, isDark, isDark, svg, svg, onWheel, onMouseDown, isPanning, zoom, chartThemePresets, $emit,];
            } },
        key: (preset.id),
        ...{ class: "theme-dot relative w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200" },
        ...{ style: (__VLS_ctx.chartTheme === preset.id ? {
                background: preset.swatch,
                boxShadow: `0 0 0 2px var(--bg-elevated), 0 0 0 3.5px ${preset.swatch}`,
            } : {}) },
        title: (preset.name),
    });
    /** @type {__VLS_StyleScopedClasses['theme-dot']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    if (__VLS_ctx.chartTheme !== preset.id) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.chartTheme !== preset.id))
                        return;
                    $event.target.style.transform = 'scale(1.15)';
                    $event.target.style.opacity = '1';
                    // @ts-ignore
                    [chartTheme, chartTheme,];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.chartTheme !== preset.id))
                        return;
                    $event.target.style.transform = 'scale(1)';
                    $event.target.style.opacity = '0.7';
                    // @ts-ignore
                    [];
                } },
            ...{ class: "w-3.5 h-3.5 rounded-full transition-transform duration-200" },
            ...{ style: ({ background: preset.swatch, opacity: 0.7 }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-3 h-3 text-white" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "3",
            d: "M5 13l4 4L19 7",
        });
    }
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "w-px h-5 shrink-0" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-px']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.zoomOut) },
    ...{ class: "bar-btn p-1.5 rounded-lg cursor-pointer" },
    title: "缩小",
});
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4 h-4" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M20 12H4",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-1.5 px-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onInput: (__VLS_ctx.onRangeInput) },
    type: "range",
    min: (0.3),
    max: (3),
    step: (0.05),
    value: (__VLS_ctx.zoom),
    ...{ class: "zoom-slider w-20" },
});
/** @type {__VLS_StyleScopedClasses['zoom-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-[10px] font-mono font-semibold min-w-[2.5rem] text-center tabular-nums" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-[2.5rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
(Math.round(__VLS_ctx.zoom * 100));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.zoomIn) },
    ...{ class: "bar-btn p-1.5 rounded-lg cursor-pointer" },
    title: "放大",
});
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4 h-4" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M12 4v16m8-8H4",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "w-px h-5 shrink-0" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-px']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.fitToWidth) },
    ...{ class: "bar-btn px-2 py-1 rounded-lg cursor-pointer text-[11px] font-medium" },
    title: "适应宽度",
});
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.zoomReset) },
    ...{ class: "bar-btn px-2 py-1 rounded-lg cursor-pointer text-[11px] font-medium" },
    title: "重置缩放",
});
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "w-px h-5 shrink-0" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-px']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.render) },
    ...{ class: "bar-btn render-btn px-2.5 py-1 rounded-lg cursor-pointer text-[11px] font-semibold flex items-center gap-1" },
    ...{ style: ({
            color: __VLS_ctx.hasError ? 'var(--error)' : 'var(--success)',
        }) },
    title: (__VLS_ctx.hasError ? '重新渲染' : '手动渲染'),
});
/** @type {__VLS_StyleScopedClasses['bar-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['render-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-3.5 h-3.5" },
    ...{ class: ({ 'animate-spin': __VLS_ctx.rendering }) },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
});
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    name: "fade",
}));
const __VLS_14 = __VLS_13({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
if (__VLS_ctx.showZoomIndicator) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-3 right-3 z-20" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-20']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tabular-nums" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
    (Math.round(__VLS_ctx.zoom * 100));
}
// @ts-ignore
[rendering, zoom, zoom, zoom, zoomOut, onRangeInput, zoomIn, fitToWidth, zoomReset, render, hasError, hasError, showZoomIndicator,];
var __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
