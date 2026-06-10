import { ref, watch } from 'vue';
export function useDebounce(value, delay) {
    const debouncedValue = ref(value.value);
    watch(value, (newVal) => {
        const timer = setTimeout(() => {
            debouncedValue.value = newVal;
        }, delay);
        const stopWatch = watch(value, () => {
            clearTimeout(timer);
            stopWatch();
        }, { flush: 'sync' });
    });
    return debouncedValue;
}
