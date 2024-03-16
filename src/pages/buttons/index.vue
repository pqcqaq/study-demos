<template>
	<div>
		<div class="element">
			<div class="default">
				<el-button>默认</el-button>
				<el-button type="primary">primary</el-button>
				<el-button type="success">success</el-button>
				<el-button type="info">info</el-button>
				<el-button type="warning">warning</el-button>
				<el-button type="danger">danger</el-button>
			</div>
			<div class="plain">
				<el-button plain>朴素</el-button>
				<el-button type="primary" plain>朴素</el-button>
				<el-button type="success" plain>朴素</el-button>
				<el-button type="info" plain>朴素</el-button>
				<el-button type="warning" plain>朴素</el-button>
				<el-button type="danger" plain>朴素</el-button>
			</div>
			<div class="round">
				<el-button round>圆角</el-button>
				<el-button type="primary" round>圆角</el-button>
				<el-button type="success" round>圆角</el-button>
				<el-button type="info" round>圆角</el-button>
				<el-button type="warning" round>圆角</el-button>
				<el-button type="danger" round>圆角</el-button>
			</div>
		</div>
		<div class="antd">
			<div class="default">
				<Button>Default Button</Button>
				<Button type="primary">Primary Button</Button>
				<Button type="dashed">Dashed Button</Button>
				<Button type="text">Text Button</Button>
				<Button type="link">Link Button</Button>
			</div>
			<div class="danger">
				<Button danger>Danger Default</Button>
				<Button type="primary" danger>Primary Danger</Button>
				<Button type="dashed" danger>Dashed Danger</Button>
				<Button type="text" danger>Text Danger</Button>
				<Button type="link" danger>Link Danger</Button>
			</div>
			<div class="different-color">
				<Button type="primary">Primary</Button>
				<Button type="primary" ghost>Primary Ghost</Button>
				<Button type="dashed">Dashed</Button>
				<Button type="dashed" ghost>Dashed Ghost</Button>
				<Button type="text">Text</Button>
				<Button type="text" ghost>Text Ghost</Button>
				<Button type="link">Link</Button>
				<Button type="link" ghost>Link Ghost</Button>
			</div>
			<div class="block">
				<Button type="primary" block>Primary</Button>
				<Button block>Default</Button>
				<Button type="dashed" block>Dashed</Button>
				<Button type="link" block>Link</Button>
			</div>
			<div class="shape">
				<Button type="primary" shape="circle" icon="search" />
				<Button type="primary" shape="circle">A</Button>
				<Button type="primary" icon="search">Search</Button>
				<Button type="primary">Search</Button>
				<Button shape="circle" icon="search" />
				<Button icon="search">Search</Button>
			</div>
			<div class="loading">
				<Button type="primary" loading>Loading</Button>
				<Button type="primary" icon="poweroff" loading />
				<Button shape="circle" icon="poweroff" loading />
				<Button type="primary" :loading="true">Loading</Button>
				<Button type="primary" icon="poweroff" :loading="true" />
				<Button shape="circle" icon="poweroff" :loading="true" />
			</div>
			<div class="icon">
				<Button type="primary" icon="search">Search</Button>
				<Button type="primary" shape="circle" icon="search" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from "ant-design-vue/es/button";
</script>

<style lang="scss" scoped>
div {
	margin-top: 10px;
}
</style>
