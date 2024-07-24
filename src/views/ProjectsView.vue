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


<script setup>
import CardListItem from "@/components/CardListItem.vue";
import {clickTagAtoJump, isUrl, loadFile, messageNotice} from "@/utils/tools.js";
import {ref, onBeforeMount} from 'vue'
import {useRouter} from "vue-router";
const router = useRouter()
const projectsInfoList = ref([])
onBeforeMount(async () => {
    const content = await loadFile('/pages/projects.json')
    projectsInfoList.value = JSON.parse(content)
})
const additionClickHandle = (key, value) =>{
    if (key === 'blog') {
        router.push({path: '/post', query: {fileName: value}})
    } else if (isUrl(value)) {
        clickTagAtoJump('tag-a', value)
    } else {
        return messageNotice(`key = ${key}, not support currently`, 'error')
    }
}
</script>
