<template>
	<div>
		<el-form>
			<div class="inputs" v-for="(field, index) in fields">
				// 展示表单元素
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";
import type { DynamicFormProps, Field } from "../types/DynamicForm";
const props = defineProps({
	dynamicForm: {
		type: Object as PropType<DynamicFormProps>,
		required: true,
	},
});

const fields = ref<Field[]>(props.dynamicForm.fields);
</script>

<style scoped></style>
