import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>

  watch(value, (newVal) => {
    const timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)

    const stopWatch = watch(value, () => {
      clearTimeout(timer)
      stopWatch()
    }, { flush: 'sync' })
  })

  return debouncedValue
}
