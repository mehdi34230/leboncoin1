<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'

import axios from 'axios'

const props = defineProps({
  id: String,
})

const offerInfos = ref(null)

onMounted(async () => {
  try {
    //  Destruction de la clé 'data'. Pour rappel, les données reçus d'une requête faite avec axios se trouve toujours à la clé 'data'
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`,
    )

    // Pour vérifer les informations reçues
    console.log('OfferView - data >>>', data.data.attributes.pictures.data[0].attributes.url)

    offerInfos.value = data.data
  } catch (error) {
    // Affiche l'erreur dans la console du navigateur
    console.log('OfferView - catch >>>', error)
  }
})

const cycleList = computed(() => {
  if (offerInfos.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerInfos.value.attributes.pictures.data)

    return { state, next, prev }
  } else {
    return {}
  }
})

// Pour afficher la date de création de l'offre au bon format
const formatedDate = computed(() => {
  // -- Syntaxe qui chaîne toutes les méthodes
  return offerInfos.value.attributes.publishedAt?.split('T')[0].split('-').reverse().join('/')
})
</script>

<template>
  <main>
    <p v-if="offerInfos === null">Chargement en cours ...</p>
    <div class="container" v-else>
      <div class="leftCol">
        <div class="caroussel">
          <font-awesome-icon
            :icon="['fas', 'angle-left']"
            @click="cycleList.prev()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          />
          <img :src="cycleList.state.value.attributes.url" alt="" />
          <font-awesome-icon
            :icon="['fas', 'angle-right']"
            @click="cycleList.next()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          />
        </div>

        <p class="title">{{ offerInfos.attributes.title }}</p>
        <p class="price">{{ offerInfos.attributes.price }} €</p>
        <p class="date">{{ formatedDate }}</p>

        <h2>Description</h2>

        <p class="description">{{ offerInfos.attributes.description }}</p>

        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span>Agon-Coutainville (50230)</span>
      </div>

      <div class="rightCol">
        <div class="owner">
          <div>
            <img
              :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
              alt=""
            />

            <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
          </div>
          <p class="identity">
            <font-awesome-icon :icon="['fas', 'check-double']" />Pièce d’identité vérifiée
          </p>
          <p><font-awesome-icon :icon="['far', 'clock']" />Répond généralement en 1 heure</p>
        </div>

        <div class="btnPart">
          <button>Acheter</button>
          <button>Message</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main .container {
  padding: 30px 0;
}

main {
  min-height: calc(100vh - var(--height-footer) - var(--height-header));
}
.container {
  display: flex;
  gap: 20px;
}

.leftCol {
  width: 65%;
  /*border: 1px solid blue;*/
}

.leftCol img {
  width: 100%;
  height: 350px;
  object-fit: contain;
  margin-bottom: 40px;
}

.caroussel {
  display: flex;

  align-items: center;
}

.carouselle svg {
  font-size: 18px;
  cursor: pointer;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.date {
  font-size: 12px;
  color: var(--dark-grey);
  margin-bottom: 20px;
}

h2 {
  border-top: 0.5px solid var(--med-grey);
  padding-top: 20px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 + p {
  padding-bottom: 40px;
  border-bottom: 0.5px solid var(--med-grey);
  margin-bottom: 20px;
}
/*-----RIGHT COLUMN-----*/
.rightCol {
  width: 35%;
  /*border: 1px solid red;*/
  height: 365px;
  box-shadow: 0 0 5px var(--med-grey);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.owner > div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.owner img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.owner > div p {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}

.identity {
  color: var(--brown);
  background-color: var(--beige);
  font-size: 12px;
  padding: 5px;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 20px;
}

.identity + p {
  font-size: 14px;
}

.btnPart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  background-color: var(--orange);
  color: white;
  border: none;
  padding: 15px 0;
  font-weight: bold;
  border-radius: 15px;
  font-size: inherit;
}

button:last-child {
  background-color: var(--dark-blue);
}
</style>
