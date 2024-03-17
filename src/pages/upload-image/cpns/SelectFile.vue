<template>
	<div class="container">
		<div class="body" draggable>
			<div
				class="upload"
				@drop="dropFile($event)"
				@dragenter="dropEnter($event)"
				@dragleave="dropExit($event)"
			>
				<input
					type="file"
					multiple
					class="selectFile"
					@change="handleFileSelect"
				/>
				<p>{{ msg }}</p>
			</div>
			<div class="list">
				<div class="item" v-for="(file, index) in filesList">
					<div class="file" :key="index">
						<div class="left">
							<div class="preview">
								<img
									class="previewImg"
									:src="getImgPreview(file)"
									alt="preview"
								/>
							</div>
						</div>
						<div class="middle">
							{{ file.name }}<br />
							{{ file.lastModified }}<br />
							{{ file.type }}
						</div>
						<div class="right">
							<el-button
								type="danger"
								size="mini"
								@click="handleDelete(index)"
								>删除</el-button
							>
						</div>
					</div>
				</div>
			</div>
			<div class="btns">
				<Button type="primary" size="large" @click="handleUpload"
					>上传</Button
				>
				<Button danger type="primary" size="large" @click="handleConcle"
					>取消</Button
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "ant-design-vue/es/button";

const props = defineProps({
	msgOut: {
		type: String,
		default: "点击这里/拖拽文件到此处",
	},
	msgIn: {
		type: String,
		default: "松开鼠标-上传图片",
	},
	onSubmit: {
		type: Function,
		default: () => {},
	},
	onCancel: {
		type: Function,
		default: () => {},
	},
});

const msgOut = ref(props.msgOut);
const msgIn = ref(props.msgIn);

const msg = ref(msgOut.value);

const filesList = ref<File[]>([]);

let lastEnterEle: EventTarget;

const dropFile = (e: DragEvent) => {
	e.preventDefault();
	filesList.value?.push(...Array.from(e.dataTransfer!.files));
	msg.value = msgOut.value;
};

const dropEnter = (e: DragEvent) => {
	e.preventDefault();
	if (lastEnterEle !== e.target) {
		lastEnterEle = e.target!;
		msg.value = msgIn.value;
	}
};

const dropExit = (e: DragEvent) => {
	e.preventDefault();
	if (lastEnterEle === e.target) {
		lastEnterEle = null!;
		msg.value = msgOut.value;
	}
};

const handleFileSelect = (e: Event) => {
	filesList.value = Array.from((e.target as HTMLInputElement).files!);
	msg.value = msgOut.value;
};

const handleUpload = () => {
	props.onSubmit(filesList.value);
};

const handleConcle = () => {
	props.onCancel();
};

const getImgPreview = (file: File) => {
	return URL.createObjectURL(file);
};

const handleDelete = (index: number) => {
	filesList.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.165);
	.body {
		width: 500px;
		max-height: 600px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: rgb(244, 246, 255);
		border: 2px solid #9898f5;
		box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.165);
		border-radius: 30px;
		.upload {
			position: relative;
			border-radius: 30px;
			width: 90%;
			height: 100px;
			border: dashed;
			border-color: #3a3a3da1;
			margin-top: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			input {
				position: absolute;
				top: 0;
				margin-left: auto;
				margin-right: auto;
				z-index: 99999;
				opacity: 0;
				width: 400px;
				height: 70px;
				line-height: 40px;
				cursor: pointer;
			}
			p {
				font-size: 20px;
				color: #0909d4a1;
			}
		}
		.list {
			height: 100%;
			padding: 5px;
			margin-top: 5px;
			margin-bottom: 5px;
			overflow-y: auto;
			.item {
				width: 450px;
				height: 100px;
				background-color: #cecccc;
				margin-top: 5px;
				border-radius: 10px;
				.file {
					display: flex;
					justify-content: space-between;
					.left {
						display: flex;
						justify-content: center;
						align-items: center;
						.preview {
							width: 100px;
							height: 100px;
							img {
								max-width: 100px;
								max-height: 100px;
								// 图片短边适应
								object-fit: cover;
							}
						}
					}
					.middle {
						width: 300px;
						height: 100px;
					}
				}
			}
		}
		.btns {
			display: flex;
			justify-content: space-around;
			width: 100%;
			margin-top: 10px;
			margin-bottom: 20px;
			.ant-btn {
				width: 100px;
			}
		}
	}
}
</style>
