export type InputType = "text" | "number" | "password" | "email" | "tel" | "input";
export type InputSize = "small" | "default" | "large";

export type Field = {
	type: InputType;
	size: InputSize;
	name: string;
	label: string;
	required: boolean;
	placeholder: string;
	errorMessage: string;
	next: () => DynamicFormProps;
};

export type DynamicFormProps = {
    fields: Field[];
    submit: () => void;
};
