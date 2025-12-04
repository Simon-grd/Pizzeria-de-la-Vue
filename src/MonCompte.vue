<template>
  <div class="page">
    <h2>Mon Compte</h2>
    <div v-if="userStore.user" class="account-info">
      <div class="info-row">
        <strong>Nom :</strong>
        <span>{{ userStore.user.nom }}</span>
      </div>
      <div class="info-row">
        <strong>Prénom :</strong>
        <span>{{ userStore.user.prenom }}</span>
      </div>
      <div class="info-row">
        <strong>Email :</strong>
        <span>{{ userStore.user.email }}</span>
      </div>
      <div class="info-row">
        <strong>Adresse :</strong>
        <span>{{ userStore.user.address }}</span>
      </div>
      <div class="info-row">
        <strong>Téléphone :</strong>
        <span>{{ userStore.user.phone }}</span>
      </div>
      <button @click="handleLogout" class="logout-button">Se déconnecter</button>
    </div>
  </div>
</template>

<script setup>
import { userStore } from './UserStore.js'

const emit = defineEmits(['logout'])

function handleLogout() {
  userStore.logout()
  emit('logout')
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

.account-info {
  max-width: 500px;
  margin: 0 auto;
}

.info-row {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.info-row strong {
  min-width: 120px;
  color: #333;
}

.info-row span {
  color: #666;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
  margin-top: 1.5rem;
  width: 100%;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>
