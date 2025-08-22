<template>
  <footer>
    <div class="container">
      <p>&copy; {{ year }} {{ storeName }}</p>
      <div class="whatsapp-contact">
        Creado por Franco Tasso, contáctame haciendo  
        <a href="https://wa.me/51934164201" target="_blank">click aquí</a>
      </div>
    </div>
  </footer>
</template>

<script>
import storeInfoData from '../store-info.json';

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      storeName: storeInfoData.storeName
    }
  }
}
</script>

<style scoped>
footer {
  background-color: var(--text-color);
  color: var(--selected-text-color);
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.whatsapp-contact {
  margin-top: 10px;
}

.whatsapp-contact a {
  color: var(--selected-text-color);
  text-decoration: none;
}
</style>
