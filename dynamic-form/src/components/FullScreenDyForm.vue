<template>
	<div class="fullscreen">
		<div class="full-form">
			<DynamicForm
				:schema="props.schema"
				v-model="formModel"
				:show-btns="props.showBtns"
				class="form"
			/>
			<div class="btns">
				<a-button danger @click="() => props.onCancel()">取消</a-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DyForm } from "..";
import DynamicForm from "../DynamicForm.vue";
import AButton from "ant-design-vue/es/button";
type propType = {
	schema: DyForm;
	showBtns: {
		clearAll: 0 | 1;
		reset: 0 | 1;
		submit: 0 | 1;
	};
	onCancel: () => void;
};

const props = defineProps<propType>();
const formModel = ref<Record<string, any>>({});
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
