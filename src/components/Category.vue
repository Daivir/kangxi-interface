<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products($route.params)" :key="product.id">
        <v-hover v-slot:default="{ hover }">
          <v-card
            tile
            style="overflow: hidden"
            :to="{ name: 'product', params: { slug: product.slug, id: product.id } }"
            min-width="256"
          >
            <v-img
              aspect-ratio="1"
              class="v-img--motion"
              :src="`https://picsum.photos/id/${product.id * 3 + 10}/1280/720`"
              :lazy-src="`https://picsum.photos/id/${product.id * 3 + 10}/16/9`"
            ></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({}),
  methods: {
  },
  computed: {
    ...mapGetters({
      products: 'products/findAllBy',
      find: 'products/find'
    })
  },
  created () {
  }
}
</script>

<style lang="scss" scopped>
</style>