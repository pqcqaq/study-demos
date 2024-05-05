<template>
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
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
