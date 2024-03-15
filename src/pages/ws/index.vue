<template>
	<div>聊天</div>
	<div class="msgs">
		<el-card v-for="(msg, index) in msgs" :key="index" class="box-card">
			<div slot="header" class="clearfix">
				<span>{{ msg.name }}</span>
				<el-button style="float: right; padding: 3px 0" type="text"
					>删除</el-button
				>
			</div>
			<div>{{ msg.content }}</div>
		</el-card>
	</div>
	<!-- 输入框 -->
	<div class="send">
		<el-input
			v-model="message"
			:rows="3"
			type="textarea"
			placeholder="请输入"
			style="width: 600px"
		/>
		<el-button type="primary" @click="sendMessage">发送</el-button>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, onUnmounted } from "vue";

let message = ref("");
const sendMessage = () => {
	// 调用WebSocket对象的send方法可向后端发送数据
	websocket.send(message.value);
};

type Msg = {
	name: string;
	content: string;
};

type Result<T> = {
	code: number;
	msg?: string;
	data?: T;
};

const msgs = ref<Msg[]>([]);

/**
 * @type {WebSocket}
 */
let websocket: WebSocket;
const connected = ref(false);

onMounted(async () => {
	initTestWebSocket();
});

onBeforeMount(async () => {
	websocket && websocket.close();
});

const initTestWebSocket = async () => {
	const userId = "123456";
	console.log("尝试建立websockect连接");
	websocket = new WebSocket(`ws://127.0.0.1:8666/ws/test/${userId}`);
	websocket.onopen = function (event) {
		console.log("建立连接", event);
		connected.value = true;
	};
	websocket.onclose = function (event) {
		console.log("连接关闭", event);
		// 如果是被动关闭，弹出提示框
		if (event.wasClean) {
			console.log("连接已关闭");
		} else {
			console.log("连接异常关闭");
			ElMessage({
				type: "error",
				message: "连接异常关闭",
			});
		}
		//尝试重连websocket
		connected.value = false;
		reconnectMessageWebSocket();
	};
	//建立通信后，监听到后端的数据传递
	websocket.onmessage = function (event) {
		//转为json对象
		const data: Result<string> = JSON.parse(event.data);
		console.log("接收到数据", data);
		if (data.code === 200) {
			if (data.msg! == "message") {
				msgs.value.push({
					name: "对方",
					content: data.data!,
				});
			} else if (data.msg! == "reply") {
				msgs.value.push({
					name: "我",
					content: data.data!,
				});
			}
		}
		// 调用WebSocket对象的send方法可向后端发送数据
		// websocket.send("test data");
	};
	websocket.onerror = function () {
		console.log("数据发送失败");
	};
	// 窗口关闭前关闭WebSocket连接
	window.onbeforeunload = function () {
		websocket.close();
		connected.value = false;
	};
};

let retry = true;

// 重连
const reconnectMessageWebSocket = () => {
	if (!retry) {
		return;
	}
	console.log("正在重连");
	// 进行重连
	setTimeout(() => {
		initTestWebSocket();
	}, 1000);
};

// 在页面退出时，取消重试连接
onUnmounted(() => {
	websocket.close();
	retry = false;
});
</script>

<style lang="scss" scoped>
.send {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	width: 600px;
	// 间距
	gap: 10px;
	.el-input {
		width: 80%;
	}
	.el-button {
		width: 18%;
		height: 74px;
	}
}
</style>
