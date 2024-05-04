<template>
	<div style="padding: 200px">
		<DynamicForm
			ref="formRef"
			:schema="schema"
			v-model="model"
			:showBtns="{ clearAll: 1, reset: 1, submit: 1 }"
		/>
	</div>
	<div class="change">
		<a-button @click="changeModel">change</a-button>
	</div>
</template>

<script lang="ts" setup>
import DynamicForm from "./cpns/DynamicForm.vue";
import { ref } from "vue";
import { DyForm } from "./types/DynamicForm";

const formRef = ref<InstanceType<typeof DynamicForm> | null>(null);

const schema = ref<DyForm>({
	title: "dynamicForm",
	formProps: {
		labelCol: { span: 4 },
		wrapperCol: { span: 20 },
		hideRequiredMark: false,
	},
	items: [
		// input
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
						trigger: "blur",
					},
				],
				colon: false,
				tooltip: "在这里输入姓名",
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
									style: {
										width: "350px",
									},
								},
								formItemProps: {
									rules: [
										{
											required: true,
											message: "格式不正确",
											trigger: "blur",
											type: "email",
										},
									],
									style: {
										marginTop: "10px",
									},
								},
							},
						],
					};
				}
			},
		},
		// radio
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
				hidden: false,
			},
			value: 1,
		},
		// datepicker
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
			componentProps: {
				format: "YYYY-MM-DD",
				valueFormat: "YYYY-MM-DD",
			},
		},
		// checkbox
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
		// select
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
		// textarea
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
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请输入简介",
						trigger: "blur",
					},
				],
			},
		},
		// switch
		{
			label: "是否开启",
			field: "switch",
			component: "Switch",
			componentProps: {
				checkedChildren: "开",
				unCheckedChildren: "关",
			},
			value: true,
			next: (model) => {
				if (model) {
					return {
						items: [
							{
								label: "开启时间",
								field: "openTime",
								component: "TimePicker",
								formItemProps: {
									rules: [
										{
											required: true,
											message: "请选择开启时间",
											trigger: "blur",
										},
									],
								},
								componentProps: {
									format: "HH:mm:ss",
									valueFormat: "HH:mm:ss",
									tooltips: ["选择时间"],
								},
								next: (model) => {
									if (model > "06:00:00") {
										return {
											items: [
												{
													label: "关闭时间",
													field: "closeTime",
													component: "TimePicker",
													formItemProps: {
														rules: [
															{
																required: true,
																message:
																	"请选择关闭时间",
																trigger: "blur",
															},
														],
													},
													componentProps: {
														format: "HH:mm:ss",
														valueFormat: "HH:mm:ss",
														tooltips: ["选择时间"],
													},
													next: (model) => {
														if (
															model > "18:00:00"
														) {
															return {
																items: [
																	{
																		label: "关闭原因",
																		field: "closeReason",
																		component:
																			"Text",
																		componentProps:
																			{
																				allowClear:
																					true,
																				showCount:
																					true,
																				maxlength: 80,
																				style: {
																					width: "350px",
																				},
																			},
																		formItemProps:
																			{
																				rules: [
																					{
																						required:
																							true,
																						message:
																							"请输入关闭原因",
																						trigger:
																							"blur",
																						type: "string",
																					},
																				],
																				style: {
																					marginTop:
																						"10px",
																				},
																			},
																	},
																],
															};
														}
													},
												},
											],
										};
									}
								},
							},
						],
					};
				}
			},
		},
		// slider
		{
			label: "滑块",
			field: "slider",
			component: "Slider",
			componentProps: {
				min: 0,
				max: 100,
				marks: {
					0: "0%",
					100: "100%",
				},
			},
		},
		{
			label: "头像",
			field: "avatar",
			component: "Upload",
			componentProps: {
				accept: "image/*",
				action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
				fileList: [],
				maxCount: 1,
			},
		},
		// rate
		{
			label: "评分",
			field: "rate",
			component: "Rate",
			componentProps: {
				count: 10,
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请评分",
						trigger: "blur",
					},
				],
			},
		},
		// treedata
		{
			label: "树形选择",
			field: "tree",
			component: "TreeSelect",
			componentProps: {
				treeData: [
					{
						title: "Node1",
						value: "0-0",
						children: [
							{
								title: "Child Node1",
								value: "0-0-0",
							},
						],
					},
					{
						title: "Node2",
						value: "0-1",
						children: [
							{
								title: "Child Node3",
								value: "0-1-0",
							},
						],
					},
				],
				multiple: true,
			},
		},
		//AutoComplete
		{
			label: "自动补全",
			field: "autoComplete",
			component: "AutoComplete",
			componentProps: {
				fetchList: () => {
					return [
						{
							value: "百里守约",
						},
						{
							value: "安琪拉",
						},
						{
							value: "李白",
						},
						{
							value: "韩信",
						},
					];
				},
				enableSplit: false,
				splitWord: "，",
				title: "角色",
				style: {
					width: "400px",
				},
				allowClear: true,
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请选择",
						trigger: "blur",
					},
				],
			},
		},
		//AutoComplete color 
		{
			label: "自动补全",
			field: "autoCompleteColor",
			component: "AutoComplete",
			componentProps: {
				fetchList: () => {
					return [
						{
							value: "红色",
						},
						{
							value: "绿色",
						},
						{
							value: "蓝色",
						},
						{
							value: "黄色",
						},
					];
				},
				enableSplit: true,
				splitWord: "，",
				title: "颜色",
				style: {
					width: "400px",
				},
				allowClear: true,
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请选择",
						trigger: "blur",
					},
				],
			},
		},
	],
	onSubmit: (model) => {
		console.log("model", model);
	},
});

const model = ref<Record<string, any>>({
	name: "百里守约",
});

const changeModel = () => {
	model.value = { name: "安琪拉" };
};
</script>
