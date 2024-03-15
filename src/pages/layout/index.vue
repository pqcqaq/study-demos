<template>
	<div class="main">
		<Header></Header>
		<Aside></Aside>
		<Footer></Footer>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./cpns/Header.vue";
import Footer from "./cpns/Footer.vue";
import Aside from "./cpns/Aside.vue";
</script>

<style lang="scss">
.main {
	width: 100%;
	height: 100%;
	background-color: #fff;
}
</style>
