/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed } from 'vue';
import { ganttTemplates, templateCategories, blankTemplate } from '../utils/mermaidTemplates';
import CatIcon from './CatIcon.vue';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
const searchQuery = ref('');
const activeCategory = ref('project');
const activeCategoryInfo = computed(() => templateCategories.find(c => c.id === activeCategory.value) || templateCategories[0]);
const filteredTemplates = computed(() => {
    return ganttTemplates.filter(t => t.category === activeCategory.value);
});
const searchResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query)
        return [];
    return ganttTemplates.filter(t => t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query));
});
const categoriesWithResults = computed(() => {
    const catIds = new Set(searchResults.value.map(t => t.category));
    return templateCategories.filter(c => catIds.has(c.id));
});
const getTemplateCount = (catId) => ganttTemplates.filter(t => t.category === catId).length;
const getSearchCount = (catId) => searchResults.value.filter(t => t.category === catId).length;
const getSearchResults = (catId) => searchResults.value.filter(t => t.category === catId);
const onCardEnter = (e) => {
    const el = e.currentTarget;
    el.style.borderColor = 'var(--accent)';
    el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--accent-glow)';
};
const onCardLeave = (e) => {
    const el = e.currentTarget;
    el.style.borderColor = 'var(--border-primary)';
    el.style.boxShadow = 'none';
};
const onBlankEnter = (e) => {
    const el = e.currentTarget;
    el.style.borderColor = 'var(--accent)';
    el.style.borderStyle = 'solid';
    el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px var(--accent-glow)';
};
const onBlankLeave = (e) => {
    const el = e.currentTarget;
    el.style.borderColor = 'var(--border-primary)';
    el.style.borderStyle = 'dashed';
    el.style.boxShadow = 'none';
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
/** @type {__VLS_StyleScopedClasses['modal-container']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-container']} */ ;
/** @type {__VLS_StyleScopedClasses['cat-tabs-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['tmpl-card']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['content-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['content-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['content-scroll']} */ ;
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "fixed inset-0 z-50 flex items-end sm:items-center justify-center" },
    });
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [isOpen, $emit,];
            } },
        ...{ class: "absolute inset-0 modal-backdrop" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['modal-backdrop']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative w-full sm:max-w-[860px] overflow-hidden flex flex-col modal-container animate-slide-up sm:animate-scale-in" },
        ...{ style: ({
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            }) },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:max-w-[860px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['modal-container']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-slide-up']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:animate-scale-in']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-4 sm:px-6 pt-4 sm:pt-6 pb-3 shrink-0" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:pt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-base sm:text-lg font-bold" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-[11px] sm:text-xs mt-0.5" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['text-[11px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    (__VLS_ctx.ganttTemplates.length);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                __VLS_ctx.$emit('close');
                // @ts-ignore
                [$emit, ganttTemplates,];
            } },
        ...{ onMouseenter: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.currentTarget.style.background = 'var(--bg-tertiary)';
                $event.currentTarget.style.color = 'var(--text-primary)';
                // @ts-ignore
                [];
            } },
        ...{ onMouseleave: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.currentTarget.style.background = 'transparent';
                $event.currentTarget.style.color = 'var(--text-tertiary)';
                // @ts-ignore
                [];
            } },
        ...{ class: "p-1.5 rounded-lg cursor-pointer transition-colors" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['p-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-5 h-5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M6 18L18 6M6 6l12 12",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-2.5 sm:mt-3 relative" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-2.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:mt-3']} */ ;
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
                $event.target.style.boxShadow = '0 0 0 3px var(--accent-glow)';
                // @ts-ignore
                [];
            } },
        ...{ onBlur: (...[$event]) => {
                if (!(__VLS_ctx.isOpen))
                    return;
                $event.target.style.borderColor = 'var(--border-primary)';
                $event.target.style.boxShadow = 'none';
                // @ts-ignore
                [];
            } },
        placeholder: "搜索模板...",
        ...{ class: "search-input w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all duration-200" },
        ...{ style: ({
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
            }) },
    });
    (__VLS_ctx.searchQuery);
    /** @type {__VLS_StyleScopedClasses['search-input']} */ ;
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
            ...{ class: "absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded cursor-pointer transition-colors" },
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
    if (!__VLS_ctx.searchQuery.trim()) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "shrink-0 lg:hidden overflow-x-auto cat-tabs-scroll" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['cat-tabs-scroll']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex gap-1 px-3 sm:px-4 py-2" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        for (const [cat] of __VLS_vFor((__VLS_ctx.templateCategories))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isOpen))
                            return;
                        if (!(!__VLS_ctx.searchQuery.trim()))
                            return;
                        __VLS_ctx.activeCategory = cat.id;
                        // @ts-ignore
                        [searchQuery, templateCategories, activeCategory,];
                    } },
                key: (cat.id),
                ...{ class: "cat-pill shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 whitespace-nowrap" },
                ...{ style: (__VLS_ctx.activeCategory === cat.id ? {
                        background: cat.color + '15',
                        color: cat.color,
                        border: '1px solid ' + cat.color + '30',
                    } : {
                        color: 'var(--text-tertiary)',
                        border: '1px solid var(--border-primary)',
                        background: 'transparent',
                    }) },
            });
            /** @type {__VLS_StyleScopedClasses['cat-pill']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
            /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
            (cat.name);
            // @ts-ignore
            [activeCategory,];
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-hidden flex min-h-0" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-h-0']} */ ;
    if (!__VLS_ctx.searchQuery.trim()) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
            ...{ class: "w-44 shrink-0 overflow-y-auto py-2 px-2 hidden lg:block sidebar-scroll" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['w-44']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['lg:block']} */ ;
        /** @type {__VLS_StyleScopedClasses['sidebar-scroll']} */ ;
        for (const [cat] of __VLS_vFor((__VLS_ctx.templateCategories))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isOpen))
                            return;
                        if (!(!__VLS_ctx.searchQuery.trim()))
                            return;
                        __VLS_ctx.activeCategory = cat.id;
                        // @ts-ignore
                        [searchQuery, templateCategories, activeCategory,];
                    } },
                key: (cat.id),
                ...{ class: "cat-btn w-full text-left px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-2.5 mb-0.5" },
                ...{ style: (__VLS_ctx.activeCategory === cat.id ? {
                        background: cat.color + '12',
                        color: cat.color,
                    } : {
                        color: 'var(--text-secondary)',
                    }) },
            });
            /** @type {__VLS_StyleScopedClasses['cat-btn']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-150']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['mb-0.5']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "cat-icon w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0" },
                ...{ style: (__VLS_ctx.activeCategory === cat.id ? { background: cat.color + '20', color: cat.color } : { background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }) },
            });
            /** @type {__VLS_StyleScopedClasses['cat-icon']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
            const __VLS_0 = CatIcon;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
                name: (cat.id),
            }));
            const __VLS_2 = __VLS_1({
                name: (cat.id),
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-sm font-medium truncate" },
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['truncate']} */ ;
            (cat.name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "ml-auto text-[10px] font-mono tabular-nums" },
                ...{ style: ({ color: __VLS_ctx.activeCategory === cat.id ? cat.color : 'var(--text-tertiary)', opacity: 0.7 }) },
            });
            /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
            /** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
            (__VLS_ctx.getTemplateCount(cat.id));
            // @ts-ignore
            [activeCategory, activeCategory, activeCategory, getTemplateCount,];
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5 content-scroll" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['content-scroll']} */ ;
    if (!__VLS_ctx.searchQuery.trim()) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mb-2.5 flex items-center gap-2" },
        });
        /** @type {__VLS_StyleScopedClasses['mb-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm font-bold" },
            ...{ style: ({ color: __VLS_ctx.activeCategoryInfo.color }) },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        (__VLS_ctx.activeCategoryInfo.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-[10px] px-1.5 py-0.5 rounded-full font-mono" },
            ...{ style: ({ background: __VLS_ctx.activeCategoryInfo.color + '12', color: __VLS_ctx.activeCategoryInfo.color }) },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        (__VLS_ctx.filteredTemplates.length);
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    if (!(!__VLS_ctx.searchQuery.trim()))
                        return;
                    __VLS_ctx.$emit('select', __VLS_ctx.blankTemplate);
                    __VLS_ctx.$emit('close');
                    // @ts-ignore
                    [$emit, $emit, searchQuery, activeCategoryInfo, activeCategoryInfo, activeCategoryInfo, activeCategoryInfo, filteredTemplates, blankTemplate,];
                } },
            ...{ onMouseenter: (__VLS_ctx.onBlankEnter) },
            ...{ onMouseleave: (__VLS_ctx.onBlankLeave) },
            ...{ class: "tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden mb-2.5 sm:mb-3" },
            ...{ style: ({
                    border: '1px dashed var(--border-primary)',
                    background: 'var(--bg-secondary)',
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['tmpl-card']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
        /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
        /** @type {__VLS_StyleScopedClasses['group']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:mb-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center gap-3" },
        });
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-9 h-9 rounded-lg flex items-center justify-center shrink-0" },
            ...{ style: ({ background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-9']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-9']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-4.5 h-4.5" },
            ...{ style: {} },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "1.8",
            d: "M12 4v16m8-8H4",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "min-w-0" },
        });
        /** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
            ...{ class: "font-semibold text-sm" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs mt-0.5" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3" },
        });
        /** @type {__VLS_StyleScopedClasses['grid']} */ ;
        /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['sm:gap-3']} */ ;
        for (const [template] of __VLS_vFor((__VLS_ctx.filteredTemplates))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.isOpen))
                            return;
                        if (!(!__VLS_ctx.searchQuery.trim()))
                            return;
                        __VLS_ctx.$emit('select', template);
                        __VLS_ctx.$emit('close');
                        // @ts-ignore
                        [$emit, $emit, filteredTemplates, onBlankEnter, onBlankLeave,];
                    } },
                ...{ onMouseenter: (__VLS_ctx.onCardEnter) },
                ...{ onMouseleave: (__VLS_ctx.onCardLeave) },
                key: (template.id),
                ...{ class: "tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden" },
                ...{ style: ({
                        border: '1px solid var(--border-primary)',
                        background: 'var(--bg-secondary)',
                    }) },
            });
            /** @type {__VLS_StyleScopedClasses['tmpl-card']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
            /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
            /** @type {__VLS_StyleScopedClasses['group']} */ ;
            /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
            /** @type {__VLS_StyleScopedClasses['relative']} */ ;
            /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                ...{ class: "absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100" },
                ...{ style: ({ background: __VLS_ctx.activeCategoryInfo.color }) },
            });
            /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
            /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-active:opacity-100']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                ...{ class: "font-semibold text-sm group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-200" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:translate-x-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-active:translate-x-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
            (template.name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-xs mt-1 leading-relaxed" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
            (template.description);
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-active:opacity-60 transition-opacity duration-200" },
            });
            /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-active:opacity-60']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-[10px] font-medium px-1.5 py-0.5 rounded" },
                ...{ style: ({ background: __VLS_ctx.activeCategoryInfo.color + '10', color: __VLS_ctx.activeCategoryInfo.color }) },
            });
            /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
            /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" },
                ...{ style: ({ color: __VLS_ctx.activeCategoryInfo.color }) },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
            /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
            /** @type {__VLS_StyleScopedClasses['group-hover:translate-x-0.5']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2.5",
                d: "M9 5l7 7-7 7",
            });
            // @ts-ignore
            [activeCategoryInfo, activeCategoryInfo, activeCategoryInfo, activeCategoryInfo, onCardEnter, onCardLeave,];
        }
    }
    else {
        if (__VLS_ctx.searchResults.length > 0) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
            for (const [cat] of __VLS_vFor((__VLS_ctx.categoriesWithResults))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    key: (cat.id),
                    ...{ class: "mb-5" },
                });
                /** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "mb-2.5 flex items-center gap-2" },
                });
                /** @type {__VLS_StyleScopedClasses['mb-2.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
                /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                    ...{ class: "w-2 h-2 rounded-full" },
                    ...{ style: ({ background: cat.color }) },
                });
                /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
                /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
                /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "text-sm font-bold" },
                    ...{ style: ({ color: cat.color }) },
                });
                /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
                /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
                (cat.name);
                __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "text-[10px] px-1.5 py-0.5 rounded-full font-mono" },
                    ...{ style: ({ background: cat.color + '12', color: cat.color }) },
                });
                /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
                /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
                /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
                (__VLS_ctx.getSearchCount(cat.id));
                __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3" },
                });
                /** @type {__VLS_StyleScopedClasses['grid']} */ ;
                /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
                /** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
                /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
                /** @type {__VLS_StyleScopedClasses['sm:gap-3']} */ ;
                for (const [template] of __VLS_vFor((__VLS_ctx.getSearchResults(cat.id)))) {
                    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                        ...{ onClick: (...[$event]) => {
                                if (!(__VLS_ctx.isOpen))
                                    return;
                                if (!!(!__VLS_ctx.searchQuery.trim()))
                                    return;
                                if (!(__VLS_ctx.searchResults.length > 0))
                                    return;
                                __VLS_ctx.$emit('select', template);
                                __VLS_ctx.$emit('close');
                                // @ts-ignore
                                [$emit, $emit, searchResults, categoriesWithResults, getSearchCount, getSearchResults,];
                            } },
                        ...{ onMouseenter: (__VLS_ctx.onCardEnter) },
                        ...{ onMouseleave: (__VLS_ctx.onCardLeave) },
                        key: (template.id),
                        ...{ class: "tmpl-card text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden" },
                        ...{ style: ({
                                border: '1px solid var(--border-primary)',
                                background: 'var(--bg-secondary)',
                            }) },
                    });
                    /** @type {__VLS_StyleScopedClasses['tmpl-card']} */ ;
                    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
                    /** @type {__VLS_StyleScopedClasses['p-3']} */ ;
                    /** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
                    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
                    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group']} */ ;
                    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
                    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
                    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
                        ...{ class: "absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100" },
                        ...{ style: ({ background: cat.color }) },
                    });
                    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
                    /** @type {__VLS_StyleScopedClasses['left-0']} */ ;
                    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
                    /** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
                    /** @type {__VLS_StyleScopedClasses['w-[3px]']} */ ;
                    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
                    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
                    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-active:opacity-100']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                        ...{ class: "font-semibold text-sm group-hover:translate-x-1 group-active:translate-x-1 transition-transform duration-200" },
                        ...{ style: {} },
                    });
                    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
                    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-hover:translate-x-1']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-active:translate-x-1']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
                    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
                    (template.name);
                    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                        ...{ class: "text-xs mt-1 leading-relaxed" },
                        ...{ style: {} },
                    });
                    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
                    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
                    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
                    (template.description);
                    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                        ...{ class: "mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 group-active:opacity-60 transition-opacity duration-200" },
                    });
                    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
                    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
                    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
                    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
                    /** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-hover:opacity-100']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-active:opacity-60']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
                    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                        ...{ class: "text-[10px] font-medium px-1.5 py-0.5 rounded" },
                        ...{ style: ({ background: cat.color + '10', color: cat.color }) },
                    });
                    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
                    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
                    /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
                    /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
                    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                        ...{ class: "w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" },
                        ...{ style: ({ color: cat.color }) },
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                    });
                    /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
                    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
                    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
                    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
                    /** @type {__VLS_StyleScopedClasses['group-hover:translate-x-0.5']} */ ;
                    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                        'stroke-linecap': "round",
                        'stroke-linejoin': "round",
                        'stroke-width': "2.5",
                        d: "M9 5l7 7-7 7",
                    });
                    // @ts-ignore
                    [onCardEnter, onCardLeave,];
                }
                // @ts-ignore
                [];
            }
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex flex-col items-center justify-center py-12" },
            });
            /** @type {__VLS_StyleScopedClasses['flex']} */ ;
            /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
            /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
            /** @type {__VLS_StyleScopedClasses['py-12']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-10 h-10 mb-2" },
                ...{ style: {} },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-10']} */ ;
            /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "1.5",
                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-sm" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        }
    }
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
