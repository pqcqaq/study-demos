import {
	Input,
	Textarea,
	InputNumber,
	Select,
	DatePicker,
	Rate,
	Slider,
	Upload,
	TreeSelect,
	TimePicker,
} from "ant-design-vue";

import type { Rule } from "ant-design-vue/es/form/interface";
import type { TimePickerProps, TreeSelectProps } from "ant-design-vue";
import { Component, Slot, VNode, ref } from "vue";
import AutoCompleteInput from "../cpns/components/AutoCompleteInput.vue";
import CustomSwitch from "../cpns/components/CustomSwitch.vue";
import TagShow from "../cpns/components/TagShow.vue";
import AsyncRadio from "../cpns/components/AsyncRadio.vue";
import AsyncCheckBox from "../cpns/components/AsyncCheckBox.vue";

// 表单域组件类型
export const componentsMap: Record<
	string,
	{
		component: Component;
		props?: Record<string, any>;
	}
> = {
	Text: {
		component: Input,
	},
	Textarea: {
		component: Textarea,
	},
	Number: {
		component: InputNumber,
	},
	Select: {
		component: Select,
	},
	Radio: {
		component: AsyncRadio,
	},
	Checkbox: {
		component: AsyncCheckBox,
	},
	DatePicker: {
		component: DatePicker,
	},
	Rate: {
		component: Rate,
	},
	Slider: {
		component: Slider,
	},
	Switch: {
		component: CustomSwitch,
	},
	Upload: {
		component: Upload,
	},
	TreeSelect: {
		component: TreeSelect,
	},
	TimePicker: {
		component: TimePicker,
	},
	AutoComplete: {
		component: AutoCompleteInput,
	},
	Tag: {
		component: TagShow,
	},
};

type Options = Array<{ label: string; value: string | number }>;

type OptionsGetter =
	| Options
	| (() => Options | Promise<Options>);

type AutoInputList = {
	label?: string;
	value: string;
};

export type DyFormItem = {
	label: string;
	field: string;
	component: keyof typeof componentsMap;
	componentProps?: {
		style?: Partial<CSSStyleDeclaration>;
		allowClear?: boolean;
		showCount?: boolean;
		maxlength?: number;
		autoSize?: boolean | { minRows: number; maxRows: number };
		options?: OptionsGetter;
		allowHalf?: boolean;
		autofocus?: boolean;
		character?: string;
		count?: number;
		disabled?: boolean;
		tooltips?: string[];
		dots?: boolean;
		included?: boolean;
		max?: number;
		min?: number;
		marks?: Record<number, string>;
		range?: boolean;
		reverse?: boolean;
		step?: number;
		vertical?: boolean;
		tipFormatter?: (value: number) => string;
		tooltipPlacement?: "top" | "left" | "right" | "bottom";
		tooltipOpen?: boolean;
		getTooltipPopupContainer?: () => HTMLElement;
		checked?: boolean;
		checkedChildren?: string;
		checkedValue?: string | number | boolean;
		loading?: boolean;
		size?: "default" | "small" | "large";
		unCheckedChildren?: string;
		unCheckedValue?: string | number | boolean;
		accept?: string;
		action?: string;
		beforeUpload?: (
			file: File,
			fileList: File[]
		) => boolean | Promise<boolean>;
		customRequest?: (options: { action: string; file: File }) => void;
		data?: Record<string, any>;
		directory?: boolean;
		fileList?: File[];
		headers?: Record<string, any>;
		maxCount?: number;
		method?: string;
		multiple?: boolean;
		treeData?: TreeSelectProps["treeData"];
		defaultValue?: string | number | string[] | number[] | null;
		popupClassName?: string;
		dropdownMatchSelectWidth?: boolean;
		dropdownStyle?: Partial<CSSStyleDeclaration>;
		fieldNames?: TreeSelectProps["fieldNames"];
		filterTreeNode?: TreeSelectProps["filterTreeNode"];
		getPopupContainer?: TreeSelectProps["getPopupContainer"];
		loadData?: TreeSelectProps["loadData"];
		maxTagCount?: number;
		maxTagPlaceholder?: (omittedValues: string[]) => string | VNode;
		notFoundContent?: string;
		placement?: TreeSelectProps["placement"];
		treeLine?: boolean | TreeSelectProps["treeLine"];
		bordered?: boolean;
		clearText?: string;
		disabledTime?: TimePickerProps["disabledTime"];
		format?: string;
		minuteStep?: number;
		placeholder?: string;
		valueFormat?: string;
		fetchList?:
			| (() => Promise<AutoInputList[]> | AutoInputList[])
			| AutoInputList[];
		debounce?: number;
		enableSplit?: boolean;
		splitWord?: string;
		title?: string;
		closable?: boolean;
		closeIcon?: VNode | Slot;
		color?: string;
		icon?: VNode | Slot;
	};
	formItemProps?: {
		label?: string;
		rules?: Rule[];
		style?: Partial<CSSStyleDeclaration>;
		required?: boolean | ((values: Record<string, any>) => boolean);
		hidden?: boolean | ((values: Record<string, any>) => boolean);
		autoLink?: boolean;
		colon?: boolean;
		extra?: string;
		hasFeedback?: boolean;
		help?: string;
		htmlFor?: string;
		labelAlign?: "left" | "right";
		labelCol?: { span: number; offset?: number };
		tooltip?: string;
		validateFirst?: boolean;
		validateStatus?: "success" | "warning" | "error" | "validating" | "";
		wrapperCol?: { span: number; offset?: number };
	};
	value?:
		| string
		| number
		| boolean
		| string[]
		| number[]
		| File
		| File[]
		| null;
	next?: (
		modelValue:
			| Record<string, any>
			| string
			| number
			| boolean
			| File
			| string[]
			| number[]
			| File[]
	) => DyForm | undefined | null;
};

export type DyForm = {
	title?: string;
	items: DyFormItem[];
	onSubmit?: (values: Record<string, any>) => void;
	onReset?: () => void;
	formProps?: {
		colon?: boolean;
		disabled?: boolean;
		hideRequiredMark?: boolean;
		labelAlign?: "left" | "right";
		labelCol?: { span: number; offset?: number };
		labelWrap?: boolean;
		layout?: "horizontal" | "vertical" | "inline";
		name?: string;
		noStyle?: boolean;
		rules?: Rule[];
		scrollToFirstError?: boolean;
		validateOnRuleChange?: boolean;
		validateTrigger?: string | string[];
		wrapperCol?: { span: number; offset?: number };
	};
};

// 计算ref的值的类型
export type FormModelMapping<T extends DyFormItem[]> = {
	[K in T[number]["field"]]: string;
};

export type FormModelType<T extends DyFormItem[]> = FormModelMapping<T> & {
	next?: Record<string, any> | null;
};

export function defineFormModel<T extends DyForm>(
	items: T["items"],
	init: Record<string, any> = {}
) {
	const model = {} as Record<string, any>;
	for (const item of items) {
		model[item.field] = "";
	}
	Object.assign(model, init);
	return ref(model);
}
