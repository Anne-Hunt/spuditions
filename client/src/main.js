import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import './utils/SocketProvider.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import FloatingVue from 'floating-vue'

const root = createApp(App)
async function init() {
  await registerGlobalComponents(root)
  root
    .use(router)
    .use(FloatingVue)
    .use(VueGoogleMaps, {
          load: {
              key: atob("QUl6YVN5RExncnh1NGd5OVVaMW1vbHN4MTZDeHB3QlBfVVBCa1Rr"),
          },
      })
    .mount('#app')
}
init()
