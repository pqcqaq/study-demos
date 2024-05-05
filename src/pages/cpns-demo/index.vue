<template>
	<div>
		<my-input
			:test="123"
			v-bind="demoAttr"
			v-on="demoEvent"
			v-model="model"
		></my-input>
	</div>
	<div class="info">
		<div
			v-for="(item, index) in info.slice(info.length - 6, info.length)"
			:key="index"
		>
			{{ item }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
// import MyInput from "./cpns/MyInput.vue";
const MyInput = defineAsyncComponent(() => import("./cpns/MyInput.vue"));

const info = ref<string[]>([]);
const model = ref<string>("");

const demoAttr = ref<Record<string, any>>({
	value: "hello",
	placeholder: "请输入",
	style: {
		width: "600px",
	},
});

const demoEvent = ref<Record<string, Function>>({
	submit: () => {
		console.log("submit");
		info.value.push("submit");
	},
	onUpdate: (value: string) => {
		console.log("onUpdate", value);
		info.value.push("onUpdate");
	},
	onClick: () => {
		console.log("onClick");
		info.value.push("onClick");
	},
	// onTest: () => {
	//     console.log("onTest");
	//     info.value.push("onTest");
	// },
	"update:value": (value: string) => {
		console.log("onUpdate:value", value);
		info.value.push("onUpdate:value");
        model.value = value;
        // 还需要更新value，因为在组件内部，v-model绑定的是value
        demoAttr.value.value = value;
	},
});
</script>

<style scoped></style>
