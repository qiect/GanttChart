/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../root/.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
const props = defineProps();
const emit = defineEmits();
const editorRef = ref(null);
let view = null;
// Flag to skip emitting when the change comes from external value sync
let isExternalUpdate = false;
const createEditor = () => {
    if (!editorRef.value)
        return;
    if (view) {
        view.destroy();
        view = null;
    }
    const updateListener = EditorView.updateListener.of((update) => {
        if (update.docChanged && !isExternalUpdate) {
            emit('update:modelValue', update.state.doc.toString());
        }
    });
    const themeExtensions = props.theme === 'dark' ? [oneDark] : [];
    const state = EditorState.create({
        doc: props.modelValue,
        extensions: [
            lineNumbers(),
            highlightActiveLine(),
            history(),
            bracketMatching(),
            syntaxHighlighting(defaultHighlightStyle),
            keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
            updateListener,
            EditorView.lineWrapping,
            ...themeExtensions,
            EditorView.theme({
                '&': { height: '100%' },
                '.cm-scroller': { overflow: 'auto' },
                '.cm-content': {
                    fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
                    fontSize: '13px',
                },
            }),
        ],
    });
    view = new EditorView({
        state,
        parent: editorRef.value,
    });
};
onMounted(() => {
    createEditor();
});
onUnmounted(() => {
    if (view) {
        view.destroy();
        view = null;
    }
});
watch(() => props.theme, () => {
    createEditor();
});
watch(() => props.modelValue, (newVal) => {
    if (!view)
        return;
    const currentValue = view.state.doc.toString();
    if (currentValue !== newVal) {
        isExternalUpdate = true;
        view.dispatch({
            changes: { from: 0, to: currentValue.length, insert: newVal },
        });
        isExternalUpdate = false;
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ref: "editorRef",
    ...{ class: "h-full w-full" },
});
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
