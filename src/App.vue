<template>
  <v-app v-scroll="onScroll" v-resize="onResize">
    <router-view :offsetTop="offsetTop" :threshold="threshold" :windowSizes="windowSizes"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    offsetTop: 0,
    threshold: 28,
    windowSizes: {}
  }),
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset
    },
    onResize () {
      this.windowSizes = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>
