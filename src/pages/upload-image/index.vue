<template>
    <div>
        <SelectFile :onSubmit="onSubmit"/>
    </div>
</template>

<script setup lang="ts">
import SelectFile from './cpns/SelectFile.vue'
const onSubmit = (files) => {
    console.log(files)
    files.value = []
}
</script>

<style scoped>

</style>