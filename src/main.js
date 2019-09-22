import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter)
Vue.use(VueX)

Vue.config.productionTip = false
Vue.prototype.$http = axios

const load = (path) => {
  return () => import('./components/' + path + '.vue')
}

const routes = [
  { path: '*', redirect: '/404' },
  { path: '/404', component: load('NotFound') },
  {
    path: '/',
    component: load('Layout'),
    children: [
      {
        path: '',
        component: load('Home'),
        name: 'home'
        // meta: { transitionName: 'slide' }
      },
      {
        path: 'last',
        component: load('Last'),
        name: 'last'
      },
      {
        path: 'category/:category_id',
        component: load('Category'),
        name: 'category'
      },
      {
        path: 'product/:slug/:id',
        component: load('Product'),
        name: 'product',
        meta: { transitionName: 'slide', navbar: 'no-tab' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let datas_products = []

for (let index = 1; index <= 16; index++) {
  datas_products.push({
    id: index,
    slug: 'product-' + index,
    createdAt: randomDate(new Date(2012, 0, 1), new Date()),
    name: 'Product' + index,
    category_id: Math.floor(Math.random() * 3) + 1
  })
}

const SET_ITEMS = 'SET_PRODUCTS'

const products = {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    all: state => state.products,
    last: (state, getters) => {
      return getters.all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
    findAllBy: (state, getters, rootState, rootGetters) => filter => {
      return getters.last.filter(product => {
        return Object.keys(filter).map(key => {
          return product[key] !== undefined && product[key] == filter[key]
        }).every(v => v === true)
      })
    },
    findBy: (state, getters) => currentRoute => getters.findAllBy(currentRoute.params)[0],
    find: state => id => state.products.filter(product => product.id == id)
  },
  mutations: {
    [SET_ITEMS]: (state, payload) => {
      state.products = payload
    }
  },
  actions: {
    get ({ dispatch, commit, getters, rootGetters }) {
      axios.get('https://my-json-server.typicode.com/Daivir/api-test/products').then(response => {
        commit(SET_ITEMS, response.data)
      }, error => console.log(error))
    }
  }
}

const categories = {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    all: state => state.categories
  },
  mutations: {
    get (state, payload) {
      state.categories = payload
    }
  },
  actions: {
    get ({ commit }) {
      axios.get('https://my-json-server.typicode.com/Daivir/api-test/categories').then(response => {
        commit('get', response.data)
      }, error => console.log(error))
    }
  }
}

const store = new VueX.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    products,
    categories
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
