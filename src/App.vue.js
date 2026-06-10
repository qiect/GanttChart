/// <reference types="../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, watch, onMounted } from 'vue';
import SplitPane from './components/SplitPane.vue';
import MermaidEditor from './components/MermaidEditor.vue';
import VisualEditor from './components/VisualEditor.vue';
import GanttPreview from './components/GanttPreview.vue';
import Toolbar from './components/Toolbar.vue';
import StatusBar from './components/StatusBar.vue';
import TemplateModal from './components/TemplateModal.vue';
import Toast from './components/Toast.vue';
import { useLocalStorage } from './composables/useLocalStorage';
import { ganttTemplates } from './utils/mermaidTemplates';
const DEFAULT_CODE = ganttTemplates[0].code;
const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE);
const [theme, setTheme] = useLocalStorage('gantt-studio-theme', 'light');
const [, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.3);
const [editorMode, setEditorMode] = useLocalStorage('gantt-studio-editor-mode', 'visual');
const [chartTheme, setChartTheme] = useLocalStorage('gantt-studio-chart-theme', 'indigo');
const isTemplateOpen = ref(false);
const hasError = ref(false);
const showSaveToast = ref(false);
const previewContainerRef = ref(null);
const debounceTimer = ref(null);
const debouncedCode = ref(code.value);
watch(code, (newVal) => {
    if (debounceTimer.value)
        clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
        debouncedCode.value = newVal;
    }, 300);
}, { immediate: true });
// Get chart element for export - search more broadly
const chartElement = computed(() => {
    if (!previewContainerRef.value)
        return null;
    const svgParent = previewContainerRef.value.querySelector('.flex.justify-center')
        || previewContainerRef.value.querySelector('svg')?.parentElement
        || previewContainerRef.value.querySelector('[class*="mermaid"]')
        || previewContainerRef.value.querySelector('.overflow-auto');
    return svgParent || null;
});
const handleCodeChange = (newCode) => {
    setCode(newCode);
};
const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
};
const handleRatioChange = (ratio) => {
    setSplitRatio(ratio);
};
const handleEditorModeChange = (mode) => {
    setEditorMode(mode);
};
const handleChartThemeChange = (newChartTheme) => {
    setChartTheme(newChartTheme);
};
const handleSave = () => {
    // 显式写入 localStorage（useLocalStorage 已自动持久化，此处确保覆盖并提示）
    try {
        window.localStorage.setItem('gantt-studio-code', JSON.stringify(code.value));
        window.localStorage.setItem('gantt-studio-theme', JSON.stringify(theme.value));
        window.localStorage.setItem('gantt-studio-chart-theme', JSON.stringify(chartTheme.value));
        window.localStorage.setItem('gantt-studio-editor-mode', JSON.stringify(editorMode.value));
    }
    catch {
        // localStorage may be full or unavailable
    }
    showSaveToast.value = false;
    requestAnimationFrame(() => {
        showSaveToast.value = true;
    });
};
const handleTemplateSelect = (template) => {
    setCode(template.code);
    isTemplateOpen.value = false;
};
onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "h-screen flex flex-col" },
    ...{ class: (__VLS_ctx.theme === 'dark' ? 'dark' : '') },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
