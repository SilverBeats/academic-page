<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content"/>
    </el-card>
</template>


<script setup>
import {onBeforeMount, ref} from "vue"
import {loadFile} from "@/utils/tools.js"
import MarkdownComponent from "@/components/MarkdownComponent.vue"

const content = ref('')
onBeforeMount(async () => {
    content.value = await loadFile('/pages/cv.md')
})
</script>

<style lang="less" scoped>
.el-card {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
