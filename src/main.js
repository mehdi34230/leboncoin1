import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

// Import de FontAwesome Core
import { library } from '@fortawesome/fontawesome-svg-core'

// Import du composant vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icône
import {
  faPlusSquare,
  faHeart,
  faClock,
  faUser,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons'

import {
  faCheckDouble,
  faMapMarkerAlt,
  faCircle,
  faSearch,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

// Ajout de l'icône à la bibliothèque
library.add(
  faPlusSquare,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faUser,
  faCircle,
  faSearch,
  faAngleLeft,
  faAngleRight,
  faSignOutAlt,
  faArrowRight,
  faEyeSlash,
  faEye,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueCookies)

// Access cookies via app.config.globalProperties.$cookies after plugin installation
const userInfos = ref($cookies.get('userInfos') || null)

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('GlobalStore', {
  userInfos: userInfos,
  changeUserInfos: changeUserInfos,
})

app.mount('#app')
