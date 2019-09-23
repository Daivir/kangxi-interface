<template>
  <v-card tile id="product">
    <!--<item :index="index" :item="product" :items="products"></item>-->
      <v-img
        :aspect-ratio="16/9"
        :src="product.image"
        max-width="600"
      >
        <v-toolbar dark flat color="transparent" style="background-image: linear-gradient(rgba(25,32,72,.5), rgba(100,115,201,0));">
          <v-btn icon @click="$router.push({ name: 'category', category_name: $route.params.category_name })">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-toolbar>
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
      <v-card-title class="d-flex justify-space-between align-baseline font-weight-medium">
        <span>{{ product.name }}</span>
        <span class="title">256,00 €</span>
      </v-card-title>
      <v-card-text>
        Description Lorem ipsum dolor sit amet
      </v-card-text>
      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>

      <v-row justify="space-between" class="mx-4 my-2">
        <v-btn
          icon
          raised
          :disabled="index - 1 < 0"
          :to="buildUrl(prevItem)"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          icon
          raised
          :disabled="index + 1 >= products.length"
          :to="buildUrl(nextItem)"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
      {{ product }}
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Item from './Item'

export default {
  components: { Item },
  data: () => ({}),
  methods: {},
  computed: {
    ...mapGetters('products', {
      itemsByCategory: 'findAllBy',
      item: 'findBy'
    }),
    product () {
      return this.item(this.$route)
    },
    products () {
      return this.itemsByCategory({ category_name: this.$route.params.category_name })
    },
    index () {
      return this.products.indexOf(this.product)
    },
    prevItem () {
      return this.index - 1 >= 0 ? this.products[this.index - 1] : null
    },
    nextItem () {
      return this.index + 1 <= this.products.length - 1 ? this.products[this.index + 1] : null
    },
    buildUrl () {
      return item => {
        if (item === null) {
          return {}
        }
        let params = Object.keys(this.$route.params)
          .map(param => ({ [param]: item[param] }))
          .reduce((params, currentItem) => Object.assign(params, currentItem))
        return { params }
      }
    }
  }
}
</script>

<style lang="scss" scopped>
</style>