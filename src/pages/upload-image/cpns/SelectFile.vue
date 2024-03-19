<template>
	<div class="container">
	  <div class="body" draggable>
		<div class="upload" @drop="dropFile($event)" @dragenter="dropEnter($event)" @dragleave="dropExit($event)">
		  <input type="file" multiple class="selectFile" @change="handleFileSelect" />
		  <p>{{ msg }}</p>
		</div>
		<div class="list">
		  <div class="item" :key="index" v-for="(file, index) in filesList">
			<div class="file">
			  <div class="left">
				<div class="preview">
				  <img class="previewImg" :src="getImgPreview(file.file)" alt="preview" />
				</div>
			  </div>
			  <div class="middle">
				{{ file.file.name.length > 20 ? file.file.name.slice(0, 30) + "..." : file.file.name }}<br />
				{{ file.file.lastModified }}<br />
				{{ file.file.type }}
			  </div>
			  <div class="right">
				<el-button type="danger" size="small" @click="handleDelete(index)">删除</el-button>
				<div class="info">
				  <div class="uploading">
					{{ file.isUploading ? "上传中" : "" }}
				  </div>
				  <div class="failed">
					{{ file.isUploading && !file.uploadSuccess ? "上传失败" : "" }}
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
		<div class="btns">
		  <el-button type="primary" size="large" @click="handleUpload">上传</el-button>
		  <el-button type="danger" size="large" @click="handleConcle">取消</el-button>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { PropType, ref, toRef } from "vue"
  import type { FileSelect } from "../types"
  
  const props = defineProps({
	msgOut: {
	  type: String,
	  default: "点击这里/拖拽文件到此处"
	},
	msgIn: {
	  type: String,
	  default: "松开鼠标-上传图片"
	},
	onSubmit: {
	  type: Function,
	  default: () => {}
	},
	onCancel: {
	  type: Function,
	  default: () => {}
	},
	fileList: {
	  type: Array as PropType<FileSelect[]>,
	  default: () => []
	}
  })
  
  const msgOut = ref(props.msgOut)
  const msgIn = ref(props.msgIn)
  
  const msg = ref(msgOut.value)
  
  const filesList = toRef(props, "fileList")
  
  let lastEnterEle: EventTarget
  
  const dropFile = (e: DragEvent) => {
	e.preventDefault()
	const fileArr = Array.from(e.dataTransfer!.files)
	fileArr.forEach((file) => {
	  filesList.value?.push({
		file,
		isUploading: false,
		uploadSuccess: false
	  })
	})
	msg.value = msgOut.value
  }
  
  const dropEnter = (e: DragEvent) => {
	e.preventDefault()
	if (lastEnterEle !== e.target) {
	  lastEnterEle = e.target!
	  msg.value = msgIn.value
	}
  }
  
  const dropExit = (e: DragEvent) => {
	e.preventDefault()
	if (lastEnterEle === e.target) {
	  lastEnterEle = null!
	  msg.value = msgOut.value
	}
  }
  
  const handleFileSelect = (e: Event) => {
	const fileArr = Array.from((e.target as HTMLInputElement).files!)
	fileArr.forEach((file) => {
	  filesList.value?.push({
		file,
		isUploading: false,
		uploadSuccess: false
	  })
	})
	msg.value = msgOut.value
  }
  
  const handleUpload = () => {
	props.onSubmit()
  }
  
  const handleConcle = () => {
	props.onCancel()
  }
  
  const getImgPreview = (file: File) => {
	return URL.createObjectURL(file)
  }
  
  const handleDelete = (index: number) => {
	filesList.value.splice(index, 1)
  }
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
		  background-color: #d1d4d5;
		  margin-top: 5px;
		  border-radius: 10px;
		  .file {
			display: flex;
			justify-content: space-between;
			box-shadow: 0 0 10px #dcdfe6;
			border-radius: 10px;
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
				  object-fit: cover;
				}
			  }
			}
			.middle {
			  width: 300px;
			  height: 100px;
			  // 字体样式
			  font-size: 18px;
			  display: flex;
			  justify-content: space-between;
			  align-items: center;
			  flex-direction: column;
			}
			.right {
			  width: 90px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  flex-direction: column;
  
			  .info {
				display: flex;
				justify-content: center;
				align-items: center;
				.uploading {
				  color: #0f0f0f;
				}
				.failed {
				  color: #ff0000;
				}
			  }
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
  