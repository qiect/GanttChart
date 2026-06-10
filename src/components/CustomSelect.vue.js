/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
const props = withDefaults(defineProps(), {
    placeholder: '',
});
const emit = defineEmits();
const isOpen = ref(false);
const selectRef = ref(null);
const dropdownRef = ref(null);
const dropdownStyle = ref({});
const displayValue = computed(() => {
    const opt = props.options.find(o => o.value === props.modelValue);
    return opt ? opt.label : props.placeholder || props.modelValue;
});
const updatePosition = () => {
    if (!selectRef.value || !isOpen.value)
        return;
    const rect = selectRef.value.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const dropdownH = Math.min(props.options.length * 36 + 8, 200);
    const spaceBelow = viewportH - rect.bottom;
    const openAbove = spaceBelow < dropdownH && rect.top > dropdownH;
    dropdownStyle.value = {
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        ...(openAbove
            ? { bottom: `${viewportH - rect.top + 4}px` }
            : { top: `${rect.bottom + 4}px` }),
    };
};
watch(isOpen, async (val) => {
    if (val) {
        await nextTick();
        updatePosition();
    }
});
const selectOption = (value) => {
    emit('update:modelValue', value);
    emit('change', value);
    isOpen.value = false;
};
const handleClickOutside = (e) => {
    const target = e.target;
    if (selectRef.value && !selectRef.value.contains(target) &&
        dropdownRef.value && !dropdownRef.value.contains(target)) {
        isOpen.value = false;
    }
};
const handleScroll = () => {
    if (isOpen.value)
        updatePosition();
};
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
});
onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('resize', handleScroll);
});
const __VLS_defaults = {
    placeholder: '',
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
    ...{ class: "custom-select" },
    ref: "selectRef",
});
/** @type {__VLS_StyleScopedClasses['custom-select']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
            // @ts-ignore
            [isOpen, isOpen,];
        } },
    type: "button",
    ...{ class: "custom-select-trigger w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer text-left" },
    ...{ style: ({
            border: __VLS_ctx.isOpen ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            boxShadow: __VLS_ctx.isOpen ? '0 0 0 3px var(--accent-glow)' : 'none',
        }) },
});
/** @type {__VLS_StyleScopedClasses['custom-select-trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "truncate" },
});
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
(__VLS_ctx.displayValue);
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-3.5 h-3.5 shrink-0 ml-1.5 transition-transform duration-200" },
    ...{ style: ({ transform: __VLS_ctx.isOpen ? 'rotate(180deg)' : 'rotate(0)', color: __VLS_ctx.isOpen ? 'var(--accent)' : 'var(--text-tertiary)' }) },
    viewBox: "0 0 16 16",
    fill: "currentColor",
});
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M4.47 5.97a.75.75 0 011.06 0L8 8.44l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z",
});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Teleport | typeof __VLS_components.Teleport} */
Teleport;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "body",
}));
const __VLS_2 = __VLS_1({
    to: "body",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "select-dropdown",
}));
const __VLS_8 = __VLS_7({
    name: "select-dropdown",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "custom-select-dropdown fixed z-[9999] overflow-hidden" },
        ref: "dropdownRef",
        ...{ style: ({
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                ...__VLS_ctx.dropdownStyle,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['custom-select-dropdown']} */ ;
    /** @type {__VLS_StyleScopedClasses['fixed']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-[9999]']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "py-1 max-h-48 overflow-y-auto" },
    });
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
    for (const [option] of __VLS_vFor((__VLS_ctx.options))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    $event.target.style.background = 'var(--accent-subtle)';
                    // @ts-ignore
                    [isOpen, isOpen, isOpen, isOpen, isOpen, displayValue, dropdownStyle, options,];
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    $event.target.style.background = __VLS_ctx.modelValue === option.value ? 'var(--accent-subtle)' : 'transparent';
                    // @ts-ignore
                    [modelValue,];
                } },
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    __VLS_ctx.selectOption(option.value);
                    // @ts-ignore
                    [selectOption,];
                } },
            key: (option.value),
            type: "button",
            ...{ class: "w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors duration-100 flex items-center gap-2" },
            ...{ style: ({
                    color: __VLS_ctx.modelValue === option.value ? 'var(--accent)' : 'var(--text-primary)',
                    background: __VLS_ctx.modelValue === option.value ? 'var(--accent-subtle)' : 'transparent',
                    fontWeight: __VLS_ctx.modelValue === option.value ? 600 : 400,
                }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        /** @type {__VLS_StyleScopedClasses['duration-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
        if (__VLS_ctx.modelValue === option.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "w-1 h-1 rounded-full shrink-0" },
                ...{ style: ({ background: 'var(--accent)' }) },
            });
            /** @type {__VLS_StyleScopedClasses['w-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "w-1 h-1 rounded-full shrink-0" },
                ...{ style: {} },
            });
            /** @type {__VLS_StyleScopedClasses['w-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-1']} */ ;
            /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
            /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        }
        (option.label);
        // @ts-ignore
        [modelValue, modelValue, modelValue, modelValue,];
    }
}
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __defaults: __VLS_defaults,
    __typeProps: {},
});
export default {};
