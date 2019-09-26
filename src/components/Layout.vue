<template>
  <div id="default-layout">
    <v-app-bar
      app
      :style="'' + [offsetTop >= threshold ? 'background: linear-gradient(to left, #2196F3, #3F51B5);' : 'background-color: transparent']"
      dark
      :dense="$vuetify.breakpoint.mdAndDown"
      elevate-on-scroll
      hide-on-scroll
      extended
      :scroll-threshold="threshold"
    >
      <v-toolbar-title
        class="font-weight-light"
        style="font-size: 1.125rem;"
        v-text="'Galerie Kangxi'"
      ></v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <template v-slot:extension>
        <v-tabs
          :align-with-title="$vuetify.breakpoint.mdAndUp"
          :show-arrows="!$vuetify.breakpoint.mdAndUp"
          background-color="transparent"
          center-active
        >
          <v-tab :to="{ name: 'home' }">Accueil</v-tab>
          <v-tab :to="{ name: 'last' }">Nouveautés</v-tab>
          <v-tab
            optional
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
    <v-carousel
      show-arrows-on-hover
      hide-delimiters
      cycle
      continuous
      height="250"
      v-resize="onResize"
      :height="height"
    >
      <v-carousel-item
        eager
        v-for="n in 3"
        :key="n"
      >
        <v-img
          :height="height"
          :aspect-ratio="16/9"
          :src="`https://picsum.photos/1280/720?image=${n * 5 + 120}`"
          :lazy-src="`https://picsum.photos/16/9?image=${n * 5 + 120}`"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-content>
      <transition :name="transitionName" mode="out-in">
        <keep-alive>
          <router-view/> <!-- :key="$route.fullPath" -->
        </keep-alive>
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
    transitionName: DEFAULT_TRANSITION,
    height: null
  }),
  methods: {
    ...mapActions('categories', {
      getCategories: 'get'
    }),
    ...mapActions('products', {
      getProducts: 'get'
    }),
    onResize () {
      if (window.innerHeight < window.innerWidth) {
        return this.height = window.innerHeight
      }
      return window.innerWidth / (9/16)
    }
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