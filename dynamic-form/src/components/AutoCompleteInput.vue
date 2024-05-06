<template>
	<a-auto-complete
		v-model:value="alterData"
		:placeholder="`输入${title}内容${
			enableSplit ? '（以' + splitWord + '分割）' : ''
		} 或选择已有${title}`"
		@select="handleSelect"
		:options="promptList"
		@search="onSearch"
		v-bind="$attrs && props.style"
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, defineProps, defineEmits } from "vue";
import AAutoComplete from "ant-design-vue";

type AutoInputList = {
	label?: string;
	value: string;
};

const props = defineProps<{
	title?: string;
	value: string | undefined;
	fetchList:
		| (() => Promise<AutoInputList[]> | AutoInputList[])
		| AutoInputList[]
		| undefined;
	style?: Partial<CSSStyleDeclaration>;
	enableSplit?: boolean;
	splitWord?: string;
}>();
const emit = defineEmits(["update:value"]);
const list = ref<AutoInputList[]>([]);
const promptList = ref<AutoInputList[]>([]);

onMounted(async () => {
	if (!props.fetchList) return;
	if (props.fetchList instanceof Function) {
		const newList = await props.fetchList();
		list.value.push(...newList);
	} else {
		list.value.push(...props.fetchList);
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

const finalSplitWord = computed(() => props.splitWord || ",");
const title = computed(() => props.title || "内容");
const enableSplit = computed(() => !!props.enableSplit);

const createFilter = (arr: { value: string }[], key: string) => {
	const finalKey = enableSplit.value
		? key.split(finalSplitWord.value).pop()?.trim()
		: key;
	return arr.filter(
		(item) => item.value.includes(finalKey || "") && item.value !== finalKey
	);
};

const handleSelect = (select: string) => {
	if (enableSplit.value) {
		const dataWithoutFinalKey = alterData.value
			? alterData.value.endsWith(finalSplitWord.value)
				? alterData.value.split(finalSplitWord.value).slice(0, -1)
				: alterData.value.split(finalSplitWord.value)
			: [];
		const newValue = alterData.value
			? [...dataWithoutFinalKey, select].join(finalSplitWord.value)
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
