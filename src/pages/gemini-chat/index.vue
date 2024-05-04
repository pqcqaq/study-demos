<template>
	<div>
		<h1>Chat Demo</h1>
		<div v-for="(message, index) in messages" :key="index" class="message">
			{{ message }}
		</div>
		<textarea v-model="prompts" placeholder="Enter your prompts"></textarea>
		<button @click="sendMessage">Send</button>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	name: "ChatDemo",
	setup() {
		const prompts = ref("");
		const messages = ref([]);

		const sendMessage = () => {
			fetch("/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompts: prompts.value }),
			})
				// .then((_response) => {
				// 	const eventSource = new EventSource("/generate");
				// 	eventSource.onmessage = (event:any) => {
				// 		messages.value.push(event.data);
				// 	};
				// })
				// .catch((error) => {
				// 	console.error("Error:", error);
				// });
		};

		return {
			prompts,
			messages,
			sendMessage,
		};
	},
};
</script>

<style>
.message {
	margin-bottom: 10px;
}
</style>
