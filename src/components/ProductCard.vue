<script setup>
import { useWishlistStore } from '../stores/wishlist.js'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: Object
})

const wishlistStore = useWishlistStore()
const router = useRouter()

function toggleWishlist() {
  wishlistStore.toggleWishlist(props.product)
}

function goToProductDetail() {
  router.push(`/product/${props.product.id}`)
}

function handleCardClick(event) {
  goToProductDetail()
}
</script>

<template>
  <div class="card" @click="handleCardClick">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h2 class="product-title">{{ product.name }}</h2>
    <div class="price-row">
      <p class="product-price">S/ {{ product.price }}</p>
      <div 
        class="wishlist-toggle-btn" 
        @click.stop="toggleWishlist"
        :class="{ 'in-wishlist': wishlistStore.isInWishlist(product.id) }"
      >
        <svg class="heart-icon" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  padding: 0;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}
.card:hover {
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.1); */
}
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;
}

.wishlist-toggle-btn {
  cursor: pointer;
  width: 32px;
  height: 32px;
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
  width: 18px;
  height: 18px;
  fill: none;
  transition: fill 0.3s ease;
}
.product-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 6px 6px 0 0;
  margin-bottom: 0.5em;
}
.desc {
  font-size: 0.95em;
  color: #555;
  margin: 0.5em 0 0.2em 0;
  text-align: center;
}
.stock {
  font-size: 0.9em;
  color: #2d7a2d;
  margin-bottom: 0.2em;
}
.product-title {
  font-size: 1.18em;
  font-weight: bold;
  text-align: left;
  margin: 0 0 0.2em 0;
  width: 100%;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4em;
  max-height: 2.4em;
  box-sizing: border-box;
  color: var(--text-color);
  transition: color 0.3s ease;
}
.product-price {
  font-size: 1em;
  font-weight: 500;
  text-align: left;
  margin: 0;
  color: var(--text-color);
  transition: color 0.3s ease;
}
@media (max-width: 600px) {
  .product-image {
    height: 120px;
    max-width: 100%;
  }
}
@media (max-width: 700px) {
  .card {
    aspect-ratio: 1/1;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .product-image {
    height: auto;
    aspect-ratio: 1/1;
    max-width: 100%;
  }
  .product-title {
    font-size: 0.9em;
  }
  .product-price {
    font-size: 0.8em;
  }
}
</style> 