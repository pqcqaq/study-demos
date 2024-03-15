<template>
	<h1>课程表</h1>
	<div
		class="container"
		@dragstart="containerOndragstart"
		@dragend="containerOndragover"
		@dragenter="containerOndragenter"
		@drop="containerOndrop"
	>
		<div class="left" data-drop="move">
			<div data-effect="copy" draggable="true" class="color-1 item">
				语文
			</div>
			<div data-effect="copy" draggable="true" class="color-2 item">
				数学
			</div>
			<div data-effect="copy" draggable="true" class="color-3 item">
				英语
			</div>
			<div data-effect="copy" draggable="true" class="color-4 item">
				音乐
			</div>
			<div data-effect="copy" draggable="true" class="color-5 item">
				政治
			</div>
			<div data-effect="copy" draggable="true" class="color-6 item">
				历史
			</div>
		</div>
		<div class="right">
			<table border="1">
				<colgroup>
					<col span="6" style="background-color: #fff" />
				</colgroup>
				<tr>
					<th>星期一</th>
					<th>星期二</th>
					<th>星期三</th>
					<th>星期四</th>
					<th>星期五</th>
					<th>星期六</th>
				</tr>
				<tr>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
				</tr>
				<tr>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
				</tr>
				<tr>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
					<td data-drop="copy"></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

//直接监控父元素，使用事件委托

type Source = "copy" | "move";

let source: Source;

//拖拽开始事件，只触发一次
const containerOndragstart = (e: DragEvent) => {
	console.log("start", e.target);

	//移动取消出现+号的效果
	e.dataTransfer.effectAllowed = e.target.dataset.effect;
	source = e.target;
	console.log("start", e);
};

//拖拽结束事件,表示拖拽这个元素到哪个元素之上，不断触发
const containerOndragover = (e: DragEvent) => {
	e.preventDefault();
	// console.log('over', e.target)
};

//拖拽移入事件，只触发一次
const containerOndragenter = (e: DragEvent) => {
	//清除之前拖拽的样式
	removeDropStyle();
	const dropNode = getDropNode(e.target);
	if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
		//该节点能够接受目前拖拽节点
		e.target.classList.add("drop-over");
	}

	// console.log('enter', e.target)
};

//拖拽放手在哪个元素,table,tr,td,这些元素是不允许元素拖拽到他的上面的，因此是不会触发这个事件的，触发阻止浏览器默认事件，在ondragover中阻止
const containerOndrop = (e: DragEvent) => {
	//清除拖拽的样式
	removeDropStyle();
	console.log("drop", e.target);
	const dropNode = getDropNode(e.target);
	//该节点能够接受目前拖拽节点
	if (dropNode && dropNode.dataset.drop === e.dataTransfer.effectAllowed) {
		//两种情况，是拖拽到哪个区域,如果是copy区域
		if (dropNode.dataset.drop === "copy") {
			//清除之前的元素
			dropNode.innerHTML = "";
			//把该元素复制一份
			const cloned = source.cloneNode(true);
			cloned.dataset.effect = "move";
			dropNode.appendChild(cloned);
			//如果是move区域
		} else {
			console.log("1111111");
			source.remove();
		}
	}
};

//获取该元素是否有父元素
function getDropNode(node: any) {
	console.log("node", node);
	let nodeDataset: DOMStringMap = node.dataset;

	while (node) {
		if (nodeDataset.drop) {
			return node;
		}
		node = node.parentNode;
	}
}

//清除移动的样式
function removeDropStyle() {
	document.querySelectorAll(".drop-over").forEach((node) => {
		node.classList.remove("drop-over");
	});
}
</script>

<style lang="scss" scoped>
h1 {
	width: 100%;
	text-align: center;
}

.container {
	width: 100%;
	height: 800px;
	display: flex;
	flex-direction: row;
}

.left {
	width: 5%;
	background: #f3f4f5;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.item {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70px;
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 20px;
	color: #fff;
}

.right {
	margin-left: 40px;
	width: 95%;
	background: #f3f4f5;
}

.color-1 {
	background: red;
}

.color-2 {
	background: rgb(18, 49, 189);
}

.color-3 {
	background: rgb(22, 153, 33);
}

.color-4 {
	background: rgb(150, 136, 12);
}

.color-5 {
	background: rgb(110, 9, 114);
}

.color-6 {
	background: rgb(192, 118, 22);
}

td {
	width: 90px;
	height: 70px;
}

.drop-over {
	background: rgba(212, 13, 56, 0.067);
}
</style>
