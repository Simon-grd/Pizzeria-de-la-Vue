<script setup>
import { reactive, computed } from 'vue'

const pizzeriaName = "La Pizzeria de la Vue"

const pizzas = reactive([
  { name: 'Vugherita', price: 10, quantity: 0 },
  { name: '4 Vues', price: 13, quantity: 0 },
  { name: 'Vuronni', price: 12, quantity: 0 },
  { name: 'Vugétarienne', price: 11, quantity: 0 },
])

function increment(pizza) {
  pizza.quantity++
}

function decrement(pizza) {
  if (pizza.quantity > 0) {
    pizza.quantity--
  }
}

const total = computed(() => {
  return pizzas.reduce((acc, pizza) => acc + pizza.quantity * pizza.price, 0)
})
</script>
<template>
  <div>
    <h1>{{Nom.pizzeria}}</h1>
    <div v-for="pizza in pizzas" :key="pizza.name">
      <span>{{Nom.pizza}} ({{Prix.pizza}}€)</span>
      <button @click="decrement(pizza)">-</button>
      <span>{{ pizza.quantity }}</span>
      <button @click="increment(pizza)">+</button>
    </div>
    <hr />
    <h2>Total : {{ total }}€</h2>
  </div>
</template>

<style scoped></style>
