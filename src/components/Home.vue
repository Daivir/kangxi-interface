<template>
  <v-container>
    <v-carousel
      show-arrows-on-hover
      hide-delimiters
      cycle
      continuous
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
          aspect-ratio="16/9"
          :src="`https://picsum.photos/1280/720?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/16/9?image=${n * 5 + 10}`"
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    height: null,
    model: null
  }),
  methods: {
    onResize () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        this.height = window.innerHeight - 120
      } else {
        this.height = window.innerHeight - 128
      }
    }
  }
}
</script>
