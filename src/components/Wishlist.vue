<script setup>
import { useWishlistStore } from '../stores/wishlist.js'
import { computed } from 'vue'

const wishlistStore = useWishlistStore()

const totalPrice = computed(() => wishlistStore.totalPrice)

function updateQuantity(productId, newQuantity) {
  wishlistStore.updateQuantity(productId, parseInt(newQuantity))
}

function removeItem(productId) {
  wishlistStore.removeFromWishlist(productId)
}

function sendWhatsAppOrder() {
  const items = wishlistStore.wishlistItems.map(item => 
    `${item.name} - Cantidad: ${item.quantity} - S/ ${item.price * item.quantity}`
  ).join('\n')
  
  const message = `Hola! Quiero hacer el siguiente pedido:\n\n${items}\n\nTotal: S/ ${totalPrice.value}`
  const encodedMessage = encodeURIComponent(message)
  
  window.open(`https://wa.me/51987654321?text=${encodedMessage}`, '_blank')
}
</script>

<template>
  <div class="wishlist-page">
    <h1 class="wishlist-title">Lista de Deseos</h1>
    
    <div v-if="wishlistStore.wishlistItems.length === 0" class="empty-wishlist">
      <p>Tu lista de deseos está vacía</p>
      <button @click="$router.push('/')" class="continue-shopping-btn">
        Continuar Comprando
      </button>
    </div>
    
    <div v-else class="wishlist-content">
      <div class="wishlist-items">
        <div 
          v-for="item in wishlistStore.wishlistItems" 
          :key="item.id" 
          class="wishlist-item"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-info">
            <h3 class="item-title">{{ item.name }}</h3>
            <div class="item-controls">
              <div class="quantity-control">
                <label>Cantidad:</label>
                <input 
                  type="number" 
                  :value="item.quantity" 
                  @input="updateQuantity(item.id, $event.target.value)"
                  min="1"
                  class="quantity-input"
                />
              </div>
              <div class="price-actions">
                <div class="item-price">
                  <!-- <span class="price-label">Precio:</span> -->
                  <span class="price-value">S/ {{ item.price * item.quantity }}</span>
                </div>
                <button @click="removeItem(item.id)" class="remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                        <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wishlist-summary">
        <div class="total-section">
          <h2>Total: S/ {{ totalPrice }}</h2>
        </div>
        <button @click="sendWhatsAppOrder" class="whatsapp-order-btn">
          <svg viewBox="0 0 32 32" width="24" height="24" fill="white">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.416 27.33 14.684 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.162-3.438-.48l-.246-.07-4.65 1.217 1.24-4.527-.16-.234C7.13 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.14-.184.277-.713.899-.874 1.084-.16.185-.32.208-.597.07-.277-.139-1.17-.431-2.23-1.375-.824-.735-1.38-1.64-1.542-1.917-.16-.277-.017-.427.122-.565.126-.125.277-.32.416-.48.139-.16.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.54-.453-.466-.62-.475l-.527-.01c-.17 0-.446.064-.68.3-.233.233-.89.87-.89 2.12s.911 2.46 1.038 2.63c.126.17 1.793 2.74 4.35 3.73.608.209 1.082.334 1.452.427.61.155 1.166.133 1.606.081.49-.058 1.637-.668 1.87-1.312.232-.645.232-1.197.162-1.312-.07-.116-.253-.185-.53-.324z"/>
          </svg>
          Hacer Pedido por WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wishlist-page {
  max-width: 1400px;
  margin: 0 auto;
}

.wishlist-title {
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.empty-wishlist {
  text-align: center;
  padding: 3rem;
  color: var(--text-color);
}

.continue-shopping-btn {
  background: var(--text-color);
  color: var(--bg-color);
  border: none;
  padding: 0.8em 1.5em;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 1rem;
  transition: opacity 0.3s ease;
}

.continue-shopping-btn:hover {
  opacity: 0.8;
}

.wishlist-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.wishlist-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.wishlist-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.item-image {
  flex: 0 0 25%;
  max-width: 200px;
}

.item-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  aspect-ratio: 1/1;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.item-title {
  font-size: 1.2em;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}
.quantity-control label {
  font-weight: 500;
  color: var(--text-color);
}
.quantity-input {
  width: 60px;
  padding: 0.3em;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  text-align: center;
  background: var(--bg-color);
  color: var(--text-color);
}
.price-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}
.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}
.price-label {
  font-size: 0.9em;
  color: var(--text-color);
  opacity: 0.7;
}
.price-value {
  font-size: 1.1em;
  font-weight: 600;
  color: var(--text-color);
}
.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s ease;
}

.remove-btn:hover {
  background: #ff2222;
}

.wishlist-summary {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.total-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.total-section h2 {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
}

.whatsapp-order-btn {
  width: 100%;
  background: #25d366;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.whatsapp-order-btn:hover {
  background: #1ebe57;
}

@media (max-width: 700px) {
  .wishlist-item {
    flex-direction: row;
    gap: 0.8rem;
    padding: 0.8rem;
  }
  
  .item-image {
    flex: 0 0 25%;
    max-width: 80px;
  }
  
  .item-image img {
    height: 80px;
    width: 80px;
  }
  
  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .item-title {
    font-size: 1em;
    margin: 0;
    line-height: 1.2;
  }
  
  .item-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.8rem;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;
  }
  
  .quantity-control label {
    font-size: 0.8em;
  }
  
  .quantity-input {
    width: 50px;
    padding: 0.2em;
    font-size: 0.9em;
  }
  
  .price-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  
  .item-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
  }
  
  .price-label {
    font-size: 0.7em;
  }
  
  .price-value {
    font-size: 1em;
  }
  
  .remove-btn {
    padding: 0.3em 0.6em;
    font-size: 0.8em;
    white-space: nowrap;
  }
}
</style> 