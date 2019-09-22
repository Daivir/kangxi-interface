<template>
  <v-container>
    Index: {{ index }}
    <br/>
    Item : {{ item }}
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    index: Number,
    item: Object
  },
  data: () => ({})
}
</script>

<style lang="scss" scopped>
</style>