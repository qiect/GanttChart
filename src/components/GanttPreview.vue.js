/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, watch, nextTick } from 'vue';
import mermaid from 'mermaid';
import { getMermaidConfig, chartThemePresets } from '../utils/mermaidConfig';
const props = defineProps();
const emit = defineEmits();
const svg = ref('');
const error = ref('');
const zoom = ref(1);
const isDragging = ref(false);
const containerRef = ref(null);
const scrollContainerRef = ref(null);
const sliderRef = ref(null);
let renderCounter = 0;
let rendering = false;
// Zoom ratio 0..1 for slider position
const zoomRatio = computed(() => (zoom.value - 0.3) / 2.7);
const zoomIn = () => { zoom.value = Math.min(3, Math.round((zoom.value + 0.1) * 10) / 10); };
const zoomOut = () => { zoom.value = Math.max(0.3, Math.round((zoom.value - 0.1) * 10) / 10); };
const zoomReset = () => { zoom.value = 1; };
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
        // Don't zoom out below 0.5 to keep chart readable for very wide charts
        zoom.value = Math.max(0.5, Math.min(3, Math.round(newZoom * 10) / 10));
    }
};
// ── Slider drag logic ──
const updateZoomFromPointer = (clientX) => {
    if (!sliderRef.value)
        return;
    const rect = sliderRef.value.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    zoom.value = Math.max(0.3, Math.min(3, Math.round((0.3 + ratio * 2.7) * 100) / 100));
};
const onSliderMouseDown = (e) => {
    e.preventDefault();
    isDragging.value = true;
    updateZoomFromPointer(e.clientX);
    const onMouseMove = (ev) => {
        if (!isDragging.value)
            return;
        updateZoomFromPointer(ev.clientX);
    };
    const onMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};
