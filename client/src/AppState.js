import { reactive } from 'vue'
import { Park } from "./models/Park.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
    hasCookie: null,
    /** @type {{name, picture, id}} user info from Auth0*/ 
    user: null,
    /** @type {import('./models/Account.js').Account} user info from the database*/
    account: null,

    /**@type {Park[]} */
    parks: [],

  /**@type {Park} */
  activePark: null,

  /**@type {Park[]} */
  carouselParks: [],

   /**@type {Weather[]} */
	weatherConditions: [],
    /**@type {Park} */
    activePark: null,
    weatherConditions: [],
})
