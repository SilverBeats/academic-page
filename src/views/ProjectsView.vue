<template>
    <CardListItem
        v-for="(paper, index) in projectsInfoList"
        :key="paper['title'].slice(0, 10)"
        :index="index"
        :title="paper['title']"
        :link-list="paper['addition']"
        @buttonClick="additionClickHandle"
    />
    <a id="tag-a" style="display:none;" target="_blank"></a>
</template>


<script>
import CardListItem from "@/components/CardListItem.vue";
import {clickTagAtoJump, isUrl, loadFile, messageNotice} from "@/utils/tools.js";

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
            if (key === 'blog') {
                this.$router.push({name: 'postView', query: {fileName: value}})
            } else if (isUrl(value)) {
                clickTagAtoJump('tag-a', value)
            } else {
                return messageNotice(`key = ${key}, not support currently`, 'error')
            }
        }
    }
}
</script>
