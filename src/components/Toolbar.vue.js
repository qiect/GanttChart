/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
import ExportMenu from './ExportMenu.vue';
import { importMermaidCode } from '../utils/exportChart';
const props = defineProps();
const emit = defineEmits();
const isMobile = ref(false);
const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
};
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
const handleImport = async () => {
    try {
        const importedCode = await importMermaidCode();
        emit('codeChange', importedCode);
    }
    catch (err) {
        console.error('Import failed:', err);
    }
};
const handleSave = () => {
    emit('save');
};
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between px-3 lg:px-5 border-b" },
    ...{ style: ({
            height: __VLS_ctx.isMobile ? 'auto' : '48px',
            background: __VLS_ctx.theme === 'dark' ? 'var(--glass-bg)' : 'var(--glass-bg)',
            borderColor: 'var(--border-primary)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--text-primary)',
        }) },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
if (!__VLS_ctx.isMobile) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-3 min-w-0" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-sm md:text-base font-semibold flex items-center gap-2 shrink-0 tracking-tight" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-7 h-7" },
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
    });
    /** @type {__VLS_StyleScopedClasses['w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "logo-bg",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "#4f46e5",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "50%",
        'stop-color': "#6d28d9",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "#7c3aed",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "logo-bar1",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "#e0e7ff",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "#c7d2fe",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "logo-bar2",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "#c7d2fe",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "#a5b4fc",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "logo-accent",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "#fbbf24",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "#f59e0b",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        width: "48",
        height: "48",
        rx: "12",
        fill: "url(#logo-bg)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "1",
        y: "1",
        width: "46",
        height: "46",
        rx: "11",
        fill: "none",
        stroke: "white",
        'stroke-opacity': "0.15",
        'stroke-width': "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "10",
        width: "30",
        height: "5",
        rx: "2.5",
        fill: "url(#logo-bar1)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "18.5",
        width: "17",
        height: "5",
        rx: "2.5",
        fill: "url(#logo-bar2)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "27",
        width: "24",
        height: "5",
        rx: "2.5",
        fill: "url(#logo-bar1)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "29",
        y: "17.5",
        width: "5.5",
        height: "5.5",
        rx: "1.2",
        fill: "url(#logo-accent)",
        transform: "rotate(45 31.75 20.25)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "9",
        cy: "36",
        r: "1.5",
        fill: "#a5b4fc",
        opacity: "0.6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "15",
        cy: "36",
        r: "1.5",
        fill: "#a5b4fc",
        opacity: "0.4",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        cx: "21",
        cy: "36",
        r: "1.5",
        fill: "#a5b4fc",
        opacity: "0.3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-semibold tracking-tight" },
    });
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0" },
        ...{ style: ({
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center rounded-lg p-0.5" },
        ...{ style: ({ background: 'var(--bg-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('editorModeChange', 'visual');
                // @ts-ignore
                [isMobile, isMobile, theme, $emit,];
            } },
        ...{ class: "px-2.5 py-1 text-xs rounded-md transition-all duration-200 cursor-pointer font-medium" },
        ...{ style: (__VLS_ctx.editorMode === 'visual' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
            } : {
                color: 'var(--text-tertiary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('editorModeChange', 'code');
                // @ts-ignore
                [$emit, editorMode,];
            } },
        ...{ class: "px-2.5 py-1 text-xs rounded-md transition-all duration-200 cursor-pointer font-medium" },
        ...{ style: (__VLS_ctx.editorMode === 'code' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
            } : {
                color: 'var(--text-tertiary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-1 lg:gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center rounded-lg p-0.5" },
        ...{ style: ({ background: 'var(--bg-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('openTemplate');
                // @ts-ignore
                [$emit, editorMode,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'var(--bg-elevated)';
                $event.target.style.boxShadow = 'var(--shadow-sm)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.boxShadow = 'none';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "模板 (Ctrl+T)",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
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
        'stroke-width': "1.8",
        d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleImport) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'var(--bg-elevated)';
                $event.target.style.boxShadow = 'var(--shadow-sm)';
                // @ts-ignore
                [handleImport,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.boxShadow = 'none';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "导入",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
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
        'stroke-width': "1.8",
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleSave) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'var(--bg-elevated)';
                $event.target.style.boxShadow = 'var(--shadow-sm)';
                // @ts-ignore
                [handleSave,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.boxShadow = 'none';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2.5 py-1 text-xs rounded-md flex items-center gap-1.5 cursor-pointer font-medium" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "保存 (Ctrl+S)",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
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
        'stroke-width': "1.8",
        d: "M5 3h11l5 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M7 3v6h8V3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M7 21v-6h10v6",
    });
    const __VLS_0 = ExportMenu;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        getChartElement: (__VLS_ctx.getChartElement),
        theme: (__VLS_ctx.theme),
        code: (__VLS_ctx.code),
    }));
    const __VLS_2 = __VLS_1({
        getChartElement: (__VLS_ctx.getChartElement),
        theme: (__VLS_ctx.theme),
        code: (__VLS_ctx.code),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('themeChange', __VLS_ctx.theme === 'dark' ? 'light' : 'dark');
                // @ts-ignore
                [theme, theme, $emit, getChartElement, code,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'var(--bg-tertiary)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(!__VLS_ctx.isMobile))
                    return;
                $event.target.style.background = 'transparent';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-2.5 py-1 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer font-medium" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "切换主题",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    if (__VLS_ctx.theme === 'dark') {
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
            'stroke-width': "1.8",
            d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
        });
    }
    else {
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
            'stroke-width': "1.8",
            d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
        });
    }
    (__VLS_ctx.theme === 'dark' ? '浅色' : '深色');
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-full py-1.5 md:py-2" },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-sm md:text-base font-semibold flex items-center gap-1.5 md:gap-2 shrink-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-6 h-6 md:w-7 md:h-7" },
        viewBox: "0 0 48 48",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
    });
    /** @type {__VLS_StyleScopedClasses['w-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-7']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
        id: "logo-bg-m",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "1",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "#4f46e5",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "50%",
        'stop-color': "#6d28d9",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "#7c3aed",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        width: "48",
        height: "48",
        rx: "12",
        fill: "url(#logo-bg-m)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "10",
        width: "30",
        height: "5",
        rx: "2.5",
        fill: "#e0e7ff",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "18.5",
        width: "17",
        height: "5",
        rx: "2.5",
        fill: "#c7d2fe",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "9",
        y: "27",
        width: "24",
        height: "5",
        rx: "2.5",
        fill: "#e0e7ff",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "29",
        y: "17.5",
        width: "5.5",
        height: "5.5",
        rx: "1.2",
        fill: "#fbbf24",
        transform: "rotate(45 31.75 20.25)",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-0.5 md:gap-1" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('openTemplate');
                // @ts-ignore
                [theme, theme, $emit,];
            } },
        ...{ class: "premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "模板",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-[18px] h-[18px] md:w-4 md:h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "hidden md:inline text-xs font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleImport) },
        ...{ class: "premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "导入",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-[18px] h-[18px] md:w-4 md:h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "hidden md:inline text-xs font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleSave) },
        ...{ class: "premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "保存",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-[18px] h-[18px] md:w-4 md:h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M5 3h11l5 5v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M7 3v6h8V3",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "1.8",
        d: "M7 21v-6h10v6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "hidden md:inline text-xs font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const __VLS_5 = ExportMenu;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        getChartElement: (__VLS_ctx.getChartElement),
        theme: (__VLS_ctx.theme),
        code: (__VLS_ctx.code),
    }));
    const __VLS_7 = __VLS_6({
        getChartElement: (__VLS_ctx.getChartElement),
        theme: (__VLS_ctx.theme),
        code: (__VLS_ctx.code),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('themeChange', __VLS_ctx.theme === 'dark' ? 'light' : 'dark');
                // @ts-ignore
                [theme, theme, $emit, handleImport, handleSave, getChartElement, code,];
            } },
        ...{ class: "premium-btn p-2 md:px-3 md:py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5" },
        ...{ style: ({ color: 'var(--text-secondary)' }) },
        title: "切换主题",
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    if (__VLS_ctx.theme === 'dark') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-[18px] h-[18px] md:w-4 md:h-4" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "1.8",
            d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-[18px] h-[18px] md:w-4 md:h-4" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-[18px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-[18px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "1.8",
            d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
        });
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "hidden md:inline text-xs font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    (__VLS_ctx.theme === 'dark' ? '浅色' : '深色');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:mt-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center rounded-lg p-0.5 md:p-1 flex-1" },
        ...{ style: ({ background: 'var(--bg-tertiary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('mobileTabChange', 'editor');
                // @ts-ignore
                [theme, theme, $emit,];
            } },
        ...{ class: "flex-1 px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-all duration-200 cursor-pointer font-medium text-center" },
        ...{ style: (__VLS_ctx.mobileTab === 'editor' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
            } : {
                color: 'var(--text-tertiary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center justify-center gap-1 md:gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3.5 h-3.5 md:w-4 md:h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.isMobile))
                    return;
                __VLS_ctx.$emit('mobileTabChange', 'preview');
                // @ts-ignore
                [$emit, mobileTab,];
            } },
        ...{ class: "flex-1 px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-md transition-all duration-200 cursor-pointer font-medium text-center" },
        ...{ style: (__VLS_ctx.mobileTab === 'preview' ? {
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
            } : {
                color: 'var(--text-tertiary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center justify-center gap-1 md:gap-1.5" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-3.5 h-3.5 md:w-4 md:h-4" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    });
    if (__VLS_ctx.mobileTab === 'editor') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center rounded-lg p-0.5 md:p-1 shrink-0" },
            ...{ style: ({ background: 'var(--bg-tertiary)' }) },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:p-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.isMobile))
                        return;
                    if (!(__VLS_ctx.mobileTab === 'editor'))
                        return;
                    __VLS_ctx.$emit('editorModeChange', 'visual');
                    // @ts-ignore
                    [$emit, mobileTab, mobileTab,];
                } },
            ...{ class: "px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-xs rounded-md transition-all duration-200 cursor-pointer font-medium" },
            ...{ style: (__VLS_ctx.editorMode === 'visual' ? {
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                } : {
                    color: 'var(--text-tertiary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(!__VLS_ctx.isMobile))
                        return;
                    if (!(__VLS_ctx.mobileTab === 'editor'))
                        return;
                    __VLS_ctx.$emit('editorModeChange', 'code');
                    // @ts-ignore
                    [$emit, editorMode,];
                } },
            ...{ class: "px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-xs rounded-md transition-all duration-200 cursor-pointer font-medium" },
            ...{ style: (__VLS_ctx.editorMode === 'code' ? {
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                } : {
                    color: 'var(--text-tertiary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    }
}
// @ts-ignore
[editorMode,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
