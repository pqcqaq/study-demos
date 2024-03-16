<template>
	<div>
		<div class="test">
			<el-button @click="show = !show">显示/隐藏</el-button>
			<div
				v-slide-in="{
					direction: 'left',
					showAnyway: true,
				}"
				class="box red"
				v-if="show"
			></div>
		</div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in class="box"></div>
		<div v-slide-in:left></div>
		<div v-slide-in:left class="box"></div>
		<div v-slide-in:left class="box"></div>
		<div v-slide-in:left class="box"></div>
		<div v-slide-in:left class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:right class="box"></div>
		<div v-slide-in:up class="box"></div>
		<div v-slide-in:up class="box"></div>
		<div v-slide-in:up class="box"></div>
		<div v-slide-in:up class="box"></div>
		<div v-slide-in:up class="box"></div>
		<div v-slide-in:up class="box"></div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
</script>

<style lang="scss" scoped>
.box {
	width: 500px;
	height: 100px;
	background-color: rgb(196, 200, 255);
	transition: width 2s;
	margin-top: 60px;
	margin-bottom: 10px;
}
.red {
	background-color: rgb(237, 175, 175);
}
.test {
	margin-top: 50px;
}
</style>
