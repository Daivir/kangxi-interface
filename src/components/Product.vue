<template>
  <v-container id="product">
    <template v-on:keyup.38="$router.go(paginate.prev())"></template>
    <v-row justify="space-between" class="mx-4">
      <v-btn
        icon
        raised
        :disabled="!isValidIndex(prevItem())"
        :to="paginate.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        raised
        :disabled="!isValidIndex(nextItem())"
        :to="paginate.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <h1>{{ product }}</h1>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Item from './Item'

class Pagination
{
  constructor(items, current, route) {
    this.items = items
    this.current = current
    this.route = route
  }
  index() {
    return this.items.indexOf(this.current)
  }
  isValidIndex(index) {
    return index >= 0 && index < this.items.length - 1
  }
  toItem(index) {
    return this.isValidIndex(index) ? this.items[index] : null
  }
  prevItem() {
    return this.toItem(this.index() - 1)
  }
  nextItem() {
    return this.toItem(this.index() + 1)
  }
  getUrl (item) {
    if (item === null) {
      return {}
    }
    let name = null
    let params = Object.keys(this.route.params)
      .map(param => ({ [param]: item[param] }))
      .reduce((params, currentItem) => Object.assign(params, currentItem))
    return {name, params}
  }
  prev () {
    return this.getUrl(this.prevItem())
  }
  next () {
    return this.getUrl(this.nextItem())
  }
}

export default {
  components: {
    Item
  },
  data: () => ({}),
  methods: {
    prevItem () {
      return this.index - 1
    },
    nextItem () {
      return this.index + 1
    }
  },
  computed: {
    ...mapGetters({
      items: 'products/last',
      item: 'products/findBy'
    }),
    product () {
      return this.item(this.$route)
    },
    paginate () {
      return new Pagination(this.items, this.product, this.$route)
    },
    index () {
      return this.items.indexOf(this.product)
    },
    isValidIndex () {
      return index => index >= 0 && index < this.items.length - 1
    },
    to () {
      return index => {
        if (!this.isValidIndex(index)) {
          return {}
        }
        let item = this.items[index]
        return {name:this.$route.name,params:{slug:item.slug,id:item.id}}
      }
    }
  }
}
</script>

<style lang="scss" scopped>
</style>