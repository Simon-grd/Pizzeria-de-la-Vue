import { reactive, computed } from 'vue'

export const store = reactive({
  pizzas: [
    { name: 'Vugherita', price: 36, quantity: 0, image: '/images/vugherita.jpg', description: 'Tomate, mozzarella, basilic frais' },
    { name: '4 Vues', price: 49, quantity: 0, image: '/images/4-vues.jpg', description: 'Tomate, mozzarella, gorgonzola, parmesan' },
    { name: 'Vuronni', price: 44, quantity: 0, image: '/images/vuronni.jpg', description: 'Tomate, mozzarella, pepperoni épicé' },
    { name: 'Vugétarienne', price: 40, quantity: 0, image: '/images/vugetarienne.jpg', description: 'Tomate, mozzarella, poivrons, courgettes, aubergines' },
    { name: 'Vueen', price: 42, quantity: 0, image: '/images/vueen.jpg', description: 'Tomate, mozzarella, jambon, champignons' },
    { name: 'Vuzone', price: 46, quantity: 0, image: '/images/vuzone.jpg', description: 'Pizza pliée, ricotta, jambon, mozzarella' },
    { name: 'Vupicante', price: 45, quantity: 0, image: '/images/vupicante.jpg', description: 'Tomate, mozzarella, chorizo, piments, oignons' },
    { name: 'Vumarine', price: 52, quantity: 0, image: '/images/vumarine.jpg', description: 'Tomate, mozzarella, fruits de mer, ail, persil' },
  ],
  increment(pizza) {
    const p = this.pizzas.find(item => item.name === pizza.name)
    if (p) {
      p.quantity++
    }
  },
  decrement(pizza) {
    const p = this.pizzas.find(item => item.name === pizza.name)
    if (p && p.quantity > 0) {
      p.quantity--
    }
  },
})

export const cartItems = computed(() => store.pizzas.filter(p => p.quantity > 0))

export const total = computed(() => {
  return store.pizzas.reduce((acc, pizza) => acc + pizza.quantity * pizza.price, 0)
})