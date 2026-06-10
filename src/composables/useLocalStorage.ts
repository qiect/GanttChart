import { ref, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): [Ref<T>, (value: T | ((prev: T) => T)) => void] {
  const stored = ref<T>((() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })()) as Ref<T>

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(stored.value) : value
    stored.value = valueToStore
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // localStorage may be full or unavailable
    }
  }

  return [stored, setValue]
}
