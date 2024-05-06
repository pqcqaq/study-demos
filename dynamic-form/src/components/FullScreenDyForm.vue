<template>
	<div class="fullscreen">
		<div class="full-form">
			<DynamicForm
				:schema="props.schema"
				v-model="formModel"
				:show-btns="props.showBtns"
				class="form"
				:on-before-submit="() => (isLoading = true)"
				:on-submit="() => (isLoading = false)"
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
import { onMounted, ref } from "vue";
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
