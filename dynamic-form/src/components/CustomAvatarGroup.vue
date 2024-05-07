<template>
	<div>
		<AvatarGroup v-bind="props.groupProps">
			<Avatar
				v-for="option in props.avatarGroupValue"
				:key="option.key"
				v-bind="props.avatarProps"
				:src="option.src"
			>
				{{ option.label }}
			</Avatar>
		</AvatarGroup>
	</div>
</template>

<script setup lang="ts">
import { AvatarGroup } from "ant-design-vue";
import { Avatar } from "ant-design-vue";
import { AvatarGroupItem } from "../index";
type PropType = {
	avatarGroupValue: AvatarGroupItem[] | undefined;
	groupProps: Record<string, any> | undefined;
	avatarProps: Record<string, any> | undefined;
};

const props = defineProps<PropType>();
</script>

<style scoped></style>
