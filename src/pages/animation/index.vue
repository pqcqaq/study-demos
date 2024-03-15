<template>
	<div>
		<div class="a1">
			<div class="ball animateMove1"></div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.a1 {
	width: 500px;
	height: 300px;
	.ball {
		width: 50px;
		height: 50px;
		background-color: #f00;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.animateMove1 {
		transform: translate(var(--x), var(--y));
		animation: x 2s, y 1s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.5, -800, 0.5, 800);
	}
}

@property --x {
	syntax: "<length>";
	initial-value: 0px;
	inherits: false;
}

@property --y {
	syntax: "<length>";
	initial-value: 0px;
	inherits: false;
}

@keyframes x {
	to {
		--x: 1px;
	}
}

@keyframes y {
	to {
		--y: 0.1px;
	}
}
</style>
