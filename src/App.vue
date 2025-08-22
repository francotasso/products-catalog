<script setup>
import { ref, watch } from 'vue'
import Footer from './components/Footer.vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from './stores/wishlist.js'
import storeInfoData from './store-info.json'

const storeName = storeInfoData.storeName
const storeInfo = storeInfoData
const isDarkMode = ref(false)
const showStoreInfo = ref(false)
const router = useRouter()
const wishlistStore = useWishlistStore()

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
}

function goToHome() {
  router.push('/')
}

function goToWishlist() {
  router.push('/wishlist')
}

function toggleStoreInfo() {
  showStoreInfo.value = !showStoreInfo.value
}

function closeStoreInfo() {
  showStoreInfo.value = false
}

// Watch for dark mode changes and update CSS variables
watch(isDarkMode, (newValue) => {
  if (newValue) {
    document.documentElement.style.setProperty('--bg-color', '#1a1a1a')
    document.documentElement.style.setProperty('--text-color', '#ffffff')
    document.documentElement.style.setProperty('--header-bg', '#2d2d2d')
    document.documentElement.style.setProperty('--card-bg', '#2d2d2d')
    document.documentElement.style.setProperty('--border-color', '#444')
    document.documentElement.style.setProperty('--selected-text-color', '#000000')
  } else {
    document.documentElement.style.setProperty('--bg-color', '#f8f6f2')
    document.documentElement.style.setProperty('--text-color', '#222')
    document.documentElement.style.setProperty('--header-bg', '#ededed')
    document.documentElement.style.setProperty('--card-bg', '#ffffff')
    document.documentElement.style.setProperty('--border-color', '#ccc')
    document.documentElement.style.setProperty('--selected-text-color', '#ffffff')
  }
}, { immediate: true })
</script>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Footer
  }
})
</script>

