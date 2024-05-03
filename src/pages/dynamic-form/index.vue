<template>
	<div style="padding: 200px">
		<DynamicForm
			ref="formRef"
			:schema="schema"
			:model="model"
			:labelCol="{ span: 4 }"
			:wrapperCol="{ span: 20 }"
		/>
		<div style="display: flex; justify-content: center">
			<a-button @click="handleReset(true)">重置(全部清空)</a-button>
			<a-button style="margin-left: 50px" @click="handleReset(false)"
				>重置</a-button
			>
			<a-button
				type="primary"
				style="margin-left: 50px"
				@click="handleSubmit"
				>提交</a-button
			>
		</div>
	</div>
</template>

<script lang="ts" setup>
import DynamicForm from "./cpns/DynamicForm.vue";
import { ref, watch } from "vue";
import dayjs from "dayjs";
import { DyForm } from "./types/DynamicForm";
const formRef = ref<InstanceType<typeof DynamicForm> | null>(null);

const schema = ref<DyForm[]>([
	{
		label: "姓名",
		field: "name",
		component: "Text",
		componentProps: {
			allowClear: true,
			showCount: true,
			maxlength: 20,
			style: {
				width: "500px",
			},
		},
		formItemProps: {
			rules: [
				{
					required: true,
					message: "请输入姓名",
					trigger: "blur",
				},
			],
		},
		next: (model: any) => {
			if (model == "百里守约") {
				return [
					{
						label: "武器",
						field: "weapon",
						component: "Text",
						componentProps: {
							allowClear: true,
							showCount: true,
							maxlength: 20,
							style: {
								width: "450px",
							},
						},
						formItemProps: {
							rules: [
								{
									required: true,
									message: "请输入武器",
									trigger: "blur",
								},
							],
							style: {
								marginTop: "10px",
							},
						},
					},
				];
			}
			return [];
		},
	},
	{
		label: "性别",
		field: "sex",
		component: "Radio",
		componentProps: {
			options: [
				{ value: 1, label: "男" },
				{ value: 2, label: "女" },
				{ value: 3, label: "保密" },
			],
		},
		formItemProps: {
			rules: [
				{
					required: true,
					message: "请选择性别",
					trigger: "blur",
				},
			],
		},
		value: 1,
	},
	{
		label: "生日",
		field: "birthday",
		component: "DatePicker",
		formItemProps: {
			rules: [
				{
					required: true,
					message: "生日日期不能为空",
					trigger: "blur",
				},
			],
		},
	},
	{
		label: "兴趣",
		field: "hobby",
		component: "Checkbox",
		componentProps: {
			options: [
				{ value: 1, label: "足球" },
				{ value: 2, label: "篮球" },
				{ value: 3, label: "排球" },
			],
		},
	},
	{
		label: "国家",
		field: "country",
		component: "Select",
		componentProps: {
			allowClear: true,
			options: [
				{ value: 1, label: "中国" },
				{ value: 2, label: "美国" },
				{ value: 3, label: "俄罗斯" },
			],
		},
	},
	{
		label: "简介",
		field: "desc",
		component: "Textarea",
		componentProps: {
			allowClear: true,
			autoSize: {
				minRows: 4,
				maxRows: 4,
			},
			maxlength: 200,
			showCount: true,
		},
	},
]);
const model = ref({ name: "百里守约" });
// 提交
const handleSubmit = async () => {
	const formData: any = await formRef.value?.validateFields();
	if (formData.birthday) {
		formData.birthday = dayjs(formData.birthday).format("YYYY-MM-DD");
	}
	console.log("提交信息:", formData);
};

// 重置
const handleReset = (isInit: any) => {
	formRef.value?.resetFields(isInit);
};
watch(
	() => model.value,
	(newVal) => {
		console.log("model", newVal);
	},
	{
		deep: true,
		immediate: true,
	}
);
</script>
