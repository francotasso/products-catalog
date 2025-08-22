<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import productsData from '../products.json'
import ProductCard from './ProductCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref(productsData)

// Filtros
const selectedCategory = ref('')
const categories = computed(() => [...new Set(products.value.map(p => p.category))])
const sortOrder = ref('default');

function handleCategoryFilter(category) {
  selectedCategory.value = category;
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePriceFilter(order) {
  sortOrder.value = order;
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const filteredProducts = computed(() => {
  let filtered = products.value.filter(p => {
    return (
      (!selectedCategory.value || p.category === selectedCategory.value)
    )
  });

  if (sortOrder.value === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
})

// Paginación
const currentPage = ref(1)
const perPage = 9
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function viewProduct(product) {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

// --- Mobile filters toggle and scroll behavior ---
const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function closeSidebar() {
  showSidebar.value = false
}

onMounted(() => {
})
onUnmounted(() => {
})
</script>

<template>
  <div class="products-page">
    <!-- <div class="products-title-container">
      <h1 class="products-title">Productos</h1>
    </div> -->
    <!-- Hamburguesa solo en móvil -->
    <button
      class="hamburger-btn"
      @click="toggleSidebar"
    >
      <span></span><span></span><span></span>
    </button>
    <div class="products-layout">
      <!-- Sidebar: normal en desktop, panel deslizable en móvil -->
      <aside
        class="sidebar"
        :class="{ 'sidebar-mobile': showSidebar }">
        <h2 class="filters-title">Filtros</h2>
        <div class="filter-group">
          <span class="filter-label">Categoría:</span>
          <button
            class="size-btn"
            :class="{ selected: selectedCategory === '' }"
            @click="() => handleCategoryFilter('')"
          >
            Todas
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            class="size-btn"
            :class="{ selected: selectedCategory === cat }"
            @click="() => handleCategoryFilter(cat)"
          >
            {{ cat }}
          </button>
        </div>
        <div class="filter-group">
          <span class="filter-label">Precio:</span>
          <button
            class="size-btn"
            :class="{ selected: sortOrder === 'default' }"
            @click="() => handlePriceFilter('default')"
          >
            Relevancia
          </button>
          <button
            class="size-btn"
            :class="{ selected: sortOrder === 'asc' }"
            @click="() => handlePriceFilter('asc')"
          >
            Menor a Mayor
          </button>
          <button
            class="size-btn"
            :class="{ selected: sortOrder === 'desc' }"
            @click="() => handlePriceFilter('desc')"
          >
            Mayor a Menor
          </button>
        </div>
      </aside>
      <main class="products-main" @click="closeSidebar">
        <div class="product-grid">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="pagination">
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  width: 100%;
}
.products-title {
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  width: 100%;
  letter-spacing: -1px;
}
.products-title-container {
  margin-bottom: 2em;
}
.products-layout {
  display: flex;
  gap: 2em;
  align-items: flex-start;
}
.sidebar {
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  border-radius: 12px;
  background: var(--card-bg);
  padding: 0em 1em;
  margin-top: 0.7em;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-color 0.3s ease;
}
.filters-title {
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 1.2em;
  text-align: left;
  letter-spacing: -0.5px;
  color: var(--text-color);
  transition: color 0.3s ease;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  margin-bottom: 1.2em;
}
.filter-label {
  font-weight: 600;
  margin-bottom: 0.5em;
  text-align: left;
  color: var(--text-color);
  transition: color 0.3s ease;
}
.size-btn {
  border: 2px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-color);
  color: var(--text-color);
  padding: 0.2em 1.1em;
  margin-bottom: 0.3em;
  font-size: 1em;
  cursor: pointer;
  outline: none;
  transition: border 0.2s, background 0.2s, color 0.2s, all 0.3s ease;
}
.size-btn.selected {
  border: 2.5px solid var(--text-color);
  background: var(--text-color);
  color: var(--selected-text-color);
}
.close-sidebar {
  display: none;
}
.products-main {
  flex: 1 1 0;
  min-width: 0;
  max-width: calc(100% - 240px - 2em);
  width: calc(100% - 240px - 2em);
}
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2em 1em;
  padding: 0.5em;
  align-items: flex-start;
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
}
.product-grid > * {
  flex: 0 0 calc(33.333% - 0.67em);
  max-width: calc(33.333% - 0.67em);
  box-sizing: border-box;
}
.hamburger-btn {
  position: fixed;
  top: 1.5em;
  left: 1em;
  z-index: 1002;
  width: 44px;
  height: 44px;
  background: var(--card-bg);
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.3s ease;
}
.hamburger-btn span {
  display: block;
  height: 4px;
  background: var(--text-color);
  border-radius: 2px;
  transition: background-color 0.3s ease;
}
/* Primer span */
.hamburger-btn span:nth-child(1) {
  width: 27px;
}

/* Segundo span */
.hamburger-btn span:nth-child(2) {
  width: 18px;
}

/* Tercer span */
.hamburger-btn span:nth-child(3) {
  width: 9px;
}
.pagination {
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}
.page-btn {
  background: var(--bg-color);
  border: 1.5px solid var(--border-color);
  border-radius: 6px;
  padding: 0.4em 1em;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s, border 0.2s, color 0.2s, all 0.3s ease;
  color: var(--text-color);
}
.page-btn.active {
  background: var(--text-color);
  color: var(--bg-color);
  border: 2px solid var(--text-color);
  font-weight: bold;
}
@media (max-width: 700px) {
  .products-layout {
    flex-direction: column;
    gap: 1em;
  }
  .sidebar {
    position: fixed;
    top: -12px;
    left: 0;
    width: 100vw;
    right: 0;
    box-sizing: border-box;
    min-width: 0;
    max-width: 100vw;
    height: 100vh;
    background: var(--card-bg);
    z-index: 1001;
    transform: translateY(-100%);
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    padding: 4.5em 1em 1em 1em;
    display: flex;
    flex-direction: column;
    gap: 0em;
    border-radius: 0 0 16px 16px;
    height: 100vh;
  }
  .sidebar.sidebar-mobile {
    transform: translateY(0);
  }
  .close-sidebar {
    display: block;
    margin-top: 2em;
    background: var(--bg-color);
    border: none;
    padding: 0.7em 1.2em;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background 0.2s, all 0.3s ease;
    color: var(--text-color);
  }
  .close-sidebar:hover {
    background: var(--border-color);
  }
  .hamburger-btn {
    display: flex;
    width: 36px;
    height: 36px;
    top: 0.8em;
    left: 0.8em;
    gap: 3px;
  }
  .hamburger-btn span {
    display: block;
    height: 3px;
    background: var(--text-color);
    border-radius: 2px;
    transition: background-color 0.3s ease;
  }
  /* Primer span */
  .hamburger-btn span:nth-child(1) {
    width: 20px;
  }

  /* Segundo span */
  .hamburger-btn span:nth-child(2) {
    width: 14px;
  }

  /* Tercer span */
  .hamburger-btn span:nth-child(3) {
    width: 7px;
  }
  .products-main {
    width: 100%;
    padding: 0;
    max-width: 100%;
    min-width: 0;
  }
  .product-grid {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    gap: 1em;
  }
  .product-grid > * {
    flex: 0 0 calc(50% - 0.5em);
    max-width: calc(50% - 0.5em);
  }
}
@media (min-width: 701px) {
  .hamburger-btn {
    display: none !important;
  }
}
</style>
