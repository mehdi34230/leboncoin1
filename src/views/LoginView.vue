<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const displayPassword = ref(false)

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const handleSubmit = async () => {
  // Handle login logic here
  console.log({ identifier: email.value, password: password.value })

  if (email.value && password.value) {
    isSubmitting.value = true
    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value,
        },
      )
      console.log('Login successful:', data)
      GlobalStore.changeUserInfos({ username: data.user.username, token: data.jwt })

      $cookies.set('userInfos', { username: data.user.username, token: data.jwt })

      router.push({ name: 'home' })
    } catch (error) {
      console.error('Login failed:', error)
      errorMessage.value = 'Un problème est survenu, veuillez réessayer à nouveau.'
    }
    isSubmitting.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs requis.'
  }
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <div>
          <h1>Bonjour !</h1>

          <h2>Connectez-vous pour découvrir toutes nos fonctionnalités.</h2>
        </div>

        <label for="email"
          ><span>E-mail<sup>*</sup></span
          ><input type="email" name="email" id="email" v-model="email" @input="errorMessage = ''"
        /></label>

        <label for="password"
          ><span>Mot de passe<sup>*</sup></span>
          <div class="inputPassword">
            <input
              :type="displayPassword ? 'text' : 'password'"
              name="password"
              id="password"
              v-model="password"
              @input="errorMessage = ''"
            />
            <div>
              <font-awesome-icon
                :icon="['far', 'eye-slash']"
                v-if="!displayPassword"
                @click="displayPassword = !displayPassword"
              />
              <font-awesome-icon
                :icon="['far', 'eye']"
                v-else
                @click="displayPassword = !displayPassword"
              />
            </div>
          </div>
        </label>

        <p v-if="isSubmitting">Connexion en cours...</p>
        <button v-else>
          Se connecter
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </button>

        <p v-if="errorMessage" class="textError">{{ errorMessage }}</p>
        <p>
          Envie de nous rejoindre ?

          <RouterLink :to="{ name: 'signup' }">Créer un compte </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--height-header) - var(--height-footer));
}

.container {
  background-image: url('../assets/illustration.png');
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  /*border: 1px solid red;*/
  height: 490px;
  width: 480px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 7px var(--med-grey);
  border-radius: 15px;
  background-color: white;
}

label {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  height: 45px;
  border-radius: 15px;
  padding-left: 10px;
  border: 1px solid black;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

.inputPassword > div {
  border-left: 1px solid black;
  display: flex;

  align-items: center;
  width: 40px;
}

.inputPassword > input {
  flex: 1;
  border: none;
}

.inputPassword {
  border: 1px solid black;
  display: flex;
  border-radius: 15px;
}
button {
  background-color: var(--orange);
  color: white;
  font-size: 13px;
  border-radius: 15px;
  border: none;
  height: 45px;
  font-weight: bold;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  border-color: white;
}
svg {
  margin-left: 10px;
}

p:last-child {
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
}

.textError {
  text-align: center;
  color: var(--orange);
}
/*h2 {
  margin-bottom: 20px;
}*/
</style>
