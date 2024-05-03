<template>
	<div>
		<a-form ref="formRef" :model="formModel" v-bind="$attrs">
			<a-form-item
				:name="item.field"
				:label="item.label"
				v-for="item in formSchema"
				:key="item.field"
				v-bind="item.formItemProps"
			>
				<component
					:is="componentsMap[item.component]"
					v-bind="item.componentProps"
					v-model:value="formModel[item.field]"
				/>
				<div class="subForms">
					<DynamicForm
						v-if="showNext(formModel[item.field], item)"
						:schema="nextFormSchema(formModel[item.field], item)"
						:model="nextModel"
					/>
				</div>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, defineAsyncComponent, computed } from "vue";
import type { DyForm } from "../types/DynamicForm";
import { componentsMap } from "../types/DynamicForm";
import { FormInstance } from "ant-design-vue/es/form/Form";

type dynamicType = {
	schema: Array<DyForm>;
	model: Record<string, any>;
};

const props = defineProps<dynamicType>();

const formRef = ref<FormInstance | null>(null);

const formSchema = ref<DyForm[]>([]);
const formModel = ref<any>({});

// 表单初始化
const initForm = () => {
	// copy schema
	formSchema.value = props.schema.map((x) => {
		return {
			...x,
		};
	});

	// model初始数据
	formModel.value = props.schema.reduce((pre: DyForm, cur: DyForm) => {
		if (!(pre as any)[cur.field]) {
			// 表单初始数据(默认值)
			(pre as any)[cur.field] = cur.value;
			return pre;
		}
		return {} as DyForm;
	}, {} as DyForm);
};

onMounted(() => {
	initForm();
	// 构建表单项后才回显model值,model会覆盖schema配置的value值
	watch(
		() => props.model,
		(newVal) => {
			formModel.value = { ...formModel.value, ...newVal };
		},
		{
			immediate: true,
			deep: true,
		}
	);
});

// 表单验证
const validateFields = () => {
	return new Promise((resolve, reject) => {
		formRef.value
			?.validateFields()
			.then((formData) => {
				resolve(formData);
			})
			.catch((err) => reject(err));
	});
};

// 表单重置
const resetFields = (isInit = true) => {
	// 是否清空默认值
	if (isInit) {
		formModel.value = {};
	}
	formRef.value?.resetFields();
};

const DynamicForm = defineAsyncComponent(() => import("./DynamicForm.vue"));
const nextModel = ref<any>({});
const showNext = computed(() => (model: any, item: DyForm) => {
	return nextFormSchema.value(model, item).length > 0;
});
const nextFormSchema = computed(() => (model: any, item: DyForm) => {
	formModel.value["next"] = model;
	return item.next?.(model) || [];
});

// 暴露方法
defineExpose({
	validateFields,
	resetFields,
});
</script>
