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
				<div class="subForms" v-if="hasNext">
					<DynamicForm
						v-if="showNext(formModel[item.field], item)"
						:schema="nextFormSchema(formModel[item.field], item)"
						v-model="nextModel"
						:registe-to-parent="register"
						:un-registe-from-parent="unRegister"
					/>
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
import {
	ref,
	onMounted,
	defineAsyncComponent,
	computed,
	onBeforeMount,
	watch,
	onUnmounted,
	getCurrentInstance,
	ComponentInternalInstance,
} from "vue";
import type { DyForm, DyFormItem } from "../types/DynamicForm";
import { componentsMap } from "../types/DynamicForm";
import { FormInstance } from "ant-design-vue/es/form/Form";

type BtnsShow = {
	clearAll: 0 | 1;
	reset: 0 | 1;
	submit: 0 | 1;
};

type dynamicType = {
	schema: DyForm;
	modelValue: Record<string, any>;
	showBtns?: boolean | BtnsShow;
	registeToParent?: (selfIns: ComponentInternalInstance) => void;
	unRegisteFromParent?: (selfIns: ComponentInternalInstance) => void;
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
const selfInstance = getCurrentInstance();
const nextModel = ref<Record<string, any>>({});
const nextFormRefs = ref<ComponentInternalInstance[]>([]);

onMounted(() => {
	if (props.registeToParent && selfInstance) {
		props.registeToParent(selfInstance);
	}
});

onUnmounted(() => {
	if (props.unRegisteFromParent && selfInstance) {
		props.unRegisteFromParent(selfInstance);
	}
});

const register = (form: ComponentInternalInstance) => {
	nextFormRefs.value.push(form as any);
};

const unRegister = (form: ComponentInternalInstance) => {
	const index = nextFormRefs.value.findIndex((item) => item.uid == form.uid);
	if (index > -1) {
		nextFormRefs.value.splice(index, 1);
	}
};

const emit = defineEmits(["update:modelValue"]);
const formModel = computed({
	get: () => {
		return props.modelValue;
	},
	set: (value) => {
		emit("update:modelValue", value);
	},
});

// 表单初始化
const initForm = () => {
	// model初始数据
	const rawModel = props.schema.items.reduce(
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
	formModel.value = { ...formModel.value, ...rawModel };
};

onBeforeMount(() => {});

onMounted(() => {
	initForm();
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
	// model初始数据
	const rawModel = props.schema.items.reduce(
		(pre: Record<string, any>, cur: DyFormItem) => {
			if (!pre[cur.field]) {
				// 表单初始数据(默认值)
				pre[cur.field] = isInit ? undefined : cur.value;
				return pre;
			}
			return {};
		},
		{} as Record<string, any>
	);
	formModel.value = { ...formModel.value, ...rawModel };
};

const DynamicForm = defineAsyncComponent(() => import("./DynamicForm.vue"));
const hasNext = ref(false); // 是否有下一级表单
const showNext = computed(
	() => (model: Record<string, any>, item: DyFormItem) => {
		return nextFormSchema.value(model, item).items.length > 0;
	}
);
const nextFormSchema = computed(
	() => (model: Record<string, any>, item: DyFormItem) => {
		return item.next?.(model) || { title: "", items: [] };
	}
);

const handleSubmit = async () => {
	const formData = await validateThenGetModel();
	props.schema.onSubmit?.(formData);
};

const handleReset = () => {
	resetFields(false);
};

const handleClear = () => {
	resetFields();
};

const validateThenGetModel = async () => {
	const formData = await validateFields();
	nextFormRefs.value.forEach(async (form) => {
		await form.exposed?.validateThenGetModel();
	});
	formData["next"] = nextModel.value;
	return formData;
};

watch(
	() => nextModel.value,
	(newVal) => {
		formModel.value["next"] = newVal;
	},
	{
		deep: true,
		immediate: true,
	}
);

watch(
	() => formModel.value,
	(newVal) => {
		if (newVal["next"]) {
			nextModel.value = newVal["next"];
		}
	}
);

// 暴露方法
defineExpose({
	validateFields,
	resetFields,
	validateThenGetModel,
});
</script>
<style lang="scss" scoped>
.title {
	font-size: 20px;
	font-weight: bold;
}
.subForms {
	margin-left: 0;
	width: 100%;
}
</style>
