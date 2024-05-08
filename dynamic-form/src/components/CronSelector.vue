<template>
	<div id="changeContab">
		<a-button
			class="language"
			type="text"
			@click="i18n = i18n === 'en' ? 'cn' : 'en'"
			>{{ i18n == "cn" ? "中文" : "English" }}</a-button
		>
		<a-tabs default-active-key="second">
			<a-tab-pane key="second">
				<template #tab>
					<span class
						><ScheduleOutlined /> {{ text.Seconds.name }}</span
					>
				</template>

				<a-radio-group name="second" v-model:value="second.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{
								text.Seconds.every
							}}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Seconds.interval[0] }}
								<a-input-number
									v-model:value="second.incrementIncrement"
									:min="1"
									:max="60"
								></a-input-number>
								{{ text.Seconds.interval[1] || "" }}
								<a-input-number
									v-model:value="second.incrementStart"
									:min="0"
									:max="59"
								></a-input-number>
								{{ text.Seconds.interval[2] || "" }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="3"
								>{{ text.Seconds.specific }}
								<a-select
									mode="multiple"
									v-model:value="second.specificSpecific"
								>
									<a-select-option
										v-for="val in 60"
										:key="val"
										:value="val - 1"
										>{{ val - 1 }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="4"
								>{{ text.Seconds.cycle[0] }}
								<a-input-number
									v-model:value="second.rangeStart"
									:min="1"
									:max="60"
								></a-input-number>
								{{ text.Seconds.cycle[1] || "" }}
								<a-input-number
									v-model:value="second.rangeEnd"
									:min="0"
									:max="59"
								></a-input-number>
								{{ text.Seconds.cycle[2] || "" }}
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
			<a-tab-pane key="minute">
				<template #tab>
					<span
						><ScheduleOutlined /> {{ text.Minutes.name }}</span
					></template
				>
				<a-radio-group name="minute" v-model:value="minute.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{
								text.Minutes.every
							}}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Minutes.interval[0] }}
								<a-input-number
									v-model:value="minute.incrementIncrement"
									:min="1"
									:max="60"
								></a-input-number>
								{{ text.Minutes.interval[1] }}
								<a-input-number
									v-model:value="minute.incrementStart"
									:min="0"
									:max="59"
								></a-input-number>
								{{ text.Minutes.interval[2] || "" }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="3"
								>{{ text.Minutes.specific }}
								<a-select
									mode="multiple"
									v-model:value="minute.specificSpecific"
								>
									<a-select-option
										v-for="val in 60"
										:key="val"
										:value="val - 1"
										>{{ val - 1 }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="4"
								>{{ text.Minutes.cycle[0] }}
								<a-input-number
									v-model:value="minute.rangeStart"
									:min="1"
									:max="60"
								></a-input-number>
								{{ text.Minutes.cycle[1] }}
								<a-input-number
									v-model:value="minute.rangeEnd"
									:min="0"
									:max="59"
								></a-input-number>
								{{ text.Minutes.cycle[2] }}
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
			<a-tab-pane key="hour">
				<template #tab>
					<span
						><ScheduleOutlined /> {{ text.Hours.name }}</span
					></template
				>
				<a-radio-group name="hour" v-model:value="hour.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{ text.Hours.every }}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Hours.interval[0] }}
								<a-input-number
									v-model:value="hour.incrementIncrement"
									:min="0"
									:max="23"
								></a-input-number>
								{{ text.Hours.interval[1] }}
								<a-input-number
									v-model:value="hour.incrementStart"
									:min="0"
									:max="23"
								></a-input-number>
								{{ text.Hours.interval[2] }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="3"
								>{{ text.Hours.specific }}
								<a-select
									mode="multiple"
									v-model:value="hour.specificSpecific"
								>
									<a-select-option
										v-for="val in 24"
										:key="val"
										:value="val - 1"
										>{{ val - 1 }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="4"
								>{{ text.Hours.cycle[0] }}
								<a-input-number
									v-model:value="hour.rangeStart"
									:min="0"
									:max="23"
								></a-input-number>
								{{ text.Hours.cycle[1] }}
								<a-input-number
									v-model:value="hour.rangeEnd"
									:min="0"
									:max="23"
								></a-input-number>
								{{ text.Hours.cycle[2] }}
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
			<a-tab-pane key="day">
				<template #tab>
					<span><ScheduleOutlined /> {{ text.Day.name }}</span>
				</template>
				<a-radio-group name="day" v-model:value="day.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{ text.Day.every }}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Day.intervalWeek[0] }}
								<a-input-number
									v-model:value="week.incrementIncrement"
									:min="1"
									:max="7"
								></a-input-number>
								{{ text.Day.intervalWeek[1] }}
								<a-select v-model:value="week.incrementStart">
									<a-select-option
										v-for="val in 7"
										:key="val"
										:value="val"
										>{{
											text.Week[val - 1]
										}}</a-select-option
									>
								</a-select>
								{{ text.Day.intervalWeek[2] }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="3"
								>{{ text.Day.intervalDay[0] }}
								<a-input-number
									v-model:value="day.incrementIncrement"
									:min="1"
									:max="31"
								></a-input-number>
								{{ text.Day.intervalDay[1] }}
								<a-input-number
									v-model:value="day.incrementStart"
									:min="1"
									:max="31"
								></a-input-number>
								{{ text.Day.intervalDay[2] }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="4"
								>{{ text.Day.specificWeek }}
								<a-select
									mode="multiple"
									v-model:value="week.specificSpecific"
								>
									<a-select-option
										v-for="val in 7"
										:key="val"
										:value="
											[
												'SUN',
												'MON',
												'TUE',
												'WED',
												'THU',
												'FRI',
												'SAT',
											][val - 1]
										"
										>{{
											text.Week[val - 1]
										}}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="5"
								>{{ text.Day.specificDay }}
								<a-select
									mode="multiple"
									v-model:value="day.specificSpecific"
								>
									<a-select-option
										v-for="val in 31"
										:key="val"
										:value="val"
										>{{ val }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="6">{{ text.Day.lastDay }}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="7">{{
								text.Day.lastWeekday
							}}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="8"
								>{{ text.Day.lastWeek[0] }}
								<a-select
									v-model:value="week.cronLastSpecificDomweek"
								>
									<a-select-option
										v-for="val in 7"
										:key="val"
										:value="val"
										>{{
											text.Week[val - 1]
										}}</a-select-option
									>
								</a-select>
								{{ text.Day.lastWeek[1] || "" }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="9">
								<a-input-number
									v-model:value="day.cronDaysBeforeEomMinus"
									:min="1"
									:max="31"
								></a-input-number>
								{{ text.Day.beforeEndMonth[0] }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="10"
								>{{ text.Day.nearestWeekday[0] }}
								<a-input-number
									v-model:value="day.cronDaysNearestweekday"
									:min="1"
									:max="31"
								></a-input-number>
								{{ text.Day.nearestWeekday[1] }}
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="11"
								>{{ text.Day.someWeekday[0] }}
								<a-input-number
									v-model:value="week.cronNthDayNth"
									:min="1"
									:max="5"
								></a-input-number>
								<a-select v-model:value="week.cronNthDayDay">
									<a-select-option
										v-for="val in 7"
										:key="val"
										:value="val"
										>{{
											text.Week[val - 1]
										}}</a-select-option
									>
								</a-select>
								{{ text.Day.someWeekday[1] }}
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
			<a-tab-pane key="month">
				<template #tab>
					<ScheduleOutlined /> {{ text.Month.name }}
				</template>
				<a-radio-group name="month" v-model:value="month.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{ text.Month.every }}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Month.interval[0] }}
								<a-input-number
									v-model:value="month.incrementIncrement"
									:min="0"
									:max="12"
								></a-input-number>
								{{ text.Month.interval[1] }}
								<a-input-number
									v-model:value="month.incrementStart"
									:min="0"
									:max="12"
								></a-input-number>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="3"
								>{{ text.Month.specific }}
								<a-select
									mode="multiple"
									v-model:value="month.specificSpecific"
								>
									<a-select-option
										v-for="val in 12"
										:key="val"
										:value="val"
										>{{ val }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="4"
								>{{ text.Month.cycle[0] }}
								<a-input-number
									v-model:value="month.rangeStart"
									:min="1"
									:max="12"
								></a-input-number>
								{{ text.Month.cycle[1] }}
								<a-input-number
									v-model:value="month.rangeEnd"
									:min="1"
									:max="12"
								></a-input-number>
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
			<a-tab-pane key="year">
				<template #tab>
					<ScheduleOutlined /> {{ text.Year.name }}
				</template>
				<a-radio-group name="year" v-model:value="year.cronEvery">
					<div class="tabBody">
						<a-row>
							<a-radio value="1">{{ text.Year.every }}</a-radio>
						</a-row>
						<a-row>
							<a-radio value="2"
								>{{ text.Year.interval[0] }}
								<a-input-number
									v-model:value="year.incrementIncrement"
									:min="1"
									:max="99"
								></a-input-number>
								{{ text.Year.interval[1] }}
								<a-input-number
									v-model:value="year.incrementStart"
									:min="2018"
									:max="2218"
								></a-input-number>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio class="long" value="3"
								>{{ text.Year.specific }}
								<a-select
									mode="multiple"
									v-model:value="year.specificSpecific"
								>
									<a-select-option
										v-for="val in 200"
										:key="val"
										:value="2017 + val"
										>{{ 2017 + val }}</a-select-option
									>
								</a-select>
							</a-radio>
						</a-row>
						<a-row>
							<a-radio value="4"
								>{{ text.Year.cycle[0] }}
								<a-input-number
									v-model:value="year.rangeStart"
									:min="2018"
									:max="2218"
								></a-input-number>
								{{ text.Year.cycle[1] }}
								<a-input-number
									v-model:value="year.rangeEnd"
									:min="2018"
									:max="2218"
								></a-input-number>
							</a-radio>
						</a-row>
					</div>
				</a-radio-group>
			</a-tab-pane>
		</a-tabs>
		<div class="value-warp">
			<span class="value">{{ cron }}</span>
		</div>
		<div class="btn-wrap">
			<a-button @click="close">{{ text.Close }}</a-button>
			<a-button type="primary" @click="change">{{ text.Save }}</a-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { defineProps, ref, watch, computed, Ref } from "vue";
import Language from "./language";
import ScheduleOutlined from "@ant-design/icons-vue/ScheduleOutlined";

const props = defineProps<{
	i18n?: "cn" | "en" | "pt";
	expression: string;
}>();

const i18n = ref(props.i18n || "cn");

type OutputType = {
	second: string;
	minute: string;
	hour: string;
	day: string;
	month: string;
	week: string;
	year: string;
};

const output = ref<OutputType>({
	second: "",
	minute: "",
	hour: "",
	day: "",
	month: "",
	week: "",
	year: "",
});

type ExpType = {
	type: keyof OutputType;
	expression: string;
};

const exps = ref<ExpType[]>([
	{ type: "second", expression: "" },
	{ type: "minute", expression: "" },
	{ type: "hour", expression: "" },
	{ type: "day", expression: "" },
	{ type: "month", expression: "" },
	{ type: "week", expression: "" },
	{ type: "year", expression: "" },
]);

type CronType = {
	cronEvery: string;
	incrementStart: number;
	incrementIncrement: number;
	rangeStart?: number | string;
	rangeEnd?: number;
	specificSpecific: number[];
	cronLastSpecificDomDay?: number;
	cronDaysBeforeEomMinus?: number;
	cronDaysNearestweekday?: number;
	cronNthDayDay?: number;
	cronNthDayNth?: number;
	cronLastSpecificDomweek?: number;
};

const second = ref<CronType>({
	cronEvery: "3",
	incrementStart: 3,
	incrementIncrement: 5,
	rangeStart: 1,
	rangeEnd: 0,
	specificSpecific: [0],
});

const minute = ref<CronType>({
	cronEvery: "3",
	incrementStart: 3,
	incrementIncrement: 5,
	rangeStart: 1,
	rangeEnd: 0,
	specificSpecific: [0],
});

const hour = ref<CronType>({
	cronEvery: "1",
	incrementStart: 3,
	incrementIncrement: 5,
	rangeStart: "1",
	rangeEnd: 0,
	specificSpecific: [],
});

const day = ref<CronType>({
	cronEvery: "1",
	incrementStart: 0,
	incrementIncrement: 0,
	rangeStart: 0,
	rangeEnd: 0,
	specificSpecific: [],
	cronLastSpecificDomDay: 0,
	cronDaysBeforeEomMinus: 0,
	cronDaysNearestweekday: 0,
});

const week = ref<CronType>({
	cronEvery: "1",
	incrementStart: 1,
	incrementIncrement: 1,
	specificSpecific: [],
	cronNthDayDay: 1,
	cronNthDayNth: 1,
	cronLastSpecificDomweek: 1,
});

const month = ref<CronType>({
	cronEvery: "1",
	incrementStart: 3,
	incrementIncrement: 5,
	rangeStart: 1,
	rangeEnd: 12,
	specificSpecific: [],
});

const year = ref<CronType>({
	cronEvery: "1",
	incrementStart: 2018,
	incrementIncrement: 1,
	rangeStart: 2018,
	rangeEnd: 2018,
	specificSpecific: [],
});

const valueMap = {
	second,
	minute,
	hour,
	day,
	month,
	week,
	year,
};

const text = ref(Language[props.i18n || "cn"]);

const resolveExpression = () => {
	if (!props.expression || !props.expression.length) return;
	let expList = props.expression.split(" ");
	if (expList.length < 7) {
		throw new Error("表达式格式不正确");
	}
	for (let i = 0; i < expList.length; i++) {
		exps.value[i].expression = expList[i];
	}
	exps.value.forEach((exp) => {
		output.value[exp.type] = exp.expression;
		switch (exp.type) {
			case "year":
			case "month":
			case "hour":
			case "minute":
			case "second":
				commonParser(valueMap[exp.type], exp.expression);
				return;
			case "week":
				resolveweek(exp.expression);
				return;
			case "day":
				resolveDay(exp.expression);
				return;
		}
	});
};

const commonParser = (expressionType: Ref<CronType>, str: string) => {
	if (str == "*") {
		resolveStar(expressionType);
	} else if (str.indexOf("-") >= 0) {
		resolveLine(expressionType, str);
	} else if (str.indexOf("/") >= 0) {
		resolveSlash(expressionType, str);
	} else {
		resolveComma(expressionType, str);
	}
};

const resolveweek = (str: string) => {
	if (str.indexOf("/") >= 0) {
		day.value.cronEvery = "2";
		resolveSlash(week, str);
	} else if (str.indexOf(",") >= 0) {
		day.value.cronEvery = "4";
		resolveComma(week, str);
	} else if (/\dL/.test(str)) {
		day.value.cronEvery = "8";
		week.value.cronLastSpecificDomweek = Number(
			(str.match(/(\d)L/) || [0, 0])[1]
		);
	} else if (str.indexOf("#") >= 0) {
		day.value.cronEvery = "11";
		let range = str.split("#");
		week.value.cronNthDayDay = +range[0];
		week.value.cronNthDayNth = +range[1];
	}
};

const resolveDay = (str: string) => {
	if (str == "*") {
		resolveStar(day);
	} else if (str.indexOf("/") >= 0) {
		resolveSlash(day, str, "3");
	} else if (str == "L") {
		day.value.cronEvery = "6";
	} else if (str == "LW") {
		day.value.cronEvery = "7";
	} else if (/L-\d+/.test(str)) {
		day.value.cronEvery = "9";
		day.value.cronDaysBeforeEomMinus = Number(
			(str.match(/L-(\d+)/) || [0, 0])[1]
		);
	} else if (/\d+W/.test(str)) {
		day.value.cronEvery = "10";
		day.value.cronDaysNearestweekday = Number(
			(str.match(/(\d+)W/) || [0, 0])[1]
		);
	} else {
		resolveComma(day, str, "5");
	}
};

const resolveStar = (expressionObj: Ref<CronType>, type = "1") => {
	expressionObj.value.cronEvery = type;
};

const resolveSlash = (
	expressionObj: Ref<CronType>,
	expression: string,
	type = "2"
) => {
	expressionObj.value.cronEvery = type;
	let range = expression.split("/");
	expressionObj.value.incrementStart = Number(range[0]);
	expressionObj.value.incrementIncrement = Number(range[1]);
};

const resolveLine = (
	expressionObj: Ref<CronType>,
	expression: string,
	type = "4"
) => {
	expressionObj.value.cronEvery = type;
	let range = expression.split("-");
	expressionObj.value.rangeStart = Number(range[0]);
	expressionObj.value.rangeEnd = Number(range[1]);
};

const resolveComma = (
	expressionObj: Ref<CronType>,
	expression: string,
	type = "3"
) => {
	expressionObj.value.cronEvery = type;
	expressionObj.value.specificSpecific = expression.split(",").map((item) => {
		return Number(item);
	});
};

watch(
	() => props.expression,
	() => {
		resolveExpression();
	},
	{ immediate: true, deep: true }
);

const emit = defineEmits(["change", "close"]);

const change = () => {
	emit("change", output.value);
	close();
};

const close = () => {
	emit("close");
};

const rest = (data: any) => {
	for (let i in data) {
		if (data[i] instanceof Object) {
			rest(data[i]);
		} else {
			switch (typeof data[i]) {
				case "object":
					data[i] = [];
					break;
				case "string":
					data[i] = "";
					break;
			}
		}
	}
};

const cron = computed(() => {
	return `${second.value.cronEvery} ${second.value.incrementStart}-${
		second.value.incrementIncrement
	} ${second.value.rangeStart}-${
		second.value.rangeEnd
	} ${second.value.specificSpecific.join(",")} * * *`;
});
</script>
<style lang="scss">
#changeContab {
	.language {
		position: absolute;
		right: 25px;
		z-index: 1;
	}
	.ant-tabs-tabpane {
		padding: 20px;
	}
	.tabBody {
		.ant-row {
			margin: 15px 0;
			.long {
				.ant-select {
					width: 350px;
				}
			}
			.ant-input-number {
				width: 110px;
			}
			.ant-select {
				width: 350px;
			}
		}
	}

	.value-warp {
		width: 100%;
		text-align: center;
		padding: 15px;
		position: relative;
		border-top: 1px solid #e8e8e8;
		.value {
			font-size: 18px;
			vertical-align: middle;
			margin-right: 20px;
		}
		.ant-btn + .ant-btn {
			margin-left: 10px;
		}
	}
	.btn-wrap {
		padding-top: 15px;
		border-top: 1px solid #e8e8e8;
		text-align: right;
		.ant-btn + .ant-btn {
			margin-left: 10px;
		}
	}
}
</style>
