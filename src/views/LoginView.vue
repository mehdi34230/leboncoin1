<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <form></form>

      <p>
        Envie de nous rejoindre ?

        <RouterLink :to="{ name: 'signup' }">Créer un compte </RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--height-header) - var(--height-footer));
}
</style>
