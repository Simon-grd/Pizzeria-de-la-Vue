<template>
  <div class="page">
    <h2>Se connecter</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required>
      
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="form.password" required>
      
      <button type="submit" class="submit-button">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from './UserStore.js'

const emit = defineEmits(['login-success'])

const form = ref({
  email: '',
  password: ''
})

function handleLogin() {
  const success = userStore.login(form.value.email, form.value.password)
  
  if (success) {
    alert('Connexion réussie !')
    form.value = { email: '', password: '' }
    emit('login-success')
  } else {
    alert('Email ou mot de passe incorrect')
  }
}
</script>

<style scoped>
.page {
  padding: 1rem;
}

.page h2 {
  color: #42b983;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
}

.login-form label {
  font-weight: bold;
  margin-bottom: -0.5rem;
}

.login-form input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.submit-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: #36a476;
}
</style>
