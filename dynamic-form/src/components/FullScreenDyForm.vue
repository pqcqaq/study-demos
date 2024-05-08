<template>
	<div class="fullscreen" v-fade-in-out>
		<div
			class="full-form"
			v-move
			:style="{
				...props.style,
			}"
		>
			<DynamicForm
				:schema="schema"
				v-model="formModel"
				:show-btns="props.showBtns"
				class="form"
				:on-before-submit="handleOnBeforeSubmit"
				:on-submit="props.onSubmit"
				:on-after-submit="handleOnAfterSubmit"
			/>
			<div class="btns">
				<a-button
					shape="circle"
					type="primary"
					danger
					@click="handleClose"
					:disabled="isLoading"
				>
					<CloseOutlined
				/></a-button>
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
import { CloseOutlined } from "@ant-design/icons-vue";

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
	title?: string;
};

const props = defineProps<propType>();
const formModel = ref<Record<string, any>>({});
const isLoading = ref(false);
const schema = ref(props.schema);

onMounted(() => {
	if (Object.keys(props.init).length > 0) {
		formModel.value = { ...props.init };
	}
	if (props.title) {
		schema.value.title = props.title;
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
		if (!props.draggable) {
			return;
		}
		let moveEl = el as HTMLElement;
		const mouseDown = (e: MouseEvent) => {
			const elNowPos = {
				x: moveEl.getBoundingClientRect().x,
				y: moveEl.getBoundingClientRect().y,
			};
			const mouseBefore: { x: number; y: number } = {
				x: e.clientX,
				y: e.clientY,
			};
			const elShape = {
				width: moveEl.getBoundingClientRect().width,
				height: moveEl.getBoundingClientRect().height,
			};
			const move = (e: MouseEvent) => {
				// 设置鼠标样式
				moveEl.style.cursor = "move";
				const mouseMove: { x: number; y: number } = {
					x: e.clientX - mouseBefore.x,
					y: e.clientY - mouseBefore.y,
				};
				const offset = {
					x: elNowPos.x + mouseMove.x,
					y: elNowPos.y + mouseMove.y,
				};
				// 判断是否超出边界
				if (offset.x < 15 || offset.y < 15) {
					return;
				}
				// 判断右下边界
				if (
					offset.x + elShape.width > window.innerWidth - 30 ||
					offset.y + elShape.height > window.innerHeight - 15
				) {
					return;
				}
				// 更新拖拽元素的位置
				moveEl.style.left = offset.x + "px";
				moveEl.style.top = offset.y + "px";
			};
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", () => {
				// 取消鼠标样式
				moveEl.style.cursor = "default";
				document.removeEventListener("mousemove", move);
			});
		};

		moveEl.style.position = "absolute"; // 确保拖拽元素的定位方式为绝对定位
		moveEl.addEventListener("mousedown", mouseDown);
	},
	// 取消挂载时注销事件
	unmounted(el: HTMLElement) {
		if (!props.draggable) {
			return;
		}
		let moveEl = el as HTMLElement;
		moveEl.removeEventListener("mousedown", () => {});
	},
};

const vFadeInOut: Directive = {
	mounted(el: HTMLElement) {
		el.style.opacity = "0"; // 初始状态设置为透明
		setTimeout(() => {
			el.style.transition = "opacity 0.15s";
			el.style.opacity = "1"; // 淡入
		}, 0);
	},
	beforeUnmount(el: HTMLElement) {
		el.style.opacity = "0"; // 淡出
	},
};
</script>

<style lang="scss" scoped>
.fullscreen {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	display: flex;
	.full-form {
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #fff;
		padding: 20px;
		border-radius: 15px;
		border: 1px solid #ccc;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: inline-block;
		max-width: 80%;
		max-height: 90%;
		position: relative;
		.form {
			width: 100%;
		}
		.btns {
			// 从右到左排列，放在表单的右上角
			position: absolute;
			top: 10px;
			right: 12px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: row-reverse;
			gap: 10px;
		}
	}
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 10px;
	background-color: #f5f5f5;
	border-radius: 5px;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #9a9a9a;
}
</style>
