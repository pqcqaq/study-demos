import { DirectiveBinding, ObjectDirective } from "vue";

export type SlideDirection = "left" | "right" | "up" | "down";

export type SlideInConfig = {
	/**
	 * 滑动方向
	 */
	direction: SlideDirection;
	/**
	 * 滑动前的距离
	 */
	beforeDire: number;
	/**
	 * 滑动持续时间
	 */
	duration: number;
	/**
	 * 是否无论如何都展示 (默认如果元素已经在视口内则不展示动画)
	 */
	showAnyway: boolean;
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
	showAnyway: false,
};

const SlideIn: ObjectDirective<HTMLElement, SlideInConfig> = {
	mounted(element: HTMLElement, binding: DirectiveBinding<SlideInConfig>) {
		const direFromArg = (binding.arg as SlideDirection) || undefined;
		binding.value = {
			...defaultConfig,
			...binding.value,
		};
		if (direFromArg) {
			binding.value.direction = direFromArg;
		}
		const isbellowViewPort = (element: HTMLElement, dire: number) => {
			const rect = element.getBoundingClientRect();
			return rect.top - dire > window.innerHeight;
		};

		if (
			!binding.value.showAnyway &&
			!isbellowViewPort(element, binding.value.beforeDire)
		) {
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
		animationMap.delete(element);
	},
};

export default SlideIn;