const __VLS_0 = Toolbar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onCodeChange': {} },
    ...{ 'onThemeChange': {} },
    ...{ 'onOpenTemplate': {} },
    ...{ 'onEditorModeChange': {} },
    ...{ 'onSave': {} },
    code: (__VLS_ctx.code),
    theme: (__VLS_ctx.theme),
    chartElement: (__VLS_ctx.chartElement),
    editorMode: (__VLS_ctx.editorMode),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onCodeChange': {} },
    ...{ 'onThemeChange': {} },
    ...{ 'onOpenTemplate': {} },
    ...{ 'onEditorModeChange': {} },
    ...{ 'onSave': {} },
    code: (__VLS_ctx.code),
    theme: (__VLS_ctx.theme),
    chartElement: (__VLS_ctx.chartElement),
    editorMode: (__VLS_ctx.editorMode),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    ...{ codeChange: {} },
    onCodeChange: (__VLS_ctx.handleCodeChange),
    ...{ themeChange: {} },
    onThemeChange: (__VLS_ctx.handleThemeChange),
    ...{ openTemplate: {} },
    onOpenTemplate: (...[$event]) => {
        __VLS_ctx.isTemplateOpen = true;
        // @ts-ignore
        [theme, theme, code, chartElement, editorMode, handleCodeChange, handleThemeChange, isTemplateOpen,];
    },
    ...{ editorModeChange: {} },
    onEditorModeChange: (__VLS_ctx.handleEditorModeChange),
    ...{ save: {} },
    onSave: (__VLS_ctx.handleSave),
};
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1 overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
const __VLS_7 = SplitPane || SplitPane;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ 'onRatioChange': {} },
    defaultRatio: (0.3),
}));
const __VLS_9 = __VLS_8({
    ...{ 'onRatioChange': {} },
    defaultRatio: (0.3),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = {
    ...{ ratioChange: {} },
    onRatioChange: (__VLS_ctx.handleRatioChange),
};
const { default: __VLS_14 } = __VLS_10.slots;
{
    const { left: __VLS_15 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full flex flex-col" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-3 md:px-4 py-2 text-xs font-medium border-b flex items-center gap-2" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-1.5 h-1.5 rounded-full" },
        ...{ style: ({ background: 'var(--accent)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    (__VLS_ctx.editorMode === 'code' ? 'Mermaid 编辑器' : '可视化编辑器');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    if (__VLS_ctx.editorMode === 'code') {
        const __VLS_16 = MermaidEditor;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }));
        const __VLS_18 = __VLS_17({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    }
    else {
        const __VLS_21 = VisualEditor;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }));
        const __VLS_23 = __VLS_22({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    }
    // @ts-ignore
    [theme, theme, code, code, editorMode, editorMode, handleEditorModeChange, handleSave, handleRatioChange,];
}
{
    const { right: __VLS_26 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "previewContainerRef",
        ...{ class: "h-full" },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full flex flex-col" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "px-3 md:px-4 py-2 text-xs font-medium border-b flex items-center gap-2" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['md:px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "w-1.5 h-1.5 rounded-full" },
        ...{ style: ({ background: 'var(--success)' }) },
    });
    /** @type {__VLS_StyleScopedClasses['w-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    const __VLS_27 = GanttPreview;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onErrorChange': {} },
        ...{ 'onChartThemeChange': {} },
        code: (__VLS_ctx.debouncedCode),
        theme: (__VLS_ctx.theme),
        chartTheme: (__VLS_ctx.chartTheme),
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onErrorChange': {} },
        ...{ 'onChartThemeChange': {} },
        code: (__VLS_ctx.debouncedCode),
        theme: (__VLS_ctx.theme),
        chartTheme: (__VLS_ctx.chartTheme),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = {
        ...{ errorChange: {} },
        onErrorChange: (...[$event]) => {
            __VLS_ctx.hasError = $event;
            // @ts-ignore
            [theme, debouncedCode, chartTheme, hasError,];
        },
        ...{ chartThemeChange: {} },
        onChartThemeChange: (__VLS_ctx.handleChartThemeChange),
    };
    var __VLS_30;
    var __VLS_31;
    // @ts-ignore
    [handleChartThemeChange,];
}
// @ts-ignore
[];
var __VLS_10;
var __VLS_11;
const __VLS_34 = StatusBar;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    code: (__VLS_ctx.code),
    hasError: (__VLS_ctx.hasError),
    theme: (__VLS_ctx.theme),
}));
const __VLS_36 = __VLS_35({
    code: (__VLS_ctx.code),
    hasError: (__VLS_ctx.hasError),
    theme: (__VLS_ctx.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const __VLS_39 = TemplateModal;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    ...{ 'onClose': {} },
    ...{ 'onSelect': {} },
    isOpen: (__VLS_ctx.isTemplateOpen),
}));
const __VLS_41 = __VLS_40({
    ...{ 'onClose': {} },
    ...{ 'onSelect': {} },
    isOpen: (__VLS_ctx.isTemplateOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_44;
const __VLS_45 = {
    ...{ close: {} },
    onClose: (...[$event]) => {
        __VLS_ctx.isTemplateOpen = false;
        // @ts-ignore
        [theme, code, isTemplateOpen, isTemplateOpen, hasError,];
    },
    ...{ select: {} },
    onSelect: (__VLS_ctx.handleTemplateSelect),
};
var __VLS_42;
var __VLS_43;
const __VLS_46 = Toast;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    message: "已保存到浏览器缓存",
    show: (__VLS_ctx.showSaveToast),
}));
const __VLS_48 = __VLS_47({
    message: "已保存到浏览器缓存",
    show: (__VLS_ctx.showSaveToast),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
// @ts-ignore
[handleTemplateSelect, showSaveToast,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
