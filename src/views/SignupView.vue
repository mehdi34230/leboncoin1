<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log({
    username: username.value,
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>Bonjour !</h1>
        <h2>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</h2>

        <label for="username">Nom<sup>*</sup></label
        ><input type="text" name="username" id="username" v-model="username" />
        <label for="email">E-mail<sup>*</sup></label
        ><input type="email" name="email" id="email" v-model="email" />
        <label for="password">Mot de passe <sup>*</sup></label
        ><input type="password" name="password" id="password" v-model="password" />

        <button>S'inscrire</button>
        <p>
          Vous avez déjà un compte ?

          <router-link :to="{ name: 'login' }"> Connectez-vous</router-link>
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--height-header) - var(--height-footer));
}
</style>
