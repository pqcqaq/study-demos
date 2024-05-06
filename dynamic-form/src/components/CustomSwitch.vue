<template>
	<a-switch v-model:checked="checked" v-bind="$attrs" />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import ASwitch from "ant-design-vue/es/switch";
type propType = {
	value: boolean | undefined;
};

const props = defineProps<propType>();

const emit = defineEmits(["update:value"]);

const checked = computed({
    get() {
		return props.value;
	},
    set(value) {
		emit("update:value", value);
	},
});

</script>
