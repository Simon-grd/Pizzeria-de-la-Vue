<script setup>
import { store } from './Pizzas.js'
import { computed } from 'vue'

function ajouterAuPanier(pizza) {
  store.increment(pizza)
}
</script>

<template>
  <div class="page-accueil">
    <h2>Nos Pizzas</h2>
    <div class="liste-pizzas">
      <div v-for="pizza in store.pizzas" :key="pizza.name" class="pizza-card">
        <img :src="pizza.image" :alt="'Image de ' + pizza.name" class="pizza-image">
        <h3>{{ pizza.name }}</h3>
        <p class="description">{{ pizza.description }}</p>
        <p class="price">{{ pizza.price }}€</p>
        <div v-if="pizza.quantity > 0" class="controls">
          <button @click="store.decrement(pizza)">-</button>
          <span class="quantity">{{ pizza.quantity }}</span>
          <button @click="store.increment(pizza)">+</button>
        </div>
        <button v-else @click="ajouterAuPanier(pizza)">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-accueil h2 {
  text-align: left;
  margin-top: 0;
}
.page-accueil {
  padding: 1rem;
  margin-bottom: 1.5rem;
}
.liste-pizzas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.pizza-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.pizza-card h3 {
  margin: 0.5rem 0;
}

.description {
  font-size: 0.85rem;
  color: #666;
  margin: 0.5rem 0;
  line-height: 1.4;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #42b983;
  margin: 0.5rem 0;
}

.pizza-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: transform 0.3s ease; 
}
.pizza-image:hover {
  animation: spin 7s linear infinite;
  cursor: pointer;
}

@keyframes spin {
  0% {
    transform: scale(1.5) translateY(-10px) rotate(0deg);
  }
  100% {
    transform: scale(1.5) translateY(-10px) rotate(360deg);
  }
}
.pizza-card button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;
}

.pizza-card button:hover {
  background-color: #36a476;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.controls button {
  width: 40px;
  height: 40px;
  padding: 0; 
}
</style>