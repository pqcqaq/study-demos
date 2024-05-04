<template>
	<div>
		<div
			class="title"
			style="
				display: flex;
				justify-content: center;
				margin-bottom: 10px;
				align-items: center;
			"
		>
			{{ props.schema.title }}
		</div>
		<a-form
			ref="formRef"
			:model="formModel"
			v-bind="$attrs && props.schema.formProps"
		>
			<a-form-item
				:name="item.field"
				:label="item.label"
				v-for="item in props.schema.items"
				:key="item.field"
				v-bind="item.formItemProps"
			>
				<component
					:is="componentsMap[item.component].component"
					v-bind="item.componentProps"
					v-model:value="formModel[item.field]"
				/>
				<div class="subForms">
					<keep-alive>
						<DynamicForm
							v-if="showNext(formModel[item.field], item)"
							:schema="
								nextFormSchema(formModel[item.field], item)
							"
							v-model="nextModel"
						/>
					</keep-alive>
				</div>
			</a-form-item>
			<div
				v-if="props.showBtns"
				style="display: flex; justify-content: center"
			>
				<a-button v-if="btnShow?.clearAll" @click="handleClear"
					>重置(全部清空)</a-button
				>
				<a-button
					v-if="btnShow?.reset"
					style="margin-left: 50px"
					@click="handleReset"
					>重置</a-button
				>
				<a-button
					v-if="btnShow?.submit"
					type="primary"
					style="margin-left: 50px"
					@click="handleSubmit"
					>提交</a-button
				>
			</div>
		</a-form>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, defineAsyncComponent, computed } from "vue";
import type { DyForm, DyFormItem } from "../types/DynamicForm";
import { componentsMap } from "../types/DynamicForm";
import { FormInstance } from "ant-design-vue/es/form/Form";
import { isEqual } from "lodash";

type BtnsShow = {
	clearAll: 0 | 1;
	reset: 0 | 1;
	submit: 0 | 1;
};

type dynamicType = {
	schema: DyForm;
	modelValue: Record<string, any>;
	showBtns?: boolean | BtnsShow;
};

const props = defineProps<dynamicType>();
const btnShow = computed(() => {
	if (typeof props.showBtns === "boolean") {
		return {
			clearAll: 0,
			reset: 1,
			submit: 1,
		};
	}
	return props.showBtns;
});
const formRef = ref<FormInstance | null>(null);

const formModel = ref<Record<string, any>>(
	props.schema.items.reduce((pre: Record<string, any>, cur: DyFormItem) => {
		if (!pre[cur.field]) {
			// 表单初始数据(默认值)
			pre[cur.field] = cur.value;
			return pre;
		}
		return {};
	}, {} as Record<string, any>)
);

// 表单初始化
const initForm = () => {
	// model初始数据
	formModel.value = props.schema.items.reduce(
		(pre: Record<string, any>, cur: DyFormItem) => {
			if (!pre[cur.field]) {
				// 表单初始数据(默认值)
				pre[cur.field] = cur.value;
				return pre;
			}
			return {};
		},
		{} as Record<string, any>
	);
};

onMounted(() => {
	initForm();
	// 构建表单项后才回显model值,model会覆盖schema配置的value值
	watch(
		() => props.modelValue,
		(newVal) => {
			formModel.value = { ...formModel.value, ...newVal };
		},
		{
			immediate: true,
			deep: true,
		}
	);
	hasNext.value = props.schema.items.some((item) => item.next);
});

// 表单验证
const validateFields = () => {
	return new Promise<{
		[key: string]: any;
	}>((resolve, reject) => {
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
const hasNext = ref(false); // 是否有下一级表单
const nextModel = ref<Record<string, any>>({}); // 下一级表单数据
const showNext = computed(
	() => (model: Record<string, any>, item: DyFormItem) => {
		return nextFormSchema.value(model, item).items.length > 0;
	}
);
const nextFormSchema = computed(
	() => (model: Record<string, any>, item: DyFormItem) => {
		formModel.value["next"] = model;
		return item.next?.(model) || { title: "", items: [] };
	}
);

const handleSubmit = async () => {
	const formData: { [key: string]: any } | undefined =
		(await formRef.value?.validateFields()) || {};
	formData["next"] = nextModel.value;
	console.log("提交信息:", formData);
	props.schema.onSubmit?.(formData);
};

const handleReset = () => {
	resetFields(false);
};

const handleClear = () => {
	resetFields();
};

const emit = defineEmits(["update:modelValue"]);

watch(
	() => formModel.value,
	(newVal) => {
		if (isEqual(newVal, props.modelValue)) {
			emit("update:modelValue", newVal);
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

watch(
	() => nextModel.value,
	(newVal) => {
		if (isEqual(newVal, formModel.value["next"])) {
			formModel.value["next"] = newVal;
		}
	},
	{
		deep: true,
		immediate: true,
	}
);

// 暴露方法
defineExpose({
	validateFields,
	resetFields,
});
</script>
<style lang=scss scoped>
.title {
	font-size: 20px;
	font-weight: bold;
}
.subForms {
	margin-left: 0;
	width: 100%;
}
</style>