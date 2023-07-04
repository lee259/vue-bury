<template>
    <div>page2</div>
    <router-link to="/page1">跳转page1</router-link>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()
//proxy.$vtrack(111)
</script>