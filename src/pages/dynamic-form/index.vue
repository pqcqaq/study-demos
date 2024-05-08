<template>
	<div style="padding: 200px">
		<DynamicForm
			ref="formRef"
			:schema="schema"
			v-model="model"
			class="custom"
			:show-btns="{
				reset: 1,
				clearAll: 1,
				submit: 1,
			}"
		/>
	</div>
	<div class="change">
		<a-button @click="changeModel" size="large">填充数据</a-button>
		<a-button @click="changeSchema" size="large">修改Schema</a-button>
		<a-button @click="handleTest" size="large">测试Schema</a-button>
		<a-button @click="testPopup" size="large">测试popup</a-button>
		<a-button @click="testAvatars" size="large">测试头像组</a-button>
	</div>
</template>

<script lang="ts" setup>
import DynamicForm from "../../../dynamic-form/src/DynamicForm.vue";
import { Ref, ref } from "vue";
import { DyForm, DyFormItem } from "../../../dynamic-form/src";
import { useFullScreenDyForm } from "../../../dynamic-form/src";
import { message } from "ant-design-vue";
import { schema as formSchema, test } from "./schema";

const testPopup = () => {
	useFullScreenDyForm({
		schema: test,
		init: {
			name: "test init",
		},
		submit: async (model, close) => {
			const data = await new Promise((resolve) => {
				setTimeout(() => {
					console.log("model", model);
					resolve(model);
				}, 1500);
			});
			message.success("提交成功" + JSON.stringify(data));
			close();
		},
		style: {
			backgroundColor: "rgba(255,255,255,0.8)",
			backdropFilter: "blur(10px)",
		},
		draggable: true,
		defaultValues: {
			name: "test",
			class: "test",
			studentId: "202020202020",
			mentions: "@百里守约",
		},
	});
};

const formRef = ref<InstanceType<typeof DynamicForm> | null>(null);

console.log("test", test);

const schema: Ref<DyForm> = ref<DyForm>(formSchema) as any;

const model = ref<Record<string, any>>({
	name: "百里守约",
});

const testAvatarGroup: DyForm = {
	items: [
		{
			label: "AvatarGroup",
			field: "avatarGroup",
			component: "AvatarGroup",
			componentProps: {
				groupProps: {
					maxCount: 2,
					maxPopoverPlacement: "bottom",
				},
				avatarProps: {
					size: 64,
					shape: "square",
					crossOrigin: "anonymous",
				},
				avatarGroupValue: [
					{
						key: "W",
						src: "",
						label: "Lily",
					},
					{
						key: "A",
						src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
						label: "Lily",
					},
					{
						key: "B",
						src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
						label: "Lily",
					},
				],
			},
		},
	],
};

const testAvatars = () => {
	schema.value = testAvatarGroup;
};

const changeModel = () => {
	model.value = {
		name: "百里守约",
		sex: 1,
		birthday: "2024-04-28",
		hobby: [1, 2],
		country: 2,
		desc: "11111",
		switch: true,
		slider: 30,
		rate: 8,
		tree: ["0-1"],
		autoComplete: "百里守约",
		autoCompleteColor: "蓝色",
		next: {
			next: {
				next: {
					next: {},
					closeReason: "111111",
				},
				closeTime: "20:16:45",
			},
			openTime: "20:16:36",
			weapon: "1220204124@zust.deu.cn",
		},
	};
};

const changeSchema = () => {
	const items: DyFormItem[] = [
		{
			label: "姓名",
			field: "name",
			component: "Text",
			componentProps: {
				allowClear: true,
				showCount: true,
				maxlength: 20,
				style: {
					width: "400px",
				},
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请输入姓名",
						type: "string",
						trigger: "blur",
					},
				],
			},
			value: "百里守约",
			next: (model: any) => {
				if (model == "百里守约") {
					return {
						items: [
							{
								label: "武器",
								field: "weapon",
								component: "Text",
								componentProps: {
									allowClear: true,
									showCount: true,
									maxlength: 80,
								},
								formItemProps: {
									rules: [
										{
											required: true,
											message: "武器只能是ABCDE中的一个",
											trigger: "blur",
											type: "enum",
											enum: ["A", "B", "C", "D", "E"],
										},
									],
								},
								componentEvent: {
									change: (value: string) => {
										console.log("change", value);
									},
								},
							},
						],
						formEvent: {
							submit: () => {
								console.log("submit");
							},
						},
					};
				}
			},
		},
	];
	schema.value = {
		title: "dynamicForm",
		formProps: {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 },
			hideRequiredMark: false,
		},
		items,
		onSubmit: async (model) => {
			await new Promise((resolve) => {
				setTimeout(() => {
					console.log("model", model);
					resolve(null);
				}, 1000);
			});
		},
	};
};

const handleTest = async () => {
	schema.value = test;
};
</script>

<style lang="scss" scoped>
.change {
	margin-top: 20px;
	display: flex;
	justify-content: center;
	gap: 20px;
}

.custom :deep(.custom-form) {
	border: 1px solid #f0f0f0;
}

.custom :deep(.one-form) {
	width: 500px;
	display: flex;
	justify-content: center;
	align-items: center;
	.one-form-items {
		display: flex;
	}
}
</style>
