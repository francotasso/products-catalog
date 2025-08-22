<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWishlistStore } from '../stores/wishlist.js'
import productsData from '../products.json'

const route = useRoute()
const router = useRouter()
const wishlistStore = useWishlistStore()
const productId = route.params.id

const product = computed(() => productsData.find(p => p.id == productId))

function toggleWishlist() {
  if (product.value) {
    wishlistStore.toggleWishlist(product.value)
  }
}

// Zoom state
const zoom = ref(false)
const origin = ref('50% 50%')

function onMouseMove(e) {
  const box = e.target.getBoundingClientRect()
  const x = ((e.clientX - box.left) / box.width) * 100
  const y = ((e.clientY - box.top) / box.height) * 100
  origin.value = `${x}% ${y}%`
  zoom.value = true
}
function onMouseLeave() {
  zoom.value = false
  origin.value = '50% 50%'
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<template>
  <div v-if="product" class="product-detail-container">
    <div class="product-detail-content">
      <div class="product-detail-image">
        <img
          class="product-image-zoom"
          :src="product.image"
          :alt="product.name"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
          :style="{
            transform: zoom ? 'scale(2.2)' : 'scale(1)',
            transformOrigin: origin,
            transition: zoom ? 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' : 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          }"
        />
      </div>
      <div class="product-detail-info">
        <span class="product-detail-title">{{ product.name }}</span>
        <p class="product-detail-description">{{ product.description }}</p>
        <div class="price-whatsapp-row">
          <p class="product-detail-price">S/{{ product.price }}</p>
          <div class="action-buttons">
            <div 
              class="wishlist-toggle-btn" 
              @click="toggleWishlist"
              :class="{ 'in-wishlist': wishlistStore.isInWishlist(product.id) }"
            >
              <svg class="heart-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <a
              class="whatsapp-btn"
              :href="`https://wa.me/51987654321?text=Hola!%20Estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(product.name)}`"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 32 32" width="38" height="38" fill="white" class="whatsapp-icon">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.416 27.33 14.684 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.162-3.438-.48l-.246-.07-4.65 1.217 1.24-4.527-.16-.234C7.13 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.14-.184.277-.713.899-.874 1.084-.16.185-.32.208-.597.07-.277-.139-1.17-.431-2.23-1.375-.824-.735-1.38-1.64-1.542-1.917-.16-.277-.017-.427.122-.565.126-.125.277-.32.416-.48.139-.16.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.54-.453-.466-.62-.475l-.527-.01c-.17 0-.446.064-.68.3-.233.233-.89.87-.89 2.12s.911 2.46 1.038 2.63c.126.17 1.793 2.74 4.35 3.73.608.209 1.082.334 1.452.427.61.155 1.166.133 1.606.081.49-.058 1.637-.668 1.87-1.312.232-.645.232-1.197.162-1.312-.07-.116-.253-.185-.53-.324z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Product not found.</p>
    <button @click="router.back()">Back</button>
  </div>
</template>

<style scoped>
.product-detail-container {
  max-width: 1400px;
  margin: 2em auto;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
}
.product-detail-content {
  display: flex;
  gap: 2em;
  align-items: flex-start;
  max-width: 100%;
}
.product-detail-image {
  flex: 1 1 0;
  min-width: 0;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  overflow: hidden;
  /* Ensures zoomed image does not overflow */
  min-height: 600px;
  max-height: 600px;
  max-width: 600px;
}
.product-image-zoom {
  width: 600px;
  height: auto;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: zoom-in;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), transform-origin 0.1s;
  /* Remove border and shadow for clean look */
}
.product-image-zoom:hover {
  /* No effect needed, zoom handled inline */
}
.product-image {
  width: 100%;
  max-width: 420px;
  height: 340px;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
.product-image:hover {
  transform: scale(1.12);
  z-index: 2;
}
.product-detail-info {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: relative;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}
.product-detail-title {
  font-size: 2.5em;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.3em;
  display: block;
  word-break: break-word;
  text-align: left;
  color: var(--text-color);
  transition: color 0.3s ease;
}
.product-detail-price {
  text-align: left;
  font-size: 2em;
  font-weight: 600;
  margin-bottom: 0.7em;
  color: var(--text-color);
  transition: color 0.3s ease;
}
.product-detail-description {
  font-size: 1.1em;
  color: var(--text-color);
  margin: 0.5em 0 1em 0;
  text-align: left;
  line-height: 1.5;
  transition: color 0.3s ease;
}
.whatsapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25d366;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.whatsapp-btn:hover {
  background: #1ebe57;
}
.price-whatsapp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wishlist-toggle-btn {
  cursor: pointer;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid var(--text-color);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: var(--text-color);
  flex-shrink: 0;
}

.wishlist-toggle-btn:hover {
  transform: scale(1.05);
}

.wishlist-toggle-btn.in-wishlist {
  background: #ff69b4;
  border-color: #ff69b4;
  color: white;
}

.wishlist-toggle-btn.in-wishlist .heart-icon {
  fill: white;
}

.heart-icon {
  width: 24px;
  height: 24px;
  fill: none;
  transition: fill 0.3s ease;
}

.whatsapp-icon {
  display: block;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .product-detail-content {
    flex-direction: column;
    gap: 1.5em;
  }
  .product-detail-image {
    justify-content: flex-start;
  }
  .product-image-zoom {
    width: 100%;
    /* aspect-ratio: 1/1; */
  }
}
@media (max-width: 600px) {
  .product-detail-container {
    padding: 0.5em;
  }
  .product-detail-image {
    width: 100%;
    /* aspect-ratio: 1/1; */
  }
  .product-image-zoom {
    width: 100%;
    /* aspect-ratio: 1/1; */
  }
  .product-detail-title {
    font-size: 1.5em;
  }
}
@media (max-width: 700px) {
  .product-detail-container {
    margin: 0;
  }
  .product-detail-image {
    min-height: 320px;
  }
}
</style> 