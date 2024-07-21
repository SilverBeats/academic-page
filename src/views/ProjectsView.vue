<template>
    <CardListItem
        v-for="(paper, index) in projectsInfoList"
        :key="paper['title'].slice(0, 10)"
        :index="index"
        :title="paper['title']"
        :link-list="paper['addition']"
        @buttonClick="additionClickHandle"
    />
</template>


<script>
import CardListItem from "@/components/CardListItem.vue";
import {loadFile, messageNotice} from "@/utils/tools.js";
import {toRaw} from "vue";

export default {
    name: "ProjectsView",
    data() {
        return {
            projectsInfoList: []
        }
    },
    components: {CardListItem},
    beforeMount() {
        this.init()
    },
    methods: {
        async init() {
            const content = await loadFile('/pages/projects.json')
            this.projectsInfoList = JSON.parse(content)
        },
        additionClickHandle(key, value) {
            if (!['blog'].includes(key))
                return messageNotice(`Unknown key = ${key}`, 'error')
            if (key === 'blog') {
                this.$router.push({name: 'postView', query: {fileName: value}})
            }
        }
    }
}
</script>


<style scoped lang="less">

</style>
