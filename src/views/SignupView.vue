<script setup>
import { ref, inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const GlobalStore = inject('GlobalStore')

const Router = useRouter()

const handleSubmit = async () => {
  console.log({
    username: username.value,
    email: email.value,
    password: password.value,
  })

  if (username.value && email.value && password.value) {
    isSubmitting.value = true
    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      )

      console.log('response>>>>data', data)
      GlobalStore.changeToken(data.jwt)

      Router.push({ name: 'home' })
    } catch (error) {
      console.log('catch>>>>error', error)
      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
    isSubmitting.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tout les champs'
  }
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

        <p v-if="isSubmitting">Inscription en cours...</p>
        <button v-else>S'inscrire</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>

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
