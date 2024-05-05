<template>
    <div class="input">
        <a-input v-model:value="modelValue" v-bind="$attrs" v-on="emit" />
    </div>
	<div class="attr">attr:{{ $attrs }}</div>
	<div class="props">props:{{ $props }}</div>
	<div class="emits">emit:{{ $emit }}</div>
	<div class="refs">refs:{{ $refs }}</div>
	<div class="data">data:{{ $data }}</div>
	<div class="el">el:{{ $el }}</div>
	<div class="forceUpdate">forceUpdate:{{ $forceUpdate }}</div>
	<div class="options">options:{{ $options }}</div>
	<div class="root">root:{{ $root }}</div>
	<div class="parent">parent: {{ $parent }}</div>
	<div class="btns">
		<a-button @click="() => $emit('submit')">Submit</a-button>
		<a-button @click="() => $emit('onUpdate')">Update</a-button>
		<a-button @click="() => $emit('onClick')">onClick</a-button>
		<a-button @click="() => $emit('onTest')">onTest</a-button>
		<a-button @click="() => $emit('update:value')">update:value</a-button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type propType = {
	modelValue: string;
};

const prop = defineProps<propType>();
const emit = defineEmits([
	"submit",
	"onUpdate",
	"onClick",
	"onTest",
	"update:value",
]);

const modelValue = computed({
	get: () => prop.modelValue,
	set: (value) => emit("update:value", value),
});
</script>

<style scoped></style>
