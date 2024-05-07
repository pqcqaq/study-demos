# 动态表单组件

## 介绍

- 一个提供纯配置化生成表单的快速开发组件。

## 开始

- 在线体验：[Study Demos (prod) (zust.online)](https://study-demos.zust.online/#/dynamic-form)

- 本项目依赖于antd的表单组件
- 此仓库不作为独立的依赖进行导入，你可以克隆后添加到自己的项目中进行使用

## 案例

- 某商城后台管理系统，使用该动态表单组件

- schema定义：

- ```ts
    import { DyForm, DyFormItem } from "@/components/dynamic-form/src"
    
    let qspassword = ""
    
    const commonComponentProps = {
      allowClear: true,
      showCount: true,
      maxlength: 30
    }
    
    const passwordAndConfirmPassword: DyFormItem[] = [
      {
        label: "密码",
        field: "password",
        component: "Password",
        formItemProps: {
          rules: [
            { required: true, message: "请输入密码" },
            {
              min: 5,
              max: 30,
              message: "密码长度为5-30位"
            },
            {
              validator: (_rule: any, value: any) => {
                qspassword = value
                return Promise.resolve()
              }
            }
          ]
        },
        componentProps: commonComponentProps
      },
      {
        label: "确认密码",
        field: "confirmPassword",
        component: "Password",
        formItemProps: {
          rules: [
            { required: true, message: "请输入确认密码" },
            {
              min: 5,
              max: 30,
              message: "密码长度为5-30位"
            },
            {
              validator: (_rule: any, value: any) => {
                if (value !== qspassword) {
                  return Promise.reject("两次输入密码不一致")
                }
                return Promise.resolve()
              }
            }
          ]
        },
        componentProps: commonComponentProps
      }
    ]
    
    const usernameAndphone: DyFormItem[] = [
      {
        label: "用户名",
        field: "username",
        component: "Text",
        formItemProps: {
          rules: [{ required: true, message: "请输入用户名", min: 5, max: 30 }],
          style: { width: "360px" }
        },
        componentProps: commonComponentProps
      },
      {
        label: "手机号",
        field: "phone",
        component: "Text",
        formItemProps: {
          rules: [{ required: true, message: "请输入手机号", min: 11, max: 11 }]
        },
        componentProps: commonComponentProps
      }
    ]
    
    const avatar: DyFormItem = {
      label: "",
      field: "avatar",
      component: "ImageSelector",
      formItemProps: {
        rules: [{ required: true, message: "请选择头像" }]
      },
      componentProps: {
        fileType: "USER",
        title: "选择头像"
      }
    }
    
    const role: DyFormItem = {
      label: "权限",
      field: "roles",
      component: "Checkbox",
      componentProps: {
        options: [
          { label: "客服", value: "SERVER" },
          { label: "管理员", value: "ADMIN" }
        ]
      },
      value: ["SERVER"],
      formItemProps: {
        rules: [
          {
            validator: (_rule: any, value: any) => {
              if (value.length === 0) {
                return Promise.reject("请选择权限")
              }
              if (value.length > 1) {
                return Promise.reject("只能选择一个权限")
              }
              return Promise.resolve()
            }
          }
        ]
      }
    }
    
    export const addUserSchema: DyForm = {
      title: "创建用户",
      formProps: {
        labelCol: { span: 5 }
      },
      items: [avatar, ...usernameAndphone, ...passwordAndConfirmPassword, role]
    }
    
    export const editUserSchema: DyForm = {
      title: "编辑用户",
      formProps: {
        labelCol: { span: 5 }
      },
      items: [avatar, ...usernameAndphone, role]
    }
    
    export const resetPasswordSchema: DyForm = {
      title: "重置密码",
      formProps: {
        labelCol: { span: 6 }
      },
      items: [...passwordAndConfirmPassword]
    }
    
    ```

- 表单使用：

- ```ts
    const handleClickLeftBtn = () => {
      const initData = {
        roles: ["SERVER"]
      }
      useFullScreenDyForm({
        schema: addUserSchema,
        init: initData,
        submit: (formData, close) => {
          upsertUserApi({
            id: "",
            username: formData.username,
            password: formData.password,
            phone: formData.phone,
            avatarId: formData.avatar.id,
            role: formData.roles[0]
          })
            .then((res) => {
              close()
              ElMessage.success(res.msg)
              fetchData()
            })
            .catch((err) => {
              console.log(err)
              ElMessage.error("操作失败")
            })
        },
        style: {
          // 边框
          border: "2px solid #90a1ff",
          backgroundColor: "rgb(244, 247, 255)"
        }
      })
    }
    ```

- 效果图：

- ![](https://cdn.jsdelivr.net/gh/pqcqaq/imageSource/upload/202405071751400.png)

- ![](https://cdn.jsdelivr.net/gh/pqcqaq/imageSource/upload/202405071752313.png)

- ![](https://cdn.jsdelivr.net/gh/pqcqaq/imageSource/upload/202405071752941.png)

    

## 使用

- 在使用之前，请确保你会使用ts，且编辑器已经配置好ts环境，以获得完整的ts类型支持。

- ### 组件：DynamicForm

    - Props：

        - schema：

            - 作用：表单结构
            - 类型：DyForm

        - showBtns

            - 作用：配置表单的提交清空等按钮

            - 类型：

                - ```ts
                    {
                        reset: 0 | 1;
                        clearAll: 0 | 1;
                        submit: 0 | 1;
                    }
                    ```

    - model：

        - modelValue：
            - 作用：表单输入的model，跟随表单内容更新
            - 类型：Record<string,any>
            - 注意：表单类型受限于schema内容，但没有强类型限制，请自行判断

- ### 类型信息以及功能函数：index.ts

    - 你可以参考这个文件以获得所有表单的配置参数信息。

## Hook

- ### 全局弹出表单命令

    - useFullScreenDyForm

        - 传入类型：

            - ```ts
                export type FormConfig = {
                	schema: DyForm;
                	showBtns?: {
                		clearAll: 0 | 1;
                		reset: 0 | 1;
                		submit: 0 | 1;
                	};
                	init?: Record<string, any>;
                	allowDirectClose?: boolean;
                	submit?: (values: Record<string, any>) => void;
                	style?: StyleValue;
                };
                ```

        - 作用：在页面上弹出一个输入表单，用户可以进行输入，然后提交数据。

## Demo

- 一个用户名密码电话号码输入的表单Demo：

- ```ts
    const handleClickLeftBtn = () => {
      const initData = {
        id: "",
        username: "",
        password: "",
        phone: "",
        roles: ["SERVER"]
      }
      let qspassword = ""
      useFullScreenDyForm({
        schema: {
          title: "创建用户",
          formProps: {
            labelCol: { span: 5 }
          },
          items: [
            {
              label: "用户名",
              field: "username",
              component: "Text",
              formItemProps: {
                rules: [{ required: true, message: "请输入用户名", min: 5, max: 30 }],
                style: { width: "360px" }
              },
              componentProps: {
                allowClear: true,
                showCount: true,
                maxlength: 30
              }
            },
            {
              label: "密码",
              field: "password",
              component: "Password",
              formItemProps: {
                rules: [
                  { required: true, message: "请输入密码" },
                  {
                    min: 5,
                    max: 30,
                    message: "密码长度为5-30位"
                  },
                  {
                    validator: (_rule: any, value: any) => {
                      qspassword = value
                      return Promise.resolve()
                    }
                  }
                ]
              },
              componentProps: {
                allowClear: true,
                showCount: true,
                maxlength: 30
              }
            },
            {
              label: "确认密码",
              field: "confirmPassword",
              component: "Password",
              formItemProps: {
                rules: [
                  { required: true, message: "请输入确认密码" },
                  {
                    min: 5,
                    max: 30,
                    message: "密码长度为5-30位"
                  },
                  {
                    validator: (_rule: any, value: any) => {
                      if (value !== qspassword) {
                        return Promise.reject("两次输入密码不一致")
                      }
                      return Promise.resolve()
                    }
                  }
                ]
              },
              componentProps: {
                allowClear: true,
                showCount: true,
                maxlength: 30
              }
            },
            {
              label: "手机号",
              field: "phone",
              component: "Text",
              formItemProps: {
                rules: [{ required: true, message: "请输入手机号", min: 11, max: 11 }]
              },
              componentProps: {
                allowClear: true,
                showCount: true,
                maxlength: 11
              }
            },
            {
              label: "权限",
              field: "roles",
              component: "Checkbox",
              componentProps: {
                options: [
                  { label: "客服", value: "SERVER" },
                  { label: "管理员", value: "ADMIN" }
                ]
              },
              value: ["SERVER"],
              formItemProps: {
                rules: [
                  {
                    validator: (_rule: any, value: any) => {
                      if (value.length === 0) {
                        return Promise.reject("请选择权限")
                      }
                      if (value.length > 1) {
                        return Promise.reject("只能选择一个权限")
                      }
                      return Promise.resolve()
                    }
                  }
                ]
              }
            }
          ]
        },
        init: initData,
        submit: (formData) => {
          onSubmit({
            id: "",
            username: formData.username,
            password: formData.password,
            phone: formData.phone,
            role: formData.roles[0]
          })
        }
      })
    }
    ```



- 一个基础姓名学号的Demo

- ```ts
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
    ```



- 所有组件的demo

- ```ts
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
    		// avatar
    		{
    			label: "头像",
    			field: "avatar",
    			component: "Upload",
    			componentProps: {
    				uploadProps: {
    					accept: "image/*",
    					action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    					maxCount: 1,
    					multiple: false,
    					listType: "picture-card",
    				},
    				uploadType: "Image",
    			},
    			value: [],
    		},
    		// images
    		{
    			label: "图片",
    			field: "images",
    			component: "Upload",
    			componentProps: {
    				uploadProps: {
    					accept: "image/*",
    					action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    					maxCount: 5,
    					multiple: true,
    					listType: "picture",
    				},
    				uploadType: "Dragger",
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
    
    ```

- 

