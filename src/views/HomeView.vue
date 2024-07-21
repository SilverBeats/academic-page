<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content" />
    </el-card>
</template>


<script>
import MarkdownComponent from '@/components/MarkdownComponent.vue'
import {loadFile} from "@/utils/tools.js";
export default {
    name: 'HomeView',
    data() {
        return {
            content: ''
        }
    },
    components: {MarkdownComponent},
    async beforeMount() {
        this.content = await loadFile('/pages/home.md')
    }
}
</script>

<style lang="less" scoped>
.el-card {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
