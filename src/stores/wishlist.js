import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref([])

  const totalItems = computed(() => {
    return wishlistItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return wishlistItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  function addToWishlist(product) {
    const existingItem = wishlistItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      wishlistItems.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  function removeFromWishlist(productId) {
    const index = wishlistItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    }
  }

  function updateQuantity(productId, quantity) {
    const item = wishlistItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromWishlist(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function isInWishlist(productId) {
    return wishlistItems.value.some(item => item.id === productId)
  }

  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return {
    wishlistItems,
    totalItems,
    totalPrice,
    addToWishlist,
    removeFromWishlist,
    updateQuantity,
    isInWishlist,
    toggleWishlist
  }
}) 