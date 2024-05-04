<template>
	<a-auto-complete
		v-model:value="alterData"
		:placeholder="`输入${props.title ? props.title : '内容'}${
			props.enableSplit ? '（以' + props.splitWord + '分割）' : ''
		} 或选择已有${props.title}`"
		@select="handleSelect"
		:options="promptList"
		@search="onSearch"
		v-bind="$attrs"
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

type PropsType = {
	title?: string;
	value: string;
	fetchList:
		| (() => Promise<{ value: string }[]> | { value: string }[])
		| undefined;
	width?: string;
	enableSplit?: boolean;
	splitWord?: string;
};

const props = defineProps<PropsType>();
const emit = defineEmits(["update:value"]);
const list = ref<{ value: string }[]>([]);
const promptList = ref<{ value: string }[]>([]);

onMounted(async () => {
	if (props.fetchList instanceof Function) {
		const newList = await props.fetchList();
		list.value.push(...newList);
	}
	promptList.value = list.value;
});

const alterData = computed({
	get() {
		return props.value;
	},
	set(value) {
		emit("update:value", value);
	},
});

const createFilter = (arr: { value: string }[], key: string) => {
	const finalKey = props.enableSplit
		? key
				.split(props.splitWord || ",")
				.pop()
				?.trim()
		: key;
	const newArr: { value: string }[] = [];
	arr.forEach((item) => {
		if (item.value.includes(finalKey || "") && item.value !== finalKey) {
			newArr.push(item);
		}
	});
	return newArr;
};

const handleSelect = (select: string) => {
	if (props.enableSplit) {
		const dataWithoutFinalKey = alterData.value
			? alterData.value.split(props.splitWord || ",").slice(0, -1)
			: [];
		const newValue = alterData.value
			? dataWithoutFinalKey.join(props.splitWord || ",") + (props.splitWord || ",") + select
			: select;
		alterData.value = newValue;
	} else {
		alterData.value = select;
	}
};

const onSearch = (searchText: string) => {
	promptList.value = createFilter(list.value, searchText);
};
</script>

<style scoped></style>
