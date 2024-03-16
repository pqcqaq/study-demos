import { DirectiveBinding } from "vue";

export type SlideDirection = "left" | "right" | "up" | "down";

export type SlideInConfig = {
	direction: SlideDirection;
	beforeDire: number;
	duration: number;
};

const ob = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			animationMap.get(entry.target as HTMLElement)?.play();
			ob.unobserve(entry.target);
		}
	});
});

const animationMap = new WeakMap<HTMLElement, Animation>();

const defaultConfig: SlideInConfig = {
	direction: "down",
	beforeDire: 150,
	duration: 500,
};

export default {
	mounted(element: HTMLElement, binding: DirectiveBinding<SlideInConfig>) {
		binding.value = { ...defaultConfig, ...binding.value };
		const isbellowViewPort = (element: HTMLElement, dire: number) => {
			const rect = element.getBoundingClientRect();
			return rect.top - dire > window.innerHeight;
		};

		if (!isbellowViewPort(element, binding.value.beforeDire)) {
			return;
		}

		const animation = element.animate(
			[
				{
					transform:
						binding.value.direction === "left"
							? `translateX(-${binding.value.beforeDire}px)`
							: binding.value.direction === "right"
							? `translateX(${binding.value.beforeDire}px)`
							: binding.value.direction === "up"
							? `translateY(-${binding.value.beforeDire}px)`
							: `translateY(${binding.value.beforeDire}px)`,
					opacity: 0.5,
				},
				{
					transform:
						binding.value.direction === "left"
							? "translateX(0)"
							: binding.value.direction === "right"
							? "translateX(0)"
							: binding.value.direction === "up"
							? "translateY(0)"
							: "translateY(0)",
					opacity: 1,
				},
			],
			{
				duration: binding.value.duration,
				easing: "ease-in-out",
				fill: "both",
			}
		);
		animation.pause();
		ob.observe(element);
		animationMap.set(element, animation);
	},
	unmounted(element: HTMLElement) {
		ob.unobserve(element);
	},
};
