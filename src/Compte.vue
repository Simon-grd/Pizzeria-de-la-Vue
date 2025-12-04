<template>
  <div class="page">
    <h2>Créer un compte</h2>
    <form @submit.prevent="handleSubmit" class="account-form">
      <label for="nom">Nom</label>
      <input type="text" id="nom" v-model="form.nom" required>
      
      <label for="prenom">Prénom</label>
      <input type="text" id="prenom" v-model="form.prenom" required>
      
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" required>
      
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="form.password" @input="validatePassword" required>
      <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
      <p class="password-hint">Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial</p>
      
      <label for="address">Adresse</label>
      <input type="text" id="address" v-model="form.address" required>
      
      <label for="phone">Téléphone</label>
      <input type="tel" id="phone" v-model="form.phone" required>
      
      <button type="submit" class="submit-button">Créer mon compte</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userStore } from './UserStore.js'

const emit = defineEmits(['account-created'])

const form = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  address: '',
  phone: ''
})

const passwordError = ref('')

const isPasswordValid = computed(() => {
  const password = form.value.password
  if (password.length < 8) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false
  return true
})

function validatePassword() {
  const password = form.value.password
  if (password.length === 0) {
    passwordError.value = ''
    return
  }
  if (password.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }
  if (!/[A-Z]/.test(password)) {
    passwordError.value = 'Le mot de passe doit contenir au moins une majuscule'
    return
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordError.value = 'Le mot de passe doit contenir au moins un caractère spécial'
    return
  }
  passwordError.value = ''
}

function handleSubmit() {
  if (!isPasswordValid.value) {
    alert('Le mot de passe ne respecte pas les critères de sécurité')
    return
  }
  userStore.createAccount({ ...form.value })
  alert('Compte créé avec succès !')
  form.value = { nom: '', prenom: '', email: '', password: '', address: '', phone: '' }
  passwordError.value = ''
  emit('account-created')
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

.account-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 500px;
  margin: 0 auto;
}

.account-form label {
  font-weight: bold;
  margin-bottom: -0.5rem;
}

.account-form input {
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

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin: -0.5rem 0 0 0;
}

.password-hint {
  color: #666;
  font-size: 0.8rem;
  margin: -0.5rem 0 0 0;
  font-style: italic;
}
</style>
