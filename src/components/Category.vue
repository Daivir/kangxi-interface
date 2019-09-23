<template>
  <v-container class="mx-auto" style="max-width:1280px;">
    <v-dialog
      v-model="$route.meta.showModal"
      fullscreen
      persistent
      eager
      :transition="false"
    >
      <transition mode="in-out" name="slide-left">
        <router-view name="product" :index="1"></router-view>
      </transition>
    </v-dialog>
    <v-row>
      <v-col v-for="product in products({ category_name: $route.params.category_name })" :key="product.id">
        <v-hover v-slot:default="{ hover }">
          <v-card
            flat
            tile
            style="overflow: hidden"
            class="mx-auto"
            :to="{ name: 'product', params: { slug: product.slug, id: product.id } }"
            min-width="256"
          >
            <v-img
              aspect-ratio="1"
              class="v-img--motion"
              :src="product.image"
              :lazy-src="`https://picsum.photos/id/${product.id * 3 + 10}/16/9`"
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
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    index: null
  }),
  methods: {
  },
  computed: {
    ...mapGetters({
      products: 'products/findAllBy',
      find: 'products/find'
    })
  }
}
</script>

<style lang="scss">
</style>