// Ctrl+scroll to zoom
const onCtrlWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        zoomIn();
    }
    else {
        zoomOut();
    }
};
const render = async () => {
    if (!props.code.trim()) {
        svg.value = '';
        error.value = '';
        emit('errorChange', false);
        return;
    }
    if (rendering)
        return;
    rendering = true;
    const id = `mermaid-gantt-${++renderCounter}`;
    try {
        mermaid.initialize(getMermaidConfig(props.chartTheme));
        const result = await mermaid.render(id, props.code);
        svg.value = result.svg;
        error.value = '';
        emit('errorChange', false);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : '渲染失败';
        error.value = errorMessage;
        emit('errorChange', true);
        const errorEl = document.getElementById(id);
        if (errorEl)
            errorEl.remove();
    }
    finally {
        rendering = false;
    }
};
// Post-process SVG to fix text visibility and bar width issues
const postProcessSvg = () => {
    if (!containerRef.value)
        return;
    const svgEl = containerRef.value.querySelector('svg');
    if (!svgEl)
        return;
    // 1. Ensure SVG overflow is visible so text isn't clipped
    svgEl.setAttribute('overflow', 'visible');
    // 2. Set minimum width for task bars that are too narrow
    const rects = svgEl.querySelectorAll('rect');
    rects.forEach(rect => {
        const w = parseFloat(rect.getAttribute('width') || '0');
        // Only boost bars that exist but are too thin to see/click
        if (w > 0 && w < 4) {
            rect.setAttribute('width', '4');
        }
    });
    // 3. Remove clip-path from elements containing text to prevent text clipping
    const clippedTexts = svgEl.querySelectorAll('text');
    clippedTexts.forEach(textEl => {
        const parent = textEl.parentElement;
        if (parent && parent.hasAttribute('clip-path')) {
            parent.removeAttribute('clip-path');
        }
        // Ensure text is visible
        textEl.setAttribute('overflow', 'visible');
    });
    // 4. Handle very wide charts: ensure the SVG has a reasonable viewBox
    const svgWidth = parseFloat(svgEl.getAttribute('width') || '0');
    const viewBox = svgEl.getAttribute('viewBox');
    if (svgWidth > 5000 && viewBox) {
        // Cap SVG width at 5000px and let scroll handle the rest
        svgEl.setAttribute('width', '5000');
    }
};
watch([() => props.code, () => props.chartTheme], render, { immediate: true });
// Auto fit on first render, with SVG post-processing
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
/** @type {__VLS_StyleScopedClasses['gantt-svg-container']} */ ;
/** @type {__VLS_StyleScopedClasses['gantt-svg-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-full w-full flex flex-col" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
if (__VLS_ctx.svg && __VLS_ctx.code.trim()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shrink-0 flex items-center justify-between px-4 py-1.5 border-b" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[10px] font-semibold tracking-widest uppercase shrink-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
    /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-px h-3.5" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['w-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    for (const [preset] of __VLS_vFor((__VLS_ctx.chartThemePresets))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                        return;
                    __VLS_ctx.$emit('chartThemeChange', preset.id);
                    // @ts-ignore
                    [svg, code, chartThemePresets, $emit,];
                } },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                        return;
                    __VLS_ctx.chartTheme !== preset.id && ($event.target.style.background = 'var(--bg-secondary)');
                    // @ts-ignore
                    [chartTheme,];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                        return;
                    __VLS_ctx.chartTheme !== preset.id && ($event.target.style.background = 'transparent');
                    // @ts-ignore
                    [chartTheme,];
                } },
            key: (preset.id),
            ...{ class: "relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-md cursor-pointer transition-all duration-200 font-medium" },
            ...{ style: (__VLS_ctx.chartTheme === preset.id ? {
                    background: preset.swatch,
                    color: '#ffffff',
                    boxShadow: `0 2px 8px ${preset.swatch}40`,
                } : {
                    color: 'var(--text-tertiary)',
                    background: 'transparent',
                }) },
            title: (preset.name),
        });
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-2 h-2 rounded-full shrink-0" },
            ...{ style: ({ background: __VLS_ctx.chartTheme === preset.id ? 'rgba(255,255,255,0.6)' : preset.swatch }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        (preset.name);
        // @ts-ignore
        [chartTheme, chartTheme,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.zoomOut) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'var(--bg-secondary)';
                // @ts-ignore
                [zoomOut,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn p-1.5 rounded-md cursor-pointer transition-all duration-200" },
        ...{ style: ({ color: 'var(--text-tertiary)' }) },
        title: "缩小",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3.5 h-3.5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M20 12H4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onMousedown: (__VLS_ctx.onSliderMouseDown) },
        ...{ class: "relative w-24 mx-0.5 select-none" },
        ...{ style: {} },
        ref: "sliderRef",
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] rounded-full" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[3px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute left-0 top-0 h-full rounded-full transition-[width] duration-75" },
        ...{ style: ({ width: `${__VLS_ctx.zoomRatio * 100}%`, background: 'var(--accent)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-[width]']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-75']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-[left] duration-75" },
        ...{ style: ({
                left: `${__VLS_ctx.zoomRatio * 100}%`,
                transform: 'translate(-50%, -50%)',
                background: 'var(--bg-elevated)',
                border: '2px solid var(--accent)',
                boxShadow: __VLS_ctx.isDragging ? '0 0 0 3px var(--accent-glow)' : '0 1px 3px rgba(0,0,0,0.12)',
                transition: __VLS_ctx.isDragging ? 'none' : 'left 75ms ease, box-shadow 200ms ease',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-[left]']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-75']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.zoomIn) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'var(--bg-secondary)';
                // @ts-ignore
                [onSliderMouseDown, zoomRatio, zoomRatio, isDragging, isDragging, zoomIn,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn p-1.5 rounded-md cursor-pointer transition-all duration-200" },
        ...{ style: ({ color: 'var(--text-tertiary)' }) },
        title: "放大",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3.5 h-3.5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M12 4v16m8-8H4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[11px] min-w-[2.5rem] text-center font-mono font-medium" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[2.5rem]']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (Math.round(__VLS_ctx.zoom * 100));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "w-px h-4 mx-1" },
        ...{ style: ({ background: 'var(--border-primary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.fitToWidth) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'var(--bg-secondary)';
                // @ts-ignore
                [zoom, fitToWidth,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2 py-1 rounded-md cursor-pointer text-[11px] font-medium transition-all duration-200" },
        ...{ style: ({ color: 'var(--text-tertiary)' }) },
        title: "适应宽度",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.zoomReset) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'var(--bg-secondary)';
                // @ts-ignore
                [zoomReset,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.svg && __VLS_ctx.code.trim()))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2 py-1 rounded-md cursor-pointer text-[11px] font-medium transition-all duration-200" },
        ...{ style: ({ color: 'var(--text-tertiary)' }) },
        title: "重置缩放",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "shrink-0 mx-4 mt-4 p-4 rounded-xl" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "font-semibold text-sm mb-1" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs font-mono whitespace-pre-wrap break-all" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['break-all']} */ ;
    (__VLS_ctx.error);
}
if (!__VLS_ctx.code.trim()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 flex items-center justify-center" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center px-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['w-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-8 h-8" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.5",
        d: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-base font-medium" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm mt-2" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
}
if (__VLS_ctx.svg && __VLS_ctx.code.trim()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onWheel: (__VLS_ctx.onCtrlWheel) },
        ref: "scrollContainerRef",
        ...{ class: "flex-1 overflow-auto gantt-preview-scroll" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['gantt-preview-scroll']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "containerRef",
        ...{ class: "p-4 md:p-6 inline-block min-w-full gantt-svg-container" },
        ...{ style: ({ zoom: __VLS_ctx.zoom }) },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.svg) }, null, null);
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['gantt-svg-container']} */ ;
}
// @ts-ignore
[svg, svg, code, code, zoom, error, error, onCtrlWheel,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
