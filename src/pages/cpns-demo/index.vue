<template>
	<div>
		<my-input v-bind="demoAttr" v-on="demoEvent"></my-input>
	</div>
	<div class="info">
		<div v-for="(item, index) in info" :key="index">{{ item }}</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyInput from "./cpns/MyInput.vue";

const info = ref<string[]>([]);

const demoAttr = ref<Record<string, any>>({
	value: "hello",
	placeholder: "请输入",
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
});
</script>

<style scoped></style>
