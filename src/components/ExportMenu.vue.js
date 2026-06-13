/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
import { exportChart, exportMermaidCode } from '../utils/exportChart';
const props = defineProps();
const isOpen = ref(false);
const isExporting = ref(false);
const menuRef = ref(null);
const handleClickOutside = (e) => {
    if (menuRef.value && !menuRef.value.contains(e.target)) {
        isOpen.value = false;
    }
};
onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));
const handleExportCode = () => {
    isOpen.value = false;
    exportMermaidCode(props.code);
};
const handleExport = async (format) => {
    const chartElement = props.getChartElement();
    if (!chartElement || isExporting.value)
        return;
    isExporting.value = true;
    isOpen.value = false;
    try {
        await exportChart(chartElement, {
            format,
            quality: 1,
            scale: 2,
            backgroundColor: props.theme === 'dark' ? '#0f1117' : '#ffffff',
        });
    }
    catch (err) {
        console.error('Export failed:', err);
    }
    finally {
        isExporting.value = false;
    }
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
    ref: "menuRef",
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
            // @ts-ignore
            [isOpen, isOpen,];
        } },
    ...{ onMouseenter: (...[$event]) => {
            !__VLS_ctx.isOpen && ($event.target.style.background = 'var(--bg-tertiary)');
            // @ts-ignore
            [isOpen,];
        } },
    ...{ onMouseleave: (...[$event]) => {
            ($event.target.style.background = 'transparent');
            // @ts-ignore
            [];
        } },
    ...{ class: "premium-btn px-2 md:px-3 py-1.5 text-sm rounded-lg flex items-center gap-1 md:gap-1.5 disabled:opacity-50 cursor-pointer font-medium" },
    ...{ style: ({ color: 'var(--text-secondary)' }) },
    disabled: (__VLS_ctx.isExporting),
});
/** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
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
    'stroke-width': "1.8",
    d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "hidden sm:inline" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
(__VLS_ctx.isExporting ? '导出中...' : '导出');
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute right-0 top-full mt-2 z-50 min-w-[160px] md:min-w-[180px] overflow-hidden animate-fade-in" },
        ...{ style: ({
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['right-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[160px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:min-w-[180px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-fade-in']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-1" },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleExportCode) },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--accent-subtle)';
                $event.target.style.color = 'var(--accent)';
                // @ts-ignore
                [isOpen, isExporting, isExporting, handleExportCode,];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.color = 'var(--text-primary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium" },
        ...{ style: ({ color: 'var(--text-primary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.handleExport('png');
                // @ts-ignore
                [handleExport,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--accent-subtle)';
                $event.target.style.color = 'var(--accent)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.color = 'var(--text-primary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium" },
        ...{ style: ({ color: 'var(--text-primary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.handleExport('svg');
                // @ts-ignore
                [handleExport,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--accent-subtle)';
                $event.target.style.color = 'var(--accent)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.color = 'var(--text-primary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium" },
        ...{ style: ({ color: 'var(--text-primary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.handleExport('pdf');
                // @ts-ignore
                [handleExport,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--accent-subtle)';
                $event.target.style.color = 'var(--accent)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'transparent';
                $event.target.style.color = 'var(--text-primary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 font-medium" },
        ...{ style: ({ color: 'var(--text-primary)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
