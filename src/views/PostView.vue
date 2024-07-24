<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content"/>
    </el-card>
</template>


<script setup>
import MarkdownComponent from "@/components/MarkdownComponent.vue";
import {messageNotice, loadFile} from '@/utils/tools.js'
import {ref, onBeforeMount} from 'vue'
import { useRoute } from "vue-router";
const content = ref('')
onBeforeMount(async () => {
    const router = useRoute()
    let fileName = router.query.fileName
    if (fileName.split('.').pop() !== 'md')
        fileName = fileName + '.md'
    try {
        content.value = await loadFile(`/posts/${fileName}`)
    } catch (error) {
        messageNotice('File load error !', 'error')
        console.log(error)
    }
})
</script>


<style scoped lang="less">
.el-card {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
