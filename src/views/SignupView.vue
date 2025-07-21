<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <p>
        Vous avez déjà un compte ?

        <router-link :to="{ name: 'login' }"> Connectez-vous</router-link>
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--height-header) - var(--height-footer));
}
</style>