<template>
  <div>
    <header class="main-header">
      <div class="header-content">
        <span class="store-name" @click="goToHome">{{ storeName }}</span>
        <div class="header-actions">
          <div class="info-btn-desktop" @click="toggleStoreInfo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div class="wishlist-btn" @click="goToWishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="36px" height="36px" viewBox="0 0 64 64" stroke-width="3" stroke="#000000" fill="none"><path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/></svg>
            <span class="wishlist-counter" v-if="wishlistStore.totalItems > 0">{{ wishlistStore.totalItems }}</span>
          </div>
          <svg class="dark-mode-toggle" @click="toggleDarkMode" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 48 48">
            <title>dark-mode</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Icons">
                <g>
                  <rect width="48" height="48" fill="none"/>
                  <g>
                    <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"/>
                    <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <!-- Mobile second row with info icon -->
      <div class="mobile-info-row">
        <div class="info-btn" @click="toggleStoreInfo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <span>Información de la tienda</span>
        </div>
      </div>
    </header>

    <!-- Store Info Popup -->
    <div v-if="showStoreInfo" class="popup-overlay" @click="closeStoreInfo">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <h3>Información</h3>
          <button class="close-btn" @click="closeStoreInfo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="popup-body">
          <div class="store-hours">
            <h4>Horarios de Atención</h4>
            <div class="hours-list">
              <div 
                v-for="(dayInfo, key) in storeInfo.hours" 
                :key="key"
                class="day-hours"
                :class="{ 'closed': !dayInfo.isOpen }"
              >
                <span class="day">{{ dayInfo.day }}</span>
                <span class="hours">{{ dayInfo.isOpen ? dayInfo.hours : 'Cerrado' }}</span>
              </div>
            </div>
          </div>
          
          <div class="store-contact">
            <h4>Contacto</h4>
            <p>📞 Teléfono: {{ storeInfo.contact.phone }}</p>
            <p>📧 Email: {{ storeInfo.contact.email }}</p>
            <p>📍 Dirección: <a :href="storeInfo.contact.addressMap" target="_blank">{{ storeInfo.contact.address }}</a></p>
          </div>
          
          <div class="social-icons">
            <a v-if="storeInfo.socialMedia.facebook" :href="storeInfo.socialMedia.facebook.url" target="_blank" class="social-icon facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a v-if="storeInfo.socialMedia.instagram" :href="storeInfo.socialMedia.instagram.url" target="_blank" class="social-icon instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a v-if="storeInfo.socialMedia.tiktok" :href="storeInfo.socialMedia.tiktok.url" target="_blank" class="social-icon tiktok">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="app-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  min-height: 90vh;
  box-sizing: border-box;
  color: var(--text-color);
  padding: 2rem;
  background: var(--bg-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
.main-header {
  background: var(--header-bg);
  margin: 0;
  border: none;
  padding: 1.2em 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
.header-content {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}
.store-name {
  font-size: 2.2em;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -1px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
  transition: color 0.3s ease;
  cursor: pointer;
  user-select: none;
}
.store-name:hover {
  opacity: 0.8;
}
.header-actions {
  position: absolute;
  right: 95px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.wishlist-btn {
  cursor: pointer;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: color 0.3s ease;
  width: 32px;
  height: 32px;
}
.wishlist-btn > svg {
  stroke: var(--text-color);
}
.wishlist-icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
.wishlist-counter {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  font-weight: bold;
  min-width: 14px;
}
.dark-mode-toggle {
  background: none;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  fill: var(--text-color);
  cursor: pointer;
}
.moon-icon, .sun-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}
/* Mobile info row styles */
.mobile-info-row {
  display: none;
}

.info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-size: 0.9em;
}

.info-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.info-btn svg {
  stroke: var(--text-color);
}

.info-btn-desktop {
  cursor: pointer;
  background: none;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.info-btn-desktop:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.info-btn-desktop svg {
  stroke: var(--text-color);
}

/* Popup styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
}

.popup-content {
  background: var(--card-bg);
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.popup-header h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 1.3em;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.close-btn svg {
  stroke: var(--text-color);
}

.popup-body {
  padding: 1.5rem;
}

.store-hours, .store-contact {
  margin-bottom: 1.5rem;
}

.store-hours h4, .store-contact h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  font-size: 1.1em;
  font-weight: 600;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.day-hours {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.day {
  font-weight: 500;
  color: var(--text-color);
}

.hours {
  color: var(--text-color);
  opacity: 0.8;
}

.store-contact p {
  margin: 0.5rem 0;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}



.day-hours.closed {
  opacity: 0.6;
}

.day-hours.closed .hours {
  color: #ff4444;
  font-weight: 500;
}

.social-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.social-icon:hover {
  transform: scale(1.1);
}

.social-icon.facebook {
  background: #1877f2;
  color: white;
}

.social-icon.facebook:hover {
  background: #166fe5;
}

.social-icon.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
}

.social-icon.instagram:hover {
  opacity: 0.9;
}

.social-icon.tiktok {
  background: #000000;
  color: white;
}

.social-icon.tiktok:hover {
  background: #333333;
}



@media (max-width: 700px) {
  .dark-mode-toggle {
    right: 15px;
  }
  .main-header {
    padding: 0.8em 0 0 0;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .header-content {
    padding-bottom: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .mobile-info-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 1rem 0.8rem 1rem;
    border-top: 1px solid var(--border-color);
    margin-top: 0.5rem;
    width: 100%;
    box-sizing: border-box;
  }
  .info-btn {
    font-size: 0.85em;
  }
  .store-name {
    font-size: 1.6em;
  }
  .dark-mode-toggle {
    width: 32px;
    height: 32px;
  }
  .info-btn-desktop {
    display: none;
  }
  .header-actions {
    right: 15px;
    gap: 0.5rem;
  }
  .wishlist-btn {
    width: 36px;
    height: 36px;
  }
  .wishlist-icon {
    width: 18px;
    height: 18px;
  }
  .wishlist-counter {
    width: 14px;
    height: 14px;
    font-size: 0.6em;
    top: -6px;
    right: -6px;
    padding: 2px;
  }
  .app-container {
    padding: 1rem;
  }
  .popup-content {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
}
</style>

<style>
:root {
  --bg-color: #f8f6f2;
  --text-color: #222;
  --header-bg: #ededed;
  --card-bg: #ffffff;
  --border-color: #ccc;
  --selected-text-color: #ffffff;
}

body {
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
#app {
  padding: 0 !important;
  margin: 0;
  width: 100vw;
  max-width: 100vw;
}
/* Asegura que el botón hamburguesa esté encima del header */
@media (max-width: 700px) {
  .hamburger-btn {
    z-index: 2001;
  }
}
</style>
