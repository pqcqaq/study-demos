<template>
	<div class="fullscreen">
		<div
			class="full-form"
			v-move
			:style="{
				...props.style,
			}"
		>
			<DynamicForm
				:schema="props.schema"
				v-model="formModel"
				:show-btns="props.showBtns"
				class="form"
				:on-before-submit="handleOnBeforeSubmit"
				:on-submit="props.onSubmit"
				:on-after-submit="handleOnAfterSubmit"
			/>
			<div class="btns">
				<a-button danger @click="handleClose" :disabled="isLoading"
					>取消</a-button
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CSSProperties, Directive, onMounted, ref } from "vue";
import { DyForm } from "..";
import DynamicForm from "../DynamicForm.vue";
import AButton from "ant-design-vue/es/button";
import { Modal } from "ant-design-vue";

type propType = {
	schema: DyForm;
	showBtns: {
		clearAll: 0 | 1;
		reset: 0 | 1;
		submit: 0 | 1;
	};
	init: Record<string, any>;
	onCancel: () => void;
	allowDirectClose: boolean;
	onSubmit?: (formData: Record<string, any>) => void;
	style: CSSProperties;
	draggable?: boolean;
};

const props = defineProps<propType>();
const formModel = ref<Record<string, any>>({});
const isLoading = ref(false);

onMounted(() => {
	if (Object.keys(props.init).length > 0) {
		formModel.value = { ...props.init };
	}
});

const handleClose = () => {
	if (props.allowDirectClose) {
		props.onCancel();
	} else {
		// 确认框
		Modal.confirm({
			title: "确认关闭",
			content: "关闭后将不会保存当前数据，是否继续？",
			onOk: () => {
				props.onCancel();
			},
			okText: "确认关闭",
			okType: "primary",
			okButtonProps: { danger: true },
			cancelText: "返回",
			zIndex: 10000,
			centered: true,
		});
	}
};

const handleOnBeforeSubmit = () => {
	isLoading.value = true;
};

const handleOnAfterSubmit = () => {
	isLoading.value = false;
};

const vMove: Directive = {
	mounted(el: HTMLElement) {
		// let moveEl = el.firstElementChild as HTMLElement;
		let moveEl = el as HTMLElement;
		const mouseDown = (e: MouseEvent) => {
			//鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
			console.log(e.clientX, e.clientY, "-----起始", el.offsetLeft);
			let X = e.clientX - el.offsetLeft;
			let Y = e.clientY - el.offsetTop;
			console.log(X, Y, "-----起始");
			
			const move = (e: MouseEvent) => {
				// 获取拖拽元素的位置
				let left = e.clientX - X;
				let top = e.clientY - Y;
				// if (left <= 0) {
				// 	left = 0;
				// } else if (
				// 	left >=
				// 	document.documentElement.clientWidth - el.offsetWidth
				// ) {
				// 	left =
				// 		document.documentElement.clientWidth - el.offsetWidth;
				// }

				// if (top <= 0) {
				// 	top = 0;
				// } else if (
				// 	top >
				// 	document.documentElement.clientHeight - el.offsetHeight
				// ) {
				// 	top =
				// 		document.documentElement.clientHeight - el.offsetHeight;
				// }

				el.style.left = left + "px";
				el.style.top = top + "px";
			};
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", () => {
				document.removeEventListener("mousemove", move);
			});
		};
		moveEl.addEventListener("mousedown", mouseDown);
	},
};
</script>

<style lang="scss" scoped>
.fullscreen {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.full-form {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
		border: 1px solid #ccc;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		margin-top: 5%;
		margin-bottom: 5%;
		display: inline-block;
		max-width: 80%;
		.form {
			width: 100%;
		}
		.btns {
			display: flex;
			justify-content: center;
			margin-top: 20px;
		}
	}
}
</style>
