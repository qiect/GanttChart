/// <reference types="../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, watch, onMounted, onUnmounted } from 'vue';
import SplitPane from './components/SplitPane.vue';
import MermaidEditor from './components/MermaidEditor.vue';
import VisualEditor from './components/VisualEditor.vue';
import GanttPreview from './components/GanttPreview.vue';
import Toolbar from './components/Toolbar.vue';
import StatusBar from './components/StatusBar.vue';
import TemplateModal from './components/TemplateModal.vue';
import Toast from './components/Toast.vue';
import { useLocalStorage } from './composables/useLocalStorage';
import { blankTemplate } from './utils/mermaidTemplates';
const DEFAULT_CODE = blankTemplate.code;
const [code, setCode] = useLocalStorage('gantt-studio-code', DEFAULT_CODE);
const [theme, setTheme] = useLocalStorage('gantt-studio-theme', 'light');
const [, setSplitRatio] = useLocalStorage('gantt-studio-split', 0.3);
const [editorMode, setEditorMode] = useLocalStorage('gantt-studio-editor-mode', 'visual');
const [chartTheme, setChartTheme] = useLocalStorage('gantt-studio-chart-theme', 'aizuri');
const isTemplateOpen = ref(false);
const hasError = ref(false);
const showSaveToast = ref(false);
const previewContainerRef = ref(null);
const isMobile = ref(false);
const isPhone = ref(false);
const mobileTab = ref('editor');
const debounceTimer = ref(null);
const debouncedCode = ref(code.value);
watch(code, (newVal) => {
    if (debounceTimer.value)
        clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
        debouncedCode.value = newVal;
    }, 300);
}, { immediate: true });
const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
    isPhone.value = window.innerWidth < 768;
};
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.documentElement.setAttribute('data-theme', theme.value);
});
onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});
// Get chart element for export - find the SVG wrapper inside GanttPreview at export time
const getChartElement = () => {
    if (!previewContainerRef.value)
        return null;
    return previewContainerRef.value.querySelector('.gantt-svg-wrapper')
        || previewContainerRef.value.querySelector('svg')?.parentElement
        || null;
};
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
const handleMobileTabChange = (tab) => {
    mobileTab.value = tab;
};
const handleSave = () => {
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
    // 选择模板后自动切到预览
    if (isMobile.value) {
        mobileTab.value = 'preview';
    }
};
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
    ...{ 'onMobileTabChange': {} },
    code: (__VLS_ctx.code),
    theme: (__VLS_ctx.theme),
    getChartElement: (__VLS_ctx.getChartElement),
    editorMode: (__VLS_ctx.editorMode),
    mobileTab: (__VLS_ctx.mobileTab),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onCodeChange': {} },
    ...{ 'onThemeChange': {} },
    ...{ 'onOpenTemplate': {} },
    ...{ 'onEditorModeChange': {} },
    ...{ 'onSave': {} },
    ...{ 'onMobileTabChange': {} },
    code: (__VLS_ctx.code),
    theme: (__VLS_ctx.theme),
    getChartElement: (__VLS_ctx.getChartElement),
    editorMode: (__VLS_ctx.editorMode),
    mobileTab: (__VLS_ctx.mobileTab),
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
        [theme, theme, code, getChartElement, editorMode, mobileTab, handleCodeChange, handleThemeChange, isTemplateOpen,];
    },
    ...{ editorModeChange: {} },
    onEditorModeChange: (__VLS_ctx.handleEditorModeChange),
    ...{ save: {} },
    onSave: (__VLS_ctx.handleSave),
    ...{ mobileTabChange: {} },
    onMobileTabChange: (__VLS_ctx.handleMobileTabChange),
};
var __VLS_3;
var __VLS_4;
if (!__VLS_ctx.isMobile) {
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
            ...{ class: "px-4 py-2 text-xs font-medium border-b flex items-center gap-2.5" },
            ...{ style: {} },
        });
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-2.5']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-5 h-5 rounded-md flex items-center justify-center" },
            ...{ style: ({ background: 'var(--accent-subtle)' }) },
        });
        /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        if (__VLS_ctx.editorMode === 'code') {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-3 h-3" },
                ...{ style: ({ color: 'var(--accent)' }) },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2",
                d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            });
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-3 h-3" },
                ...{ style: ({ color: 'var(--accent)' }) },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2",
                d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z",
            });
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.editorMode === 'code' ? 'Mermaid 编辑器' : '可视化编辑器');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-[10px] px-1.5 py-0.5 rounded font-mono" },
            ...{ style: ({ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-secondary)' }) },
        });
        /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        (__VLS_ctx.editorMode === 'code' ? 'Code' : 'Visual');
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
        [theme, theme, code, code, editorMode, editorMode, editorMode, editorMode, handleEditorModeChange, handleSave, handleMobileTabChange, isMobile, handleRatioChange,];
    }
    {
        const { right: __VLS_26 } = __VLS_10.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ref: "previewContainerRef",
            ...{ class: "h-full" },
        });
        /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
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
                if (!(!__VLS_ctx.isMobile))
                    return;
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
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full flex flex-col" },
        ...{ style: {} },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.mobileTab === 'editor') }, null, null);
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 overflow-hidden" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
    if (__VLS_ctx.editorMode === 'code') {
        const __VLS_34 = MermaidEditor;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }));
        const __VLS_36 = __VLS_35({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    }
    else {
        const __VLS_39 = VisualEditor;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }));
        const __VLS_41 = __VLS_40({
            modelValue: (__VLS_ctx.code),
            theme: (__VLS_ctx.theme),
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ref: "previewContainerRef",
        ...{ class: "h-full" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.mobileTab === 'preview') }, null, null);
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    const __VLS_44 = GanttPreview;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
        ...{ 'onErrorChange': {} },
        ...{ 'onChartThemeChange': {} },
        code: (__VLS_ctx.debouncedCode),
        theme: (__VLS_ctx.theme),
        chartTheme: (__VLS_ctx.chartTheme),
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onErrorChange': {} },
        ...{ 'onChartThemeChange': {} },
        code: (__VLS_ctx.debouncedCode),
        theme: (__VLS_ctx.theme),
        chartTheme: (__VLS_ctx.chartTheme),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_49;
    const __VLS_50 = {
        ...{ errorChange: {} },
        onErrorChange: (...[$event]) => {
            if (!!(!__VLS_ctx.isMobile))
                return;
            __VLS_ctx.hasError = $event;
            // @ts-ignore
            [theme, theme, theme, code, code, editorMode, mobileTab, mobileTab, debouncedCode, chartTheme, hasError,];
        },
        ...{ chartThemeChange: {} },
        onChartThemeChange: (__VLS_ctx.handleChartThemeChange),
    };
    var __VLS_47;
    var __VLS_48;
}
const __VLS_51 = StatusBar;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    code: (__VLS_ctx.code),
    hasError: (__VLS_ctx.hasError),
    theme: (__VLS_ctx.theme),
}));
const __VLS_53 = __VLS_52({
    code: (__VLS_ctx.code),
    hasError: (__VLS_ctx.hasError),
    theme: (__VLS_ctx.theme),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const __VLS_56 = TemplateModal;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    ...{ 'onClose': {} },
    ...{ 'onSelect': {} },
    isOpen: (__VLS_ctx.isTemplateOpen),
}));
const __VLS_58 = __VLS_57({
    ...{ 'onClose': {} },
    ...{ 'onSelect': {} },
    isOpen: (__VLS_ctx.isTemplateOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
let __VLS_61;
const __VLS_62 = {
    ...{ close: {} },
    onClose: (...[$event]) => {
        __VLS_ctx.isTemplateOpen = false;
        // @ts-ignore
        [theme, code, isTemplateOpen, isTemplateOpen, hasError, handleChartThemeChange,];
    },
    ...{ select: {} },
    onSelect: (__VLS_ctx.handleTemplateSelect),
};
var __VLS_59;
var __VLS_60;
const __VLS_63 = Toast;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    message: "已保存到浏览器缓存",
    show: (__VLS_ctx.showSaveToast),
}));
const __VLS_65 = __VLS_64({
    message: "已保存到浏览器缓存",
    show: (__VLS_ctx.showSaveToast),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
// @ts-ignore
[handleTemplateSelect, showSaveToast,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
