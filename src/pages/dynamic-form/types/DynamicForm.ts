import {
	Input,
	Textarea,
	InputNumber,
	Select,
	RadioGroup,
	CheckboxGroup,
	DatePicker,
} from "ant-design-vue";

// 表单域组件类型
export const componentsMap = {
	Text: Input,
	Textarea,
	Number: InputNumber,
	Select,
	Radio: RadioGroup,
	Checkbox: CheckboxGroup,
	DatePicker,
};

export type FItemAction = "add" | "remove" | "update" | "blur";

export type DyForm = {
	label: string;
	field: string;
	component: keyof typeof componentsMap;
	componentProps?:  {
		style?: Partial<CSSStyleDeclaration>;
		allowClear?: boolean;
		showCount?: boolean;
		maxlength?: number;
		autoSize?: boolean | { minRows: number; maxRows: number };
		options?: { label: string; value: string | number }[];
	};
	formItemProps?: {
		label?: string;
		rules?: {
			required?: boolean;
			message: string;
			validator?: (rule: any, value: any) => Promise<void>;
			trigger?: FItemAction | FItemAction[];
		}[];
		style?: Partial<CSSStyleDeclaration>;
	};
	value?: string | number;
	next?: (modelValue:any) => DyForm[];
};
