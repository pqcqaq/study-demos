<template>
	<div>
		<span
			@click="reflash"
			style="cursor: pointer; color: hsla(237deg 74% 33% / 61%)"
			>{{ Realoptions.length > 0 ? "" : msg }}</span
		>
		<a-checkbox-group v-model:value="checked" v-bind="$attrs">
			<a-checkbox
				v-for="option in Realoptions"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</a-checkbox>
		</a-checkbox-group>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type propsType = {
	value: string[] | number[] | undefined;
	options:
		| Array<{ label: string; value: string | number }>
		| (() =>
				| Array<{ label: string; value: string | number }>
				| Promise<Array<{ label: string; value: string | number }>>);
};

const props = defineProps<propsType>();
const emit = defineEmits(["update:value"]);
const checked = computed({
	get() {
		return props.value;
	},
	set(value) {
		emit("update:value", value);
	},
});

const msg = ref("加载中....");

const Realoptions = ref<Array<{ label: string; value: string | number }>>([]);

const getData = async () => {
	try {
		if (props.options instanceof Function) {
			const optionsPromise = await props.options();
			Realoptions.value = optionsPromise;
		} else {
			Realoptions.value = props.options;
		}
	} catch (error) {
		msg.value = "数据加载失败";
	}
};

onMounted(async () => {
	if (!props.options) {
		msg.value = "暂无数据";
		return;
	}
	await getData();
});

const reflash = async () => {
	await getData();
};
</script>

<style scoped></style>
