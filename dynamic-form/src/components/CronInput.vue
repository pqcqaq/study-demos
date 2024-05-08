<template>
	<div>
		<a-input v-model:value="input" style="width: 350px">
			<template #addonAfter>
				<span type="primary" @click="showModal" style="cursor: pointer"
					>显示cron</span
				>
			</template>
		</a-input>
		<a-modal
			title="corn 表达式"
			v-model:open="visible"
			:footer="null"
			width="800px"
			destroyOnClose
		>
			<CronSelector
				:i18n="'cn'"
				:expression="input"
				@change="handleChange"
				@close="handleClose"
			></CronSelector>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CronSelector from "./CronSelector.vue";

type propsType = {
	value: string | undefined;
};

type CronType = {
	Week: string;
	day: string;
	hour: string;
	minute: string;
	month: string;
	second: string;
	year: string;
};

const props = defineProps<propsType>();

const emit = defineEmits(["update:value"]);

const input = computed({
	get: () => props.value || "",
	set: (value) => {
		emit("update:value", value);
	},
});

const visible = ref<boolean>(false);

const showModal = () => {
	visible.value = true;
};

const handleChange = (value: CronType) => {
	console.log("change", value);
    input.value = `${value.second} ${value.minute} ${value.hour} ${value.day} ${value.month} ${value.Week}`;
};
const handleClose = () => {
    console.log("close");
    visible.value = false;
};
</script>

<style scoped></style>
