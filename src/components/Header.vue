<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<script setup>
import { RouterLink } from 'vue-router'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { inject } from 'vue'

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userToken)
</script>

<template>
  <header>
    <div class="container">
      <div class="topPart">
        <RouterLink :to="{ name: 'home' }">
          <img src="../assets/logo.svg" alt="" />
        </RouterLink>

        <div class="middlePart">
          <BtnPublishOffer />
          <div>
            <input type="text" name="Search" id="search" placeholder="Rechercher sur LeBonCoin" />
            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
        </div>
        <div class="connectionPart">
          <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userToken.value">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </RouterLink>
          <font-awesome-icon
            :icon="['fas', 'sign-out-alt']"
            v-else
            @click="GlobalStore.changeToken('')"
          />
        </div>
      </div>
      <div class="bottomPart">
        <span>Immobilier</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Véhicules</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Locations de vacances</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Emploi</span>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <span>Mode</span><font-awesome-icon :icon="['fas', 'circle']" /> <span>Maison & Jardin</span
        ><font-awesome-icon :icon="['fas', 'circle']" /> <span>Famille</span
        ><font-awesome-icon :icon="['fas', 'circle']" /> <span>Electronique</span
        ><font-awesome-icon :icon="['fas', 'circle']" /> <span>Loisirs</span
        ><font-awesome-icon :icon="['fas', 'circle']" /> <span>Autres</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  height: var(--height-header);
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  border-bottom: 0.5px solid var(--med-grey);
  /*border: 1px solid green;*/
}

.container > div {
  display: flex;
  /*border: 1px solid red;*/
}
/*-----TOP-PART-----*/

.topPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

/*-----MIDDLE-PART-----*/

.middlePart {
  display: flex;
  align-items: center;
  gap: 20px;
}

.middlePart > div {
  background-color: var(--light-grey);
  padding: 7px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.middlePart > div svg {
  background-color: var(--orange);
  padding: 7px;
  border-radius: 5px;
  box-sizing: content-box;
}

input {
  width: 250px;
  border: none;
  background-color: var(--light-grey);
}

input::placeholder {
  color: black;
}
input:focus {
  outline: none;
}

.connectionPart > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.connectionPart svg {
  font-size: 18px;
}
img {
  width: 140px;
}

/*-----BOTTOM-PART-----*/
.bottomPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.bottomPart svg {
  font-size: 3px;
}

.bottomPart span {
  font-size: 14px;
  color: var(--dark-grey);
}
</style>
