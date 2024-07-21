<template>
    <el-card shadow="hover">
        <MarkdownComponent :value="content"/>
    </el-card>
</template>


<script>
import MarkdownComponent from "@/components/MarkdownComponent.vue";
import {messageNotice, loadFile} from '@/utils/tools.js'


export default {
    name: "PostView",
    components: {MarkdownComponent},
    data() {
        return {
            content: ''
        }
    },
    beforeMount() {
        let fileName = this.$route.query.fileName
        if (fileName.split('.').pop() !== 'md')
            fileName = fileName + '.md'
        loadFile(`/posts/${fileName}`)
            .then(result => {
                this.content = result
            })
            .catch(error => {
                messageNotice('File load error !', 'error')
                console.log(error)
            })
    }
}
</script>


<style scoped lang="less">
.el-card {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
}
</style>
