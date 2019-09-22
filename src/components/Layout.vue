<template>
  <div id="default-layout">
    <v-app-bar
      app
      short
      :dense="$vuetify.breakpoint.mdAndDown"
      elevate-on-scroll
      hide-on-scroll
      :extended="!($route.meta.navbar === 'no-tab')"
      :scroll-threshold="threshold"
    >
      <template v-if="!($route.meta.navbar === 'no-tab')">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <template v-else>
        <v-btn icon raised @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
      </template>
      <v-toolbar-title class="text-uppercase primary--text">
        galerie kangxi
      </v-toolbar-title>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-if="!($route.meta.navbar === 'no-tab')" v-slot:extension>
        <v-tabs
          :align-with-title="$vuetify.breakpoint.mdAndUp"
          :show-arrows="!$vuetify.breakpoint.mdAndUp"
          background-color="transparent"
          center-active
        >
          <v-tab :to="{ name: 'home' }">Accueil</v-tab>
          <v-tab :to="{ name: 'last' }">Nouveautés</v-tab>
          <v-tab
            :to="{ name: 'category', params: { category_id: category.id } }"
            v-for="(category, i) in categories"
            :key="i"
          >{{ category.name }}</v-tab>
          <!-- <v-text-field
            v-if="$vuetify.breakpoint.mdAndUp"
            solo
            small
            clearable
            hide-details
            single-line
            class="align-center"
            style="max-width:512px;"
            flat
            prepend-inner-icon="mdi-magnify"
            placeholder="Chercher..."
          ></v-text-field> -->
        </v-tabs>
      </template>
    </v-app-bar>
    <v-content>
      <transition :name="transitionName" mode="out-in">
        <router-view/> <!-- :key="$route.fullPath" -->
      </transition>
    </v-content>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const DEFAULT_TRANSITION = 'fade'

export default {
  props: {
    offsetTop: Number,
    threshold: Number
  },
  data: () => ({
    transitionName: DEFAULT_TRANSITION
  }),
  methods: {
    ...mapActions('categories', {
      getCategories: 'get'
    }),
    ...mapActions('products', {
      getProducts: 'get'
    })
  },
  computed: {
    ...mapGetters({
      categories: 'categories/all'
    })
  },
  beforeRouteUpdate (to, from, next) {
    let transitionName = to.meta.transitionName || from.meta.transitionName;
    if (transitionName === 'slide') {
      const toDepth = to.path.split('/').filter((v) => v !== "").length
      const fromDepth = from.path.split('/').filter((v) => v !== "").length
      transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
    this.transitionName = transitionName || DEFAULT_TRANSITION
    next()
  },
  created() {
    this.getCategories()
    this.getProducts()
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: .3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: .5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(.55, 0, .1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>