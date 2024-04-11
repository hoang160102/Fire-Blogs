import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";
import router from './router'
import store from './state/store'
import MainContent from "./components/layout/MainContent.vue"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  }
})
app.component("main-content", MainContent)
app.use(vuetify)
app.use(store)
app.use(router)
app.mount('#app')