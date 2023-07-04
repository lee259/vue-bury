<template>

    <div v-click="{ eventName: 'test' }">click</div>
    <router-link to="/page2">跳转page2</router-link>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { manualInto } from 'v-tracking'
manualInto({
    baseParams: {
        uid: 123,
        userAgent: "Chrome",
    },
    baseUrl: "http://example/event",
    prefix: "app"
}, "/aaa")
const { proxy } = getCurrentInstance()

//proxy.$vtrack(111)
</script>