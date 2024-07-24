<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content"/>
    </el-card>
</template>


<script setup>
import {ref, onBeforeMount} from "vue"
import MarkdownComponent from '@/components/MarkdownComponent.vue'
import {loadFile} from "@/utils/tools.js";

const content = ref('')
onBeforeMount(async () => {
    content.value = await loadFile('/pages/home.md')
})
</script>

<style lang="less" scoped>
.el-card {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
