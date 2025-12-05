<script setup>
import { ref, computed } from 'vue'
import HomePage from './Accueil.vue'
import CartPage from './Panier.vue'
import Histoire from './Histoire.vue'
import Valeurs from './Valeurs.vue'
import MentionsLegales from './MentionsLegales.vue'
import CGV from './CGV.vue'
import Confidentialite from './Confidentialite.vue'
import Contact from './Contact.vue'
import Horaires from './Horaires.vue'
import Compte from './Compte.vue'
import MonCompte from './MonCompte.vue'
import Connexion from './Connexion.vue'
import { store } from './Pizzas.js'
import { userStore } from './UserStore.js'
import { themeStore } from './ThemeStore.js'

const Nompizzeria = "La Pizzeria de la Vue"
const currentPage = ref('home')

const totalItemsInCart = computed(() => {
  return store.pizzas.reduce((acc, pizza) => acc + pizza.quantity, 0)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<template>
  <div class="container" :class="{ 'dark-mode': themeStore.isDarkMode }">
    <header>
      <img src="/images/logo.png" alt="Logo de la pizzeria" class="logo" @click="currentPage = 'home'" />
      <nav>
        <div class="nav-left">
          <button v-if="!userStore.isLoggedIn && currentPage !== 'compte'" @click="currentPage = 'compte'">Créer un compte</button>
          <button v-if="!userStore.isLoggedIn && currentPage !== 'connexion'" @click="currentPage = 'connexion'">Se connecter</button>
          <button v-if="userStore.isLoggedIn && currentPage !== 'moncompte'" @click="currentPage = 'moncompte'">Mon compte</button>
        </div>
        <div class="nav-right">
          <button v-if="currentPage !== 'home'" @click="currentPage = 'home'">Accueil</button>
          <button v-if="currentPage !== 'cart'" @click="currentPage = 'cart'">
            Panier ({{ totalItemsInCart }})
          </button>
        </div>
      </nav>
    </header>
    <main>
      <HomePage v-if="currentPage === 'home'" />
      <CartPage v-else-if="currentPage === 'cart'" />
      <Histoire v-else-if="currentPage === 'histoire'" />
      <Valeurs v-else-if="currentPage === 'valeurs'" />
      <MentionsLegales v-else-if="currentPage === 'mentions'" />
      <CGV v-else-if="currentPage === 'cgv'" />
      <Confidentialite v-else-if="currentPage === 'confidentialite'" />
      <Contact v-else-if="currentPage === 'contact'" />
      <Horaires v-else-if="currentPage === 'horaires'" />
      <Compte v-else-if="currentPage === 'compte'" @account-created="currentPage = 'home'" />
      <Connexion v-else-if="currentPage === 'connexion'" @login-success="currentPage = 'home'" />
      <MonCompte v-else-if="currentPage === 'moncompte'" @logout="currentPage = 'home'" />
    </main>
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h3>À propos</h3>
          <a v-if="currentPage !== 'histoire'" @click="currentPage = 'histoire'">Notre histoire</a>
          <a v-if="currentPage !== 'valeurs'" @click="currentPage = 'valeurs'">Nos valeurs</a>
        </div>
        <div class="footer-section">
          <h3>Informations</h3>
          <a v-if="currentPage !== 'mentions'" @click="currentPage = 'mentions'">Mentions légales</a>
          <a v-if="currentPage !== 'cgv'" @click="currentPage = 'cgv'">CGV</a>
          <a v-if="currentPage !== 'confidentialite'" @click="currentPage = 'confidentialite'">Politique de confidentialité</a>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <a v-if="currentPage !== 'contact'" @click="currentPage = 'contact'">Nous contacter</a>
          <a v-if="currentPage !== 'horaires'" @click="currentPage = 'horaires'">Horaires</a>
        </div>
      </div>
      <p class="copyright">© 2025 {{ Nompizzeria }}</p>
    </footer>
    <button class="theme-toggle" @click="themeStore.toggle()">
      {{ themeStore.isDarkMode ? '☀️' : '🌙' }}
    </button>
    <button class="scroll-top" @click="scrollToTop">
      ↑
    </button>
  </div>
</template>

<style>
body {
  background-color: #f0f9f4; 
  color: #333;
  transition: background-color 0.3s, color 0.3s;
  margin: 0;
  padding: 0;
}

body.dark {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

body.dark * {
  color: #e0e0e0;
}

body.dark .pizza-card,
body.dark .suggestion-card,
body.dark .pizza-item,
body.dark .account-info,
body.dark .info-row,
body.dark .page {
  background-color: #2a2a2a;
  border-color: #444;
}

body.dark .pizza-card,
body.dark .suggestion-card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

body.dark input,
body.dark .payment-form input,
body.dark .account-form input {
  background-color: #333;
  border-color: #555;
  color: #e0e0e0;
}

body.dark .description,
body.dark .password-hint {
  color: #aaa;
}

body.dark h2,
body.dark h3,
body.dark h4 {
  color: #42b983;
}

body.dark .price {
  color: #42b983;
}

body.dark hr {
  border-color: #444;
}
</style>

<style scoped>
.container {
  padding: 0 1rem; 
  font-family: sans-serif;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;
}
.logo {
  height: 300px; 
  width: auto;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
}

nav {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 0.5rem;
}

nav button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;
  margin-left: 0.5rem;
}

nav button:hover {
  background-color: #36a476;
}

footer {
  margin-top: 3rem;
  padding: 2rem 0 1rem;
  border-top: 1px solid #eee;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-section h3 {
  margin: 0 0 0.5rem 0;
  color: #42b983;
  font-size: 1.1rem;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  margin-bottom: 0.3rem;
  transition: color 0.2s;
  cursor: pointer;
}

.footer-section a:hover {
  color: #42b983;
}

.copyright {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin: 0;
}

.theme-toggle {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 1000;
}

.theme-toggle:hover {
  background-color: #36a476;
  transform: scale(1.1);
}

.dark-mode {
  color: #e0e0e0;
}

.dark-mode header {
  border-bottom-color: #333;
}

.dark-mode footer {
  border-top-color: #333;
}

.dark-mode .footer-section a {
  color: #aaa;
}

.dark-mode .footer-section a:hover {
  color: #42b983;
}

.dark-mode .copyright {
  color: #666;
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 1000;
}

.scroll-top:hover {
  background-color: #36a476;
  transform: scale(1.1);
}

</style>
