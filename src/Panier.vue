<script setup>
import { ref, computed } from 'vue'
import { store, cartItems, total } from './Pizzas.js'

const suggestedPizzas = computed(() => store.pizzas.filter(p => p.quantity === 0))

const showPaymentForm = ref(false)

function handlePayment() {
  // Simuler une validation de paiement
  alert('Paiement validé ! Votre commande est en préparation.')

  // Vider le panier en remettant les quantités à zéro
  cartItems.value.forEach(item => {
    const pizzaInStore = store.pizzas.find(p => p.name === item.name)
    if (pizzaInStore) {
      pizzaInStore.quantity = 0
    }
  })

  showPaymentForm.value = false
}
</script>

<template>
  <div class="cart-page">
    <h2>Votre Panier</h2>
    <div v-if="cartItems.length > 0 && !showPaymentForm">
      <div v-for="pizza in cartItems" :key="pizza.name" class="pizza-item">
        <span class="pizza-name">{{ pizza.name }} ({{ pizza.price }}€)</span>
        <div class="controls">
          <button @click="store.decrement(pizza)">-</button>
          <span class="quantity">{{ pizza.quantity }}</span>
          <button @click="store.increment(pizza)">+</button>
        </div>
      </div>
      <hr />
      <h3 class="total">Total : {{ total }}€</h3>
      <button @click="showPaymentForm = true" class="payment-button">Procéder au paiement</button>
      
      <div v-if="suggestedPizzas.length > 0" class="suggestions">
        <h3>Complétez votre commande</h3>
        <div class="suggestions-list">
          <div v-for="pizza in suggestedPizzas" :key="pizza.name" class="suggestion-card">
            <img :src="pizza.image" :alt="pizza.name" class="suggestion-image">
            <div class="suggestion-info">
              <div class="suggestion-details">
                <h4>{{ pizza.name }}</h4>
                <p class="description">{{ pizza.description }}</p>
              </div>
              <p class="price">{{ pizza.price }}€</p>
              <button @click="store.increment(pizza)">+ Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="showPaymentForm">
      <h3>Informations de paiement</h3>
      <form @submit.prevent="handlePayment" class="payment-form">
        <label for="name">Nom complet</label>
        <input type="text" id="name" required>
        <label for="address">Adresse de livraison</label>
        <input type="text" id="address" required>
        <label for="card">Numéro de carte de crédit</label>
        <input type="text" id="card" placeholder="xxxx-xxxx-xxxx-xxxx" required>
        <button type="submit" class="payment-button">Valider le paiement</button>
        <button type="button" @click="showPaymentForm = false" class="cancel-button">Annuler</button>
      </form>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 1rem;
}

.cart-page h2 {
  text-align: center;
  margin-top: 0;
}

.pizza-item, .total {
  /* Styles from App.vue */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.payment-button, .cancel-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.payment-button {
  background-color: #42b983;
  color: white;
}

.cancel-button {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.controls button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
  margin: 1rem auto;
}

.payment-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.suggestions {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.suggestions h3 {
  text-align: center;
  color: #42b983;
  margin-bottom: 1rem;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.suggestion-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s;
}

.suggestion-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.suggestion-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.suggestion-image:hover {
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    transform: scale(1.5) translateY(-10px) rotate(0deg);
  }
  100% {
    transform: scale(1.5) translateY(-10px) rotate(360deg);
  }
}

.suggestion-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.suggestion-details {
  flex: 1;
}

.suggestion-card h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1.1rem;
}

.suggestion-card .description {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.suggestion-card .price {
  margin: 0;
  font-weight: bold;
  font-size: 1.1rem;
  color: #42b983;
  min-width: 60px;
}

.suggestion-card button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.suggestion-card button:hover {
  background-color: #36a476;
}
</style>