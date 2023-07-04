Vue3 前端埋点插件。主要功能有`PV&UV统计`、`用户页面时长统计`、`click指令形式埋点`、`手动上报埋点事件`。

## 安装

```
npm install v-tracking -S
```

## 在 main.js 中引入插件

```
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import vTracking from "v-tracking";
const app = createApp(App);
app.use(router);
app.use(vTracking, Options);
app.mount("#app");

```

**注意**

因为涉及到路由检测，所以必须配合`vue-router`使用

## Options

- baseParams （string）

公共参数，每次上报都会携带的参数，比如用户的登录信息 uid 等

- baseUrl （string）

上报的后台请求地址，后端接口需按照前端请求参数设计

- prefix （string）

PV&UV&TP 事件前缀，一般用于区分不同项目等（建议和普通事件前缀一致）

- isVisTP （Boolean）

是否统计页面 UV&PV&PT

### Options 示例

```
app.use(vTracking, {
  baseParams: {
    uid: 123
  },
  baseUrl: "http://example/event",
  prefix: "app",
  isVisTP: false,
});

```

## 点击指令上报

```
<template>
    <div>page1</div>
    <div v-click="{ eventName: 'test1' }">click</div>
</template>

```

后台接收数据格式为

```
{ uid: 123 , eventName: "test1" }

```

## 手动上报

```
<template>
    <div>page1</div>
    <div @click="track">click</div>
</template>
<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
//手动上报事件
const track = ()=>{
  proxy.$vtrack({ eventName: 'test1'  })
}

</script>
```

后台接收数据格式为

```
{ uid: 123, eventName: "test1" }

```

## UV&PV

`isVisTP`为 true 时候插件会自动上报每个页面进入时的数据，其中后台接收数据格式为

```
{ uid: 123, UPVEventName: `${prefix}_${path}` }

```

其中`path`为页面路由路径，如`/page1`

## 页面停留时长（TP）

`isVisTP`为 true 时候插件会自动上报每个页面用户停留时长，其中后台接收数据格式为

```
{
  uid: 123,
  TP: { path: "/page2", time: 1269446 },
}
```

time 则表示时长（ms）

## 手动注入 Options

当你在`main.js`中无法获取公共数据的时候,你可以在获取到公共数据比如登录信息 uid 等的时候调用`manualInto`进行`Options`注入。**注意**: `Option.isVisTP`手动注入无效,需在`main.js`中传入是否开启

```
import { manualInto } from 'v-tracking'
/**
 * @param {*} options 同Options
 * @param {String | undefined} path 当前页面路由，不传手动注入则不会统计到当前页的UPV
 */
manualInto({
    baseParams: {
        uid: 122133,
        userAgent: "Chrome",
    },
    baseUrl: "http://example/event",
    prefix: "app222"
},'/xxx')
```

## 地址

[v-tracking](https://gitee.com/geeksdidi/vue-u-t/tree/master/packages/v-tracking)
