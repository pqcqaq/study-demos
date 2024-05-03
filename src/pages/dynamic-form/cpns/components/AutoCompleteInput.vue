<template>
	<div>
		{{ props.title?.length ? props.title : "" }}
		<el-autocomplete
			:style="props.style"
			v-model="alterData"
			:fetch-suggestions="querySearchAsync"
			:placeholder="`输入${props.title}（以\`，\`分隔） 或 选择已有${props.title}`"
			@select="handleSelect"
		/>
	</div>
</template>

<script setup lang="ts">
import { AutocompleteFetchSuggestions } from "element-plus";
import { computed } from "vue";

type PropsType = {
	title?: string;
	modelValue: string | undefined;
	fetchList: () => Promise<string[]> | string[] | undefined;
	width?: string;
	enableSplit?: boolean;
	splitWord?: string;
	style: Partial<CSSStyleDeclaration>;
};

const props = defineProps<PropsType>();
const emit = defineEmits(["update:modelValue"]);
const list = props.fetchList ? await props.fetchList() : [];

const alterData = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});

const createFilter = (arr: string[], key: string) => {
	const finalKey = props.enableSplit
		? key.split(props.splitWord || ",").pop()
		: key;
	const newArr = finalKey
		? arr.filter((item) => {
				item.includes(finalKey) && item !== finalKey;
		  })
		: arr;
	const list = newArr.map((item) => {
		return {
			value: item,
		};
	});
	return list;
};

const querySearchAsync: AutocompleteFetchSuggestions = (
	queryString: string,
	cb: (arg: any) => void
) => {
	const realList = list;
	if (realList) {
		const arr = createFilter(realList, queryString);
		cb(arr);
	}
};

const handleSelect = (select: Record<string, any>) => {
	alterData.value = alterData.value + select.value;
};
</script>

<style scoped></style>
