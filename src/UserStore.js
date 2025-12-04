import { reactive } from 'vue'

export const userStore = reactive({
  user: null,
  isLoggedIn: false,
  createAccount(userData) {
    this.user = userData
    this.isLoggedIn = true
  },
  logout() {
    this.user = null
    this.isLoggedIn = false
  }
})
