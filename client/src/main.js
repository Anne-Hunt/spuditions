import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import './utils/SocketProvider.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const root = createApp(App)
async function init() {
  await registerGlobalComponents(root)
  root
    .use(router)
    .use(VueGoogleMaps, {
          load: {
              key: 'AIzaSyDLgrxu4gy9UZ1molsx16CxpwBP_UPBkTk',
          },
      })
    .mount('#app')
}
init()





