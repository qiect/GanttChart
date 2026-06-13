import { ref } from 'vue';
export function useLocalStorage(key, initialValue) {
    const stored = ref((() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch {
            return initialValue;
        }
    })());
    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(stored.value) : value;
        stored.value = valueToStore;
        try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch {
            // localStorage may be full or unavailable
        }
    };
    return [stored, setValue];
}
