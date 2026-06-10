/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
import { ganttTemplates } from '../utils/mermaidTemplates';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const searchQuery = ref('');
const filteredTemplates = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query)
        return ganttTemplates;
    return ganttTemplates.filter(t => t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query));
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
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [isOpen, $emit,];
            } },
        ...{ class: "absolute inset-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-full h-full md:h-auto md:max-h-[80vh] md:max-w-2xl overflow-hidden flex flex-col animate-scale-in" },
        ...{ style: ({
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-primary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:h-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:max-h-[80vh]']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:max-w-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-scale-in']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-5 md:p-7 shrink-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-lg md:text-xl font-semibold" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm mt-1.5" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-3 relative" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onFocus: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.borderColor = 'var(--accent)';
                // @ts-ignore
                [];
            } },
        ...{ onBlur: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.borderColor = 'var(--border-primary)';
                // @ts-ignore
                [];
            } },
        placeholder: "搜索模板...",
        ...{ class: "w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all duration-200" },
        ...{ style: ({
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
            }) },
    });
    (__VLS_ctx.searchQuery);
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['pl-9']} */ ;
    /** @type {__VLS_StyleScopedClasses['pr-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
    if (__VLS_ctx.searchQuery) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    if (!(__VLS_ctx.searchQuery))
                        return;
                    __VLS_ctx.searchQuery = '';
                    // @ts-ignore
                    [searchQuery, searchQuery, searchQuery,];
                } },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    if (!(__VLS_ctx.searchQuery))
                        return;
                    $event.target.style.color = 'var(--text-primary)';
                    // @ts-ignore
                    [];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    if (!(__VLS_ctx.searchQuery))
                        return;
                    $event.target.style.color = 'var(--text-tertiary)';
                    // @ts-ignore
                    [];
                } },
            ...{ class: "absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer transition-colors duration-200" },
            ...{ style: ({ color: 'var(--text-tertiary)' }) },
        });
        /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
        /** @type {__VLS_StyleScopedClasses['right-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
        /** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
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
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-4 md:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4" },
    });
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:gap-4']} */ ;
    for (const [template] of __VLS_vFor((__VLS_ctx.filteredTemplates))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    __VLS_ctx.$emit('select', template);
                    __VLS_ctx.$emit('close');
                    // @ts-ignore
                    [$emit, $emit, filteredTemplates,];
                } },
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    $event.currentTarget.style.borderColor = 'var(--accent)';
                    $event.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                    // @ts-ignore
                    [];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    $event.currentTarget.style.borderColor = 'var(--border-primary)';
                    $event.currentTarget.style.boxShadow = 'none';
                    // @ts-ignore
                    [];
                } },
            key: (template.id),
            ...{ class: "text-left p-4 md:p-5 rounded-xl transition-all duration-200 group cursor-pointer" },
            ...{ style: ({
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-secondary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:p-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "font-semibold text-sm md:text-base group-hover:text-[var(--accent)] transition-colors" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:text-base']} */ ;
        /** @type {__VLS_StyleScopedClasses['group-hover:text-[var(--accent)]']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        (template.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs md:text-sm mt-1.5" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['md:text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
        (template.description);
        // @ts-ignore
        [];
    }
    if (__VLS_ctx.filteredTemplates.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "col-span-2 text-center py-10 text-sm" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['col-span-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-4 md:p-5 flex items-center justify-between shrink-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    (__VLS_ctx.filteredTemplates.length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [$emit, filteredTemplates, filteredTemplates,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--border-primary)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.background = 'var(--bg-tertiary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "premium-btn px-5 py-2 text-sm rounded-lg cursor-pointer font-medium transition-all duration-200" },
        ...{ style: ({
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['premium-btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
