<template>
	<div class="main">
		<el-table :data="data" border>
			<el-table-column
				label="时间"
				prop="time"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期一"
				prop="monday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期二"
				prop="tuesday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期三"
				prop="wednesday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期四"
				prop="thursday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期五"
				prop="friday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期六"
				prop="saturday"
				width="130"
			></el-table-column>
			<el-table-column
				label="星期日"
				prop="sunday"
				width="130"
			></el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type ClassRow = {
	time: string;
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
};

const data = ref<ClassRow[]>([
	// classData
	{
		time: "8:00-9:00",
		monday: " ",
		tuesday: " ",
		wednesday: " ",
		thursday: " ",
		friday: " ",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "9:00-10:00",
		monday: " ",
		tuesday: " ",
		wednesday: " ",
		thursday: " ",
		friday: " ",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "10:00-11:00",
		monday: "数据库",
		tuesday: "习近平",
		wednesday: "JavaEE",
		thursday: "工程师英语",
		friday: "数据结构与算法",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "11:00-12:00",
		monday: "数据库",
		tuesday: "习近平",
		wednesday: "JavaEE",
		thursday: " ",
		friday: "数据结构与算法",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "14:00-15:00",
		monday: "软工概论",
		tuesday: "毛泽东",
		wednesday: " ",
		thursday: " ",
		friday: "React",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "15:00-16:00",
		monday: "软工概论",
		tuesday: "毛泽东",
		wednesday: " ",
		thursday: " ",
		friday: "React",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "16:00-17:00",
		monday: "软工概论",
		tuesday: "行策",
		wednesday: " ",
		thursday: " ",
		friday: "React",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "17:00-18:00",
		monday: " ",
		tuesday: "行策",
		wednesday: " ",
		thursday: " ",
		friday: " ",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "18:00-19:00",
		monday: " ",
		tuesday: " ",
		wednesday: "美食鉴赏",
		thursday: " ",
		friday: " ",
		saturday: " ",
		sunday: " ",
	},
	{
		time: "19:00-20:00",
		monday: " ",
		tuesday: " ",
		wednesday: "美食鉴赏",
		thursday: " ",
		friday: " ",
		saturday: " ",
		sunday: " ",
	},
]);
</script>

<style lang="scss" scoped>
.main {
}
</style>
