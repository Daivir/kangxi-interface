<template>
	<v-card tile :id="'product' + product.id">
		<v-app-bar app flat>
			<v-btn
				icon
				@click="$router.push({ name: 'category', category_id: $route.params.category_id })"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-spacer />
			<v-btn icon>
				<v-icon>mdi-download</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-container :class="[{'pa-0': $vuetify.breakpoint.xs}]">
			<v-img
				:aspect-ratio="16/9"
				:src="product.image"
			>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
			</v-img>
			<v-container fluid class="py-0">
				<v-row>
					<v-col cols="4" v-for="i in 3" :key="i">
						<v-img :aspect-ratio="16/9" :src="product.image">
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
				</v-row>
			</v-container>
			<v-container class="py-0">
				<v-card-title class="d-flex justify-space-between align-baseline font-weight-medium">
					<span>{{ product.name }}</span>
					<span class="subtitle-1">
						<b>256,00 €</b>
					</span>
				</v-card-title>
				<v-card-text>Description Lorem ipsum dolor sit amet</v-card-text>
				<v-card-text>
					<v-divider></v-divider>
				</v-card-text>
				<v-row justify="center">
					<v-btn class="mx-2" icon raised :disabled="index - 1 < 0" :to="buildUrl(prevItem)">
						<v-icon>mdi-arrow-left</v-icon>
					</v-btn>
					<v-btn
						class="mx-2"
						icon
						raised
						:disabled="index + 1 >= products.length"
						:to="buildUrl(nextItem)"
					>
						<v-icon>mdi-arrow-right</v-icon>
					</v-btn>
				</v-row>
			</v-container>
			{{ product }}
		</v-container>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Item from "./Item";

export default {
	components: { Item },
	data: () => ({}),
	methods: {},
	computed: {
		...mapGetters("products", {
			itemsByCategory: "findAllBy",
			item: "findBy"
		}),
		product() {
			return this.item(this.$route);
		},
		products() {
			return this.itemsByCategory({
				category_id: this.$route.params.category_id
			});
		},
		index() {
			return this.products.indexOf(this.product);
		},
		prevItem() {
			return this.index - 1 >= 0 ? this.products[this.index - 1] : null;
		},
		nextItem() {
			return this.index + 1 <= this.products.length - 1
				? this.products[this.index + 1]
				: null;
		},
		buildUrl() {
			return item => {
				if (item === null) {
					return {};
				}
				let params = Object.keys(this.$route.params)
					.map(param => ({ [param]: item[param] }))
					.reduce((params, currentItem) => Object.assign(params, currentItem));
				return { params };
			};
		}
	}
};
</script>

<style lang="scss" scopped>
</style>