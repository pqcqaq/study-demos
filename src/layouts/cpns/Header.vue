<template>
	<div class="body">
		<div class="header">
			<div
				class="logo"
				@click="
					router.push({
						name: '主页',
					})
				"
			>
				Vue Study Demos
			</div>
			<div class="nav">
				<!-- <div class="nav-item" @click="router.push('/')">首页</div>
        <div class="nav-item" @click="router.push('/about')">关于</div>
        <div class="nav-item" @click="router.push('/user')">用户</div> -->
			</div>
			<div class="name">
				{{ pathName }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import router from "../../router";

const pathName = ref("");

onMounted(() => {
	pathName.value = router.currentRoute.value.name as string;
});

onBeforeRouteUpdate((to, _from, next) => {
	pathName.value = to.name as string;
	next();
});
</script>

<style lang="scss" scoped>
.body {
	background-color: #f5f5f5;
	.header {
		z-index: 1000;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
		padding: 0 20px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.logo {
			font-size: 20px;
			font-weight: 700;
			color: #333;
			cursor: pointer;
		}
		.nav {
			display: flex;
			align-items: center;
			.nav-item {
				margin: 0 10px;
				cursor: pointer;
				&:hover {
					color: #1890ff;
				}
			}
		}
		.name {
			margin-right: 50px;
			font-size: 20px;
			font-weight: 700;
			color: #333;
		}
	}
}
</style>
