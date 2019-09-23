<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id">
        <v-hover v-slot:default="{ hover }">
          <v-card
            tile
            flat
            style="overflow: hidden"
            class="mx-auto"
            :to="{ name: 'product', params: { slug: product.slug, id: product.id } }"
            min-width="256"
            max-width="444"
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
  computed: {
    ...mapGetters({
      products: 'products/last'
    })
  }
}
</script>

<style lang="scss" scopped>
@import '~vuetify/src/styles/styles.sass';
.v-img--motion {
  transition: transform .2s linear;
  &:hover {
    transform: scale(1.1);
  }
}
.v-card--reveal {
  width: 100%;
  background-color: rgba(map-get($grey, 'darken-4'), .8);
}
</style>