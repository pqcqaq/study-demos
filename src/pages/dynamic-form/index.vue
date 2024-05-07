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
import { DyForm, DyFormItem, Options } from "../../../dynamic-form/src";
import { useFullScreenDyForm } from "../../../dynamic-form/src";
import { message } from "ant-design-vue";

const testPopup = () => {
	useFullScreenDyForm({
		schema: test,
		init: {
			name: "test init",
		},
		submit: async (model) => {
			const data = await new Promise((resolve) => {
				setTimeout(() => {
					console.log("model", model);
					resolve(model);
				}, 150);
			});
			message.success("提交成功" + JSON.stringify(data));
		},
	});
};

const formRef = ref<InstanceType<typeof DynamicForm> | null>(null);

const getOption = async () => {
	return new Promise<Options>((resolve, reject) => {
		setTimeout(() => {
			// 模拟50%的概率失败
			const random = Math.random();
			if (random < 0.8) {
				resolve([
					{
						value: "111111",
						label: "111111",
					},
					{
						value: "222222",
						label: "222222",
					},
					{
						value: "333333",
						label: "333333",
					},
					{
						value: "444444",
						label: "444444",
					},
				]);
			} else {
				reject("Failed to get options.");
			}
		}, 200);
	});
};

const test: DyForm = {
	title: "dynamicForm",
	items: [
		// 姓名班级学号
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
			value: "123123",
		},
		// 班级
		{
			label: "班级",
			field: "class",
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
						message: "请输入班级",
						trigger: "blur",
					},
				],
				colon: false,
				tooltip: "在这里输入班级",
			},
			value: "456456",
		},
		// 学号
		{
			label: "学号",
			field: "studentId",
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
						message: "请输入学号",
						trigger: "blur",
					},
				],
				colon: false,
				tooltip: "在这里输入学号",
			},
			value: "789789",
		},
		// devider
		{
			label: "",
			field: "divider",
			component: "Divider",
			componentProps: {
				orientation: "center",
				orientationMargin: "10px",
				dividerText: "下面是@用户组件",
			},
		},
		//Mentions
		{
			label: "Mentions",
			field: "mentions",
			component: "Mentions",
			componentProps: {
				allowClear: true,
				placeholder: "输入 @ 触发",
				prefix: ["@"],
				autofocus: true,
				options: [
					{
						value: "百里守约",
						label: "百里守约",
					},
					{
						value: "安琪拉",
						label: "安琪拉",
					},
					{
						value: "李白",
						label: "李白",
					},
					{
						value: "韩信",
						label: "韩信",
					},
				],
			},
			formItemProps: {
				rules: [
					{
						required: true,
						message: "请输入内容",
						trigger: "blur",
					},
				],
				colon: false,
				tooltip: "在这里输入内容",
			},
			value: "@百里守约",
		},
	],
};

console.log("test", test);

const formSchema: DyForm = {
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
			next: (model: any): DyForm | undefined => {
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
											message: "武器只能是ABCDE中的一个",
											trigger: "blur",
											type: "enum",
											enum: ["A", "B", "C", "D", "E"],
										},
									],
									style: {
										marginTop: "10px",
									},
									labelCol: { span: 3 },
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
			next: (model): DyForm | undefined => {
				if (model == 1) {
					return {
						items: [
							{
								label: "男生邮箱",
								field: "email",
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
				} else if (model == 2) {
					return {
						items: [
							{
								label: "女生邮箱",
								field: "email",
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
				} else if (model == 3) {
					return {
						items: [
							{
								label: "保密邮箱",
								field: "email",
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
		// async radio
		{
			label: "异步选择",
			field: "async-test",
			component: "Radio",
			componentProps: {
				options: () => getOption(),
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
		// async checkbox
		{
			label: "异步多选",
			field: "async-checkbox",
			component: "Checkbox",
			componentProps: {
				options: () => getOption(),
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
			next: (model): DyForm | undefined => {
				if (model) {
					return {
						className: "custom-form one-form",
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
									style: {
										display: "inline-block",
									},
									className: "one-form-items",
								},
								componentProps: {
									format: "HH:mm:ss",
									valueFormat: "HH:mm:ss",
									tooltips: ["选择时间"],
								},
								next: (model): DyForm | undefined => {
									if (model > "06:00:00") {
										return {
											className: "custom-form",
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
														style: {
															display:
																"inline-block",
														},
													},
													componentProps: {
														format: "HH:mm:ss",
														valueFormat: "HH:mm:ss",
														tooltips: ["选择时间"],
													},
													next: (
														model
													): DyForm | undefined => {
														if (
															model > "18:00:00"
														) {
															return {
																className:
																	"custom-form",
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
																					display:
																						"inline-block",
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
					50: "50%",
					100: "100%",
				},
			},
			next: (model): DyForm | undefined => {
				if (((model as number) || 0) > 50) {
					return {
						items: [
							{
								label: "提示信息",
								field: "tip",
								component: "Tag",
								componentProps: {
									bordered: true,
									color: "red",
									size: "large",
								},
								value: "你选中的值已经超过50",
							},
						],
					};
				}
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
				fetchList: [
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
				],
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
			next: (model): DyForm | undefined => {
				if (((model as string) || "").includes("蓝色")) {
					return {
						items: [
							{
								label: "选择类型",
								field: "type",
								component: "AutoComplete",
								componentProps: {
									fetchList: [
										{
											value: "类型1",
										},
										{
											value: "类型2",
										},
										{
											value: "类型3",
										},
										{
											value: "类型4",
										},
									],
									enableSplit: true,
									splitWord: "，",
									title: "类型",
									allowClear: true,
									style: {
										width: "350px",
									},
								},
								formItemProps: {
									rules: [
										{
											required: true,
											message: "请选择",
											trigger: "blur",
										},
									],
									style: {
										width: "400px",
									},
								},
							},
						],
					};
				}
			},
		},
	],
	onSubmit: async (model) => {
		await new Promise((resolve) => {
			setTimeout(() => {
				console.log("model", model);
				resolve(null);
			}, 1000);
		});
	},
};

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

// watch(
// 	() => model.value,
// 	(newVal) => {
// 		console.log("formModelValue", JSON.stringify(newVal));
// 	},
// 	{
// 		deep: true,
// 		immediate: true,
// 	}
// );
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
