<template>
	<div>
		<div class="list">
			<div class="item" v-for="([path, name], index) in pathToName">
				<div class="to" :key="index" @click="router.push(path)">
					<div>{{ name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import router, { routes } from "../../router/index.ts";
import { ref } from "vue";

const pathToName = ref(new Map<string, string>());

const getPathAndName = (basePath: string, childrenRoute: RouteRecordRaw) => {
	const { path, name, children } = childrenRoute;
	const genPath = path.endsWith("/") ? `${basePath}` : `${basePath}/${path}`;
	if (name) {
		pathToName.value.set(genPath, name as string);
	}
	if (children) {
		children.forEach((route) => {
			getPathAndName(genPath, route);
		});
	}
	return { path, name };
};

routes.forEach((route) => {
	getPathAndName("", route);
});
</script>

<style lang="scss" scoped>
.to {
	cursor: pointer;
	color: #000;
	text-decoration: none;
	&:hover {
		color: #f00;
	}
}
.item {
	margin: 20px 0;
	box-shadow: 0 0 10px #000;
	// 圆角
	border-radius: 10px;
	padding: 5px;
	background-color: #fff;
	width: 150px;
	height: 30px;
	// 内部文字居中
	display: flex;
	justify-content: center;
	align-items: center;
}
.item:hover {
	background-color: #f0f0f0;
}
</style>
