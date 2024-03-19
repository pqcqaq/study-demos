<template>
    <div>
        <SelectFile :onSubmit="handleUpload" :onCancel="onCancel"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectFile from './cpns/SelectFile.vue'
import { FileSelect } from './types';

const fileList = ref<FileSelect[]>([])
const handleUpload = () => {
  console.log("handleUpload")
  console.log(fileList.value)
}
const onCancel = () => {
  fileList.value = []
}
</script>

<style scoped>

</style>