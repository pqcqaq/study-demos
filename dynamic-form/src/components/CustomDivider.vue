<template>
	<a-divider v-bind="$attrs"> {{ props.dividerText }}</a-divider>
</template>

<script setup lang="ts">
import ADivider from "ant-design-vue/es/divider";
type PropsType = {
	dividerText: string;
};

const props = defineProps<PropsType>();

</script>

<style scoped></style>
