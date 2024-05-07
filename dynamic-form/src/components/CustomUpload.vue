<template>
	<a-upload
		v-if="props.uploadType !== 'Dragger'"
		v-bind="{
			...$attrs,
			...props.uploadProps,
			beforeUpload,
		}"
		v-on="{ ...props.uploadEvent, change: handleChange }"
		v-model:fileList="model"
	>
		<div class="inner">
			<div class="btn" v-if="props.uploadType == 'Button'">
				<a-button>
					<upload-outlined></upload-outlined>
					{{ uploadMsg }}
				</a-button>
			</div>
			<div class="image" v-if="props.uploadType == 'Image'">
				<img v-if="imageUrl" :src="imageUrl" alt="avatar" />
				<div v-else>
					<loading-outlined v-if="loading"></loading-outlined>
					<plus-outlined v-else></plus-outlined>
					<div class="ant-upload-text">{{ uploadMsg }}</div>
				</div>
			</div>
		</div>
	</a-upload>
	<a-upload-dragger
		v-else
		v-model:fileList="model"
		v-bind="{
			...$attrs,
			...props.uploadProps,
		}"
		v-on="{ ...props.uploadEvent }"
	>
		<p class="ant-upload-drag-icon">
			<inbox-outlined></inbox-outlined>
		</p>
		<p class="ant-upload-text">{{ uploadMsg }}</p>
		<p class="ant-upload-hint">点击这里/将文件拖拽到这里即可自动上传</p>
	</a-upload-dragger>
</template>

<script setup lang="ts">
import { UploadChangeParam, UploadProps, message } from "ant-design-vue";
import { computed, ref } from "vue";
import { UploadEvents, UploadType } from "..";
import { FileType } from "ant-design-vue/es/upload/interface";

type PropType = {
	value: File[] | undefined;
	msg?: string;
	uploadProps?: UploadProps;
	uploadEvent?: UploadEvents;
	uploadType: UploadType;
};

const props = withDefaults(defineProps<PropType>(), {
	uploadType: "Button",
});

const uploadMsg = computed(() => {
	return props.msg || "上传";
});

const emit = defineEmits(["update:value"]);

const model = computed({
	get() {
		return props.value;
	},
	set(value) {
		emit("update:value", value);
	},
});
function getBase64(img: Blob, callback: (base64Url: string) => void) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
}

const loading = ref<boolean>(false);
const imageUrl = ref<string>("");

const imageHandleChange = (info: UploadChangeParam) => {
	if (info.file.status === "uploading") {
		loading.value = true;
		return;
	}
	if (info.file.status === "done") {
		getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
			imageUrl.value = base64Url;
			loading.value = false;
		});
	}
	if (info.file.status === "error") {
		loading.value = false;
		message.error("upload error");
	}
};

const handleChangeMap = {
	Image: imageHandleChange,
	Button: () => {},
	Dragger: () => {},
};

const handleChange = (info: UploadChangeParam) => {
	handleChangeMap[props.uploadType]?.(info);
	props.uploadEvent?.change?.(info);
};

const imageBeforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("请选择一个图片文件");
	}
	const isLt2M = file.size / 1024 / 1024 < 5;
	if (!isLt2M) {
		message.error("图片需要小于5MB");
	}
	return isJpgOrPng && isLt2M;
};

const beforeUploadMap = {
	Image: imageBeforeUpload,
	Button: () => true,
	Dragger: () => true,
};

const beforeUpload: UploadProps["beforeUpload"] = (
	file: FileType,
	FileList: FileType[]
) => {
	return (
		beforeUploadMap[props.uploadType]?.(file) &&
		props.uploadProps?.beforeUpload?.(file, FileList)
	);
};
</script>
<style scoped>
.avatar-uploader > .ant-upload {
	width: 128px;
	height: 128px;
}
.ant-upload-select-picture-card i {
	font-size: 32px;
	color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
	margin-top: 8px;
	color: #666;
}
</style>
