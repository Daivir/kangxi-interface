<template>
  <v-app v-scroll="onScroll">
    <router-view :offsetTop="offsetTop" :threshold="threshold"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    offsetTop: 0,
    threshold: 28
  }),
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset
    },
  }
}
</script>
