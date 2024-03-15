<template>
	<div class="header">init</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.header {
	width: 100%;
	height: 60px;
	background-color: #c8b3d0;
	position: fixed;
	// 避开原有的导航栏
	top: 60px;
	left: 0;
	z-index: 100;
}
</style>
