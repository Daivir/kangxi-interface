<template>
	<div id="homepage">
		<v-app-bar
			app
			:class="[{'app-bar__bg-color': offsetTop > height}]"
			dark
			:style="'background-color:red;'"
			:elevation="offsetTop > height ? 5 : 0"
			:scroll-threshold="threshold"
		>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</v-app-bar>
		<!-- <v-carousel style="position:fixed;" cycle :height="height" hide-delimiters show-arrows-on-hover>
			<v-carousel-item v-for="n in 3" :key="n">
				<v-img
					:aspect-ratio="16/9"
					:height="height"
					:src="`https://picsum.photos/id/${n * 2 + 8}/1280/720`"
				></v-img>
			</v-carousel-item>
		</v-carousel> :style="`padding-top:${height}px;`" -->
		<v-content style="background:transparent;height:150vh;overflow-x: hidden;perspective: 1px;perspective-origin: center top;transform-style: preserve-3d;">
			<div>
			<!-- 	<v-carousel style="transform-origin: center top;transform: translateZ(-1px) scale(2);" cycle :height="height" hide-delimiters show-arrows-on-hover>
					<v-carousel-item v-for="n in 3" :key="n">
						<v-img
							:aspect-ratio="16/9"
							:height="height"
							contain
							:src="`https://picsum.photos/id/${n * 2 + 8}/1280/720`"
						></v-img>
					</v-carousel-item>
				</v-carousel> -->
					<img style="overflow-x: hidden;height:50vh;transform-origin: center top;transform: translateZ(-1px) scale(2);" src="https://picsum.photos/id/18/1280/720" alt="">
					<v-container style="transform: translateZ(0);">
						<v-card style="min-height: 200vh;" tile>
							{{ offsetTop }}
							<br/>
							{{ threshold }}
							<br/>
							{{ windowSizes }}
							<br/>
						</v-card>
					</v-container>
			</div>
		</v-content>
	</div>
</template>

<script>
import colors from "vuetify/lib/util/colors";
export default {
	props: {
		offsetTop: Number,
		threshold: Number,
		windowSizes: Object
	},
	data() {
		return {};
	},
	methods: {
		AppBarStyle() {
			function hexToRgb(hex) {
				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : null;
			}
			let rate = (1 - (this.height - this.offsetTop) / this.height).toPrecision(3);
			if (rate >= 1) {
				rate = 1;
			}
			let color = Object.values(hexToRgb(colors.blue.base)).join(', ')
			return {
				background: `rgba(${color}, ${rate})`
			};
		}
	},
	computed: {
		height() {
			return this.windowSizes.x * (9 / 16);
		}
	}
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";
.app-bar__bg-color {
	/* background: linear-gradient(
    to left,
    rgba(map-get($blue, 'base'), 1),
    rgba(map-get($indigo, 'base'), 1)
  ) */
}
</style>