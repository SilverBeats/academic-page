<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content"/>
    </el-card>
</template>


<script>
import {loadFile} from "@/utils/tools.js"
import MarkdownComponent from "@/components/MarkdownComponent.vue";

export default {
    name: 'CvView',
    data() {
        return {
            content: ''
        }
    },
    components: {MarkdownComponent},
    async beforeMount() {
        this.content = await loadFile('/pages/cv.md')
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
