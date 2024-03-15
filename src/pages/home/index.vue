<template>
	<div>
		<div class="search">
			<el-input
				v-model="search"
				placeholder="输入搜索条件"
				@change="handleSearch"
				@input="handleSearch"
				@focus="handleSearch"
				@blur="handleSearch"
			></el-input>
		</div>
		<div class="list">
			<div class="item" v-for="([path, name], index) in searchResult">
				<div class="to" :key="index" @click="handlePath(path)">
					<div>{{ name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import router, { routes } from "../../router/index.ts";
import { onMounted, ref } from "vue";

const handlePath = (path: string) => {
  ElMessage.info(`route to: ${path}`);
	router.push(path);
};

const pathToName = new Map<string, string>();

const getPathAndName = (basePath: string, childrenRoute: RouteRecordRaw) => {
	const { path, name, children } = childrenRoute;
  const genPath = path.endsWith("/") ? `${basePath}` : `${basePath}/${path}`;
	if (genPath && name) {
		pathToName.set(genPath, name as string);
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

const search = ref("");
const searchResult = ref<Map<string, string>>(new Map());

const handleSearch = () => {
	const result = new Map<string, string>();
	pathToName.forEach((name, path) => {
		if (name.includes(search.value)) {
			result.set(path, name);
		}
	});
	searchResult.value = result;
};

onMounted(() => {
	handleSearch();
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
.search {
	position: fixed;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
}

// 给item添加显示和隐藏动画
.item-enter-active,
.item-leave-active {
	transition: all 0.5s;
}
.item-enter,
.item-leave-to {
	opacity: 0;
	transform: translateY(-100px);
}
</style>
