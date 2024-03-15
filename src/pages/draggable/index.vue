<template>
	<div class="main">
		<el-table :data="data">
			<el-table-column
				label="日期"
				prop="date"
				width="160"
			></el-table-column>
			<el-table-column
				label="姓名"
				prop="name"
				width="130"
			></el-table-column>
			<el-table-column
				label="地址"
				prop="address"
				width="280"
			></el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref([
	{
		date: "2016-05-02",
		name: "王小虎",
		address: "上海市普陀区金沙江路 1518 弄",
	},
	{
		date: "2016-05-04",
		name: "王小虎",
		address: "上海市普陀区金沙江路 1517 弄",
	},
	{
		date: "2016-05-01",
		name: "王小虎",
		address: "上海市普陀区金沙江路 1519 弄",
	},
	{
		date: "2016-05-03",
		name: "王小虎",
		address: "上海市普陀区金沙江路 1516 弄",
	},
]);
</script>

<style lang="scss" scoped>
.main {
}
</style>
