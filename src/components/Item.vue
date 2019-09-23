<template>
  <v-card tile id="product">
    <v-toolbar dark flat color="secondary">
      <v-btn icon text @click="$router.push({ name: 'category', category_name: $route.params.category_name })">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ item.name }}</v-toolbar-title>
    </v-toolbar>
    <v-divider/>
    <v-container>
      <h1>{{ item }}</h1>
      <v-btn
        icon
        raised
        :disabled="index - 1 <= 0"
        :to="buildUrl(prevItem)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn
        icon
        raised
        :disabled="index + 1 >= items.length - 1"
        :to="buildUrl(nextItem)"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    index: Number,
    item: Object,
    items: Array
  },
  data: () => ({}),
  methods: {
    prevItem () {
      return this.index - 1 >= 0 ? this.items[this.index - 1] : null
    },
    nextItem () {
      return this.index + 1 < this.items.length - 1 ? this.items[this.index + 1] : null
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