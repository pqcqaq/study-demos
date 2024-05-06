<template>
    <div>
        <a-tag v-bind="$attrs">{{ props.value }}</a-tag>
    </div>
</template>

<script setup lang="ts">
type propsType = {
    value: string | undefined;
};

const props = defineProps<propsType>();
</script>

<style scoped>

</style>