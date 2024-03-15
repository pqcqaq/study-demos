<template>
	<div class="body">
		<el-button @click="playMusic">开始播放</el-button>
		<div>
			<canvas
				ref="canvas1"
				class="cas"
				width="600px"
				height="600px"
			></canvas>
		</div>
		<div>
			<canvas
				ref="canvas2"
				class="cas"
				width="800px"
				height="800px"
			></canvas>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Canvas } from "canvas";
import { Ref, onMounted, ref } from "vue";

const canvas1 = ref();
const canvas2 = ref();

const initCanvas = (canvas: Ref<any>) => {
	const ctx = canvas.value.getContext("2d");
	const width = canvas.value.width;
	const height = canvas.value.height;
	// 设置canvas的大小和背景色
	ctx.fillStyle = "rgb(200, 200, 200)";
	ctx.fillRect(0, 0, width, height);
	// 刷新
	ctx.beginPath();
};

const drawLine = (canvas: Ref<any>, arr: Array<number>, maxValue: number) => {
	const ctx = canvas.value.getContext("2d");
	const width = canvas.value.width;
	const height = canvas.value.height;
	// 绘制频谱
	ctx.fillStyle = "rgb(200, 200, 200)";
	ctx.fillRect(0, 0, width, height);
	const barWidth = (width / arr.length) * 2.5;
	let x = 0;
	for (let i = 0; i < arr.length; i++) {
		const barHeight = arr[i];
		const r = barHeight + 25 * (i / maxValue);
		const g = 250 * (i / maxValue);
		const b = 50;
		ctx.fillStyle = `rgb(${r},${g},${b})`;
		ctx.fillRect(x, height - barHeight, barWidth, barHeight);
		x += barWidth + 1;
	}
};

const drawCircle = (canvas: Ref<any>, arr: Array<number>, maxValue: number) => {
	const ctx = canvas.value.getContext("2d");
	const width = canvas.value.width;
	const height = canvas.value.height;
	// 先清空
	ctx.clearRect(0, 0, width, height);
	const count = arr.length;
	const centerX = width / 2;
	const centerY = height / 2;
	const inRadius = 80;
	const outRadius = 135;
	const base = maxValue * 0.3;
	const step = (2 * Math.PI) / count;
	// 根据数量来计算单个元素和线条的粗细
	const size = (2 * Math.PI * inRadius) / count / 3;
	for (let i = 0; i < count; i++) {
		let value = ((arr[i] + base) / maxValue) * height;
		let x = centerX + inRadius * Math.cos(step * i);
		let y = centerY + inRadius * Math.sin(step * i);
		const color = `rgb( ${value * Math.random() * 0.3}, ${
			value * Math.random() * 0.3
		},  ${value * Math.random() * 0.3})`;
		ctx.fillStyle = color;
		// ctx.fill(x, y, size, size);
		// 替换成圆形
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);
		ctx.fill();
		// 绘制线条
		let endX =
			centerX +
			(((outRadius - inRadius) * value) / maxValue) * Math.cos(step * i);
		let endY =
			centerY +
			(((outRadius - inRadius) * value) / maxValue) * Math.sin(step * i);

		ctx.beginPath();
		// 设置线条粗细
		ctx.lineWidth = size * 2;
		ctx.moveTo(x, y); // 将起始点移动到当前点
		ctx.lineTo(endX, endY); // 绘制直线连接起始点和结束点
		// 判断一下如果是向里面划线了
		if (value < 0) {
			// ctx.strokeStyle = "rgb(0, 0, 0)";
			console.log("向里面划线了");
		}

		ctx.strokeStyle = color;
		ctx.stroke(); // 绘制线条
	}
};

const playMusic = () => {
	const audioctx = new AudioContext();
	const analyser = audioctx.createAnalyser();
	const audio = new Audio();
	audio.src =
		"https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Simon_Panrucker/Happy_Christmas_You_Guys/Simon_Panrucker_-_01_-_Snowflakes_Falling_Down.mp3";
	audio.crossOrigin = "anonymous";
	const source = audioctx.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(audioctx.destination);
	analyser.fftSize = 2048;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);
	function renderFrame() {
		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(dataArray);
		drawLine(canvas1, [...dataArray], 100);
	}
	audio.play();
	renderFrame();

	function renderCircle() {
		requestAnimationFrame(renderCircle);
		analyser.getByteFrequencyData(dataArray);
		drawCircle(canvas2, [...dataArray], 100);
	}
	renderCircle();
};

onMounted(() => {
	initCanvas(canvas1);
	initCanvas(canvas2);
	const arr = new Array(60).fill(100);
	arr.map((_item, index) => {
		arr[index] = Math.random() * 100;
	});
	console.log(arr);

	drawLine(canvas1, arr, 100);
	drawCircle(canvas2, arr, 100);
});
</script>

<style lang="scss" scoped>
.body {
	margin-top: 100px;
}
.cas {
	// width: 500px;
	// height: 500px;
	background-color: #c8b3d0;
}
</style>
