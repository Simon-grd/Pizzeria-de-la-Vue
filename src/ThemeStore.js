import { reactive, watch } from 'vue'

export const themeStore = reactive({
  isDarkMode: false,
  toggle() {
    this.isDarkMode = !this.isDarkMode
  }
})

watch(() => themeStore.isDarkMode, (isDark) => {
  document.body.classList.toggle('dark', isDark)
})
