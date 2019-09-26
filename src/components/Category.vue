<template>
  <v-container class="mx-auto" style="max-width:1280px;">
    <v-dialog
      v-model="$route.meta.showModal"
      fullscreen
      persistent
      eager
      transition="dialog-slide-transition"
    >
      <transition mode="in-out" :name="transitionName">
        <router-view name="product"></router-view>
      </transition>
    </v-dialog>
    <v-row>
      <v-col v-for="product in products({ category_id: $route.params.category_id })" :key="product.id">
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
              :aspect-ratio="16/9"
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
const DEFAULT_TRANSITION = 'fade'
export default {
  data: () => ({
    index: null,
    transitionName: DEFAULT_TRANSITION
  }),
  methods: {
  },
  computed: {
    ...mapGetters({
      products: 'products/findAllBy',
      find: 'products/find'
    })
  },
  beforeRouteUpdate(to, from, next) {
		let transitionName = to.meta.transitionName || from.meta.transitionName;
		if (transitionName === "slide") {
			const toDepth = to.path.split("/").filter(v => v !== "").length;
			const fromDepth = from.path.split("/").filter(v => v !== "").length;
			transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
		}
		this.transitionName = transitionName || DEFAULT_TRANSITION;
		next();
	}
}
</script>

<style lang="scss">
</style